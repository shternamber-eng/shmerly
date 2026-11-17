// Cloudflare Worker entry point.
// Static files (public/) are served by Cloudflare's asset handler;
// only /api/* requests reach this code first (see run_worker_first in wrangler.toml).

import { handleCheckout, methodNotAllowed, notFound } from './checkout.js';

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    if (pathname === '/api/checkout') {
      return request.method === 'POST' ? handleCheckout(request, env) : methodNotAllowed();
    }
    if (pathname.startsWith('/api/')) return notFound();

    return env.ASSETS.fetch(request);
  },
};
