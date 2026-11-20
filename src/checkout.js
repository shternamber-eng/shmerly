// POST /api/checkout  (called from src/worker.js)
// Body: { items: [{ id: "rye", qty: 2 }, ...] }
// Creates a Stripe Checkout Session and returns { url } to redirect the buyer to.
//
// Required secret (Cloudflare → Workers & Pages → shmerly → Settings → Variables and Secrets):
//   STRIPE_SECRET_KEY = sk_test_... (test mode) or sk_live_... (real payments)
//
// Prices are always taken from the catalog on the server, never from the browser.

import { PRODUCTS, CURRENCY, SITE } from '../public/assets/catalog.js';

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

export const methodNotAllowed = () => json({ error: 'Method not allowed.' }, 405);
export const notFound = () => json({ error: 'Not found.' }, 404);

export async function handleCheckout(request, env) {
  if (!SITE.launched) {
    return json({ error: 'Coming soon. Orders open at launch.' }, 403);
  }
  if (!env.STRIPE_SECRET_KEY) {
    return json({ error: 'Online payment is not set up yet. Please try again later.' }, 503);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }

  const items = Array.isArray(body?.items) ? body.items : [];
  const lines = [];
  for (const it of items) {
    const p = PRODUCTS.find(x => x.id === it?.id);
    const qty = Number.parseInt(it?.qty, 10);
    if (!p || !Number.isInteger(p.price) || !Number.isInteger(qty) || qty < 1 || qty > SITE.maxQtyPerItem) {
      return json({ error: 'Your cart has an item we could not recognize. Please refresh and try again.' }, 400);
    }
    lines.push({ p, qty });
  }
  if (!lines.length) return json({ error: 'Your cart is empty.' }, 400);

  const origin = new URL(request.url).origin;
  const f = new URLSearchParams();
  f.set('mode', 'payment');
  f.set('success_url', `${origin}/?order=success&session_id={CHECKOUT_SESSION_ID}#thanks`);
  f.set('cancel_url', `${origin}/#checkout`);
  f.set('shipping_address_collection[allowed_countries][0]', 'US');
  f.set('phone_number_collection[enabled]', 'true');
  f.set('billing_address_collection', 'auto');
  lines.forEach(({ p, qty }, i) => {
    f.set(`line_items[${i}][quantity]`, String(qty));
    f.set(`line_items[${i}][price_data][currency]`, CURRENCY);
    f.set(`line_items[${i}][price_data][unit_amount]`, String(p.price));
    f.set(`line_items[${i}][price_data][product_data][name]`, p.name);
    if (p.size) f.set(`line_items[${i}][price_data][product_data][description]`, p.size);
    f.set(`line_items[${i}][price_data][product_data][metadata][product_id]`, p.id);
  });
  f.set('metadata[source]', 'schmearly-site');

  const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: f,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.url) {
    console.error('Stripe error', res.status, data?.error?.message);
    return json({ error: 'Payment could not be started. Please try again in a minute.' }, 502);
  }
  return json({ url: data.url });
}
