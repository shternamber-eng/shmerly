import { PRODUCTS as P, SITE, byId as by } from './catalog.js';

const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
// "[SOMETHING]" in catalog text → visible dashed placeholder until the owner fills it in.
const ph = t => String(t).replace(/\[([^\]]+)\]/g, '<span class="ph">[$1]</span>');
const money = c => c == null ? '' : '$' + (c / 100).toFixed(2);
const LIVE = SITE.launched; // false = pre-launch: "Coming Soon" everywhere, no cart / checkout
const SOON = '<span class="soon">Coming Soon</span>';
const AVAIL = '<span class="soon avail">Available now</span>';
const isAvail = p => p.status === 'available';
const canBuyOnline = p => LIVE && isAvail(p) && p.price != null;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
// Square product image for cards: the real photo when we have one, otherwise the illustration.
const cardImg = p => `<img class="pimg" src="${p.card}" srcset="${p.cardSmall} 480w, ${p.card} 800w" sizes="(max-width: 600px) 92vw, (max-width: 980px) 46vw, 30vw" alt="${esc(p.name)}" loading="lazy" decoding="async" width="800" height="800">`;
const cover = p => p.card ? cardImg(p) : art(p);
// Every real photo on the site (product photos), for the Gallery and the photo viewer.
const ALL_PHOTOS = P.flatMap(p => (p.photos || []).map(ph => ({ ...ph, p })));
const photoList = key => key === 'all' ? ALL_PHOTOS : ALL_PHOTOS.filter(x => x.p.id === key);

/* ---------- cart (remembered in this browser) ---------- */
const CART_KEY = 'schmearly-cart-v1';
const cart = {};
if (LIVE) try {
  const saved = JSON.parse(localStorage.getItem(CART_KEY) || '{}');
  for (const [id, q] of Object.entries(saved)) if (by(id)?.price != null && Number.isInteger(q) && q > 0) cart[id] = Math.min(q, SITE.maxQtyPerItem);
} catch { /* storage unavailable: start empty */ }
const saveCart = () => { try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch { } };
const cartCount = () => Object.values(cart).reduce((a, b) => a + b, 0);
const cartSub = () => Object.keys(cart).reduce((a, i) => a + by(i).price * cart[i], 0);

/* ---------- illustrations ---------- */
function slice(c, anim) { return `<svg viewBox="0 0 640 430" role="img" aria-label="Slice of dark rye with a knife spreading pkhali"><path d="M56 398 L56 196 C56 92 148 36 260 36 C372 36 464 92 464 196 L464 398 Z" fill="#1F1512"/><path d="M78 380 L78 200 C78 110 160 60 260 60 C360 60 442 110 442 200 L442 380 Z" fill="#4A352B"/><circle cx="130" cy="150" r="7" fill="#33251F"/><circle cx="210" cy="110" r="5" fill="#33251F"/><circle cx="330" cy="120" r="8" fill="#33251F"/><circle cx="120" cy="330" r="6" fill="#33251F"/><circle cx="220" cy="350" r="8" fill="#33251F"/><circle cx="410" cy="330" r="7" fill="#33251F"/><path ${anim ? 'class="smear" pathLength="100"' : ''} d="M128 262 C170 176 232 318 292 232 S398 190 404 268" fill="none" stroke="${c}" stroke-width="84" stroke-linecap="round"/><g transform="translate(372 236) rotate(-32)"><rect x="0" y="-16" width="176" height="32" rx="16" fill="#F5EBDD"/><rect x="164" y="-13" width="112" height="26" rx="13" fill="#25372D"/></g></svg>` }
function jar(p) { const w = p.word.toUpperCase(); return `<svg viewBox="0 0 200 240" role="img" aria-label="${p.name} jar"><rect x="45" y="6" width="110" height="28" rx="6" fill="#D44D3E"/><rect x="18" y="34" width="164" height="200" rx="26" fill="${p.color}"/><rect x="18" y="76" width="164" height="118" fill="#F5EBDD"/><path d="M34 98 C60 86 84 108 112 96 S150 90 166 98" fill="none" stroke="${p.color}" stroke-width="13" stroke-linecap="round"/><text x="30" y="${w.length > 8 ? 140 : 144}" font-family="Anton,Impact,sans-serif" font-size="${w.length > 8 ? 25 : 31}" fill="#25372D">${w}</text><text x="30" y="160" font-family="Archivo,Arial,sans-serif" font-weight="700" font-size="9.5" letter-spacing=".6" fill="#25372D">&amp; WALNUT SPREAD</text><text x="30" y="183" font-family="Anton,Impact,sans-serif" font-size="11" fill="#25372D">SCHMEARLY</text></svg>` }
function loaf(p = by('rye')) { const olives = p.olives ? '<g fill="#2A1E2E"><ellipse cx="140" cy="100" rx="11" ry="8"/><ellipse cx="300" cy="120" rx="10" ry="7"/><ellipse cx="200" cy="330" rx="11" ry="8"/><ellipse cx="330" cy="350" rx="9" ry="7"/><ellipse cx="110" cy="320" rx="9" ry="7"/></g><g stroke="#7E9460" stroke-width="5" stroke-linecap="round"><path d="M250 80 l18 -10 M90 140 l16 8 M270 370 l18 -6"/></g>' : '';
  return `<svg viewBox="-20 0 480 440" role="img" aria-label="${p.name} loaf with paper band"><circle cx="220" cy="220" r="216" fill="${p.crust}"/><circle cx="220" cy="220" r="196" fill="${p.crumb}"/><path d="M90 120 C150 90 210 90 260 110 M70 190 C150 150 260 150 350 190 M80 330 C160 300 270 300 360 330 M150 380 C200 365 250 365 300 380" fill="none" stroke="rgba(245,235,221,.18)" stroke-width="7" stroke-linecap="round"/>${olives}<g transform="rotate(-4 220 220)"><rect x="-16" y="160" width="330" height="120" fill="#D44D3E"/><rect x="314" y="160" width="142" height="120" fill="#F5EBDD"/><text x="6" y="214" font-family="Anton,Impact,sans-serif" font-size="46" fill="#F5EBDD">${p.band}</text><text x="6" y="262" font-family="Anton,Impact,sans-serif" font-size="46" fill="#1F1512">SCHMEAR IT.</text><text x="326" y="212" font-family="Anton,Impact,sans-serif" font-size="21" fill="#25372D">SCHMEARLY</text><text x="326" y="238" font-family="Archivo,Arial,sans-serif" font-weight="700" font-size="13" fill="#25372D">NET WT 30 OZ</text></g></svg>` }
function boxArt() { return `<svg viewBox="0 0 300 240" role="img" aria-label="Schmear box"><rect x="10" y="60" width="280" height="170" rx="14" fill="#D44D3E"/><rect x="10" y="60" width="280" height="40" rx="14" fill="#1F1512"/><circle cx="90" cy="150" r="52" fill="#33251F"/><rect x="160" y="108" width="34" height="84" rx="9" fill="#7E9460"/><rect x="200" y="108" width="34" height="84" rx="9" fill="#6B4660"/><rect x="240" y="108" width="34" height="84" rx="9" fill="#A9B97F"/><text x="24" y="88" font-family="Anton,Impact,sans-serif" font-size="22" fill="#F5EBDD">BETTER TOGETHER</text></svg>` }
const art = p => p.cat === 'bread' ? loaf(p) : p.id === 'box' ? boxArt() : jar(p);

/* ---------- views ---------- */
function cardAction(p) {
  if (canBuyOnline(p)) return `<button class="btn" data-add="${p.id}">Add to cart</button>`;
  if (isAvail(p)) return `<button class="btn" data-order="${p.id}">Order</button>`;
  return `<div class="soonrow">${SOON}</div>`;
}
function card(p) { return `<article class="pcard"><a class="art${p.card ? ' hasphoto' : ''}" href="#product-${p.id}" style="background:${p.bg}" aria-label="${p.name}">${cover(p)}</a><h3><a href="#product-${p.id}">${p.name}</a></h3><p class="small">${p.short}</p>${p.size || p.price != null ? `<div class="meta"><span>${p.size || ''}</span><span>${money(p.price)}</span></div>` : ''}${cardAction(p)}</article>` }

/* ---------- Our Collection gallery ---------- */
const COLLECTION = [
  { key: 'bread', title: 'Artisan Sourdough Bread', note: 'Naturally leavened, 30 oz (850 g) loaves.' },
  { key: 'spreads', title: 'Gourmet Spreads', note: 'Vegetable spreads inspired by Georgian cuisine, created to go with our bread.' },
];
let colFilter = 'all';
function cmedia(p) {
  // Real product photo when one exists; otherwise an honest placeholder: the brand illustration + "Photo coming soon".
  return p.card
    ? cardImg(p)
    : `<div class="cph" style="background:${p.bg}">${art(p)}<span class="cphnote">Photo coming soon</span></div>`;
}
function ccard(p) { const a = isAvail(p); return `<article class="ccard"><a class="cmedia" href="#product-${p.id}" tabindex="-1" aria-hidden="true">${cmedia(p)}${a ? AVAIL : SOON}</a>
<div class="cbody"><h4><a href="#product-${p.id}">${p.name}</a></h4><span class="sr-only">${a ? 'Available now.' : 'Coming soon.'}</span><p>${p.short}</p>${p.price != null ? `<p class="cmeta"><span>${p.size}</span><span>${money(p.price)}</span></p>` : ''}${a ? (canBuyOnline(p) ? `<button class="btn" data-add="${p.id}">Add to cart</button>` : `<button class="btn" data-order="${p.id}">Order</button>`) : ''}</div></article>` }
function collection() { return `<section class="collection" id="collection" aria-labelledby="col-h"><div class="wrap">
<div class="cintro"><div class="ctext"><p class="eyebrow">Our Collection</p><h2 id="col-h">Something Good Is Rising.</h2>
<p class="clead">Naturally leavened artisan bread. Thoughtfully crafted gourmet spreads. Made to be enjoyed together.</p>
${P.some(isAvail) ? `<p class="cnow"><b>Now baking:</b> ${P.filter(isAvail).map(p => `<a href="#product-${p.id}">${p.name}</a>`).join(' &amp; ')}</p>` : ''}
<p class="cline">${P.some(isAvail) ? 'More coming soon.' : 'Coming Soon.'}</p><a class="btn ghost" href="#news">Get launch updates</a></div>
<figure class="cfeature"><picture><source type="image/webp" srcset="/img/schmearly-dark-rye-720.webp 720w, /img/schmearly-dark-rye-1200.webp 1199w" sizes="(max-width: 900px) 100vw, 46vw"><img src="/img/schmearly-dark-rye-720.webp" alt="SCHMEARLY: Artisan Bread &amp; Spreads. A dark rye sourdough loaf with a crackled, flour-dusted crust on a linen towel." width="1199" height="1312" loading="lazy" decoding="async"></picture></figure></div>
<div class="ctabs" role="group" aria-label="Show products">${[['all', 'All Collection'], ['bread', 'Bread'], ['spreads', 'Spreads']].map(([k, l]) => `<button type="button" class="chip${colFilter === k ? ' on' : ''}" data-col="${k}" aria-pressed="${colFilter === k}">${l}</button>`).join('')}</div>
${COLLECTION.map(g => `<div class="cgroup" data-group="${g.key}"${colFilter !== 'all' && colFilter !== g.key ? ' hidden' : ''}><div class="ghead"><h3>${g.title}</h3><p>${g.note}</p></div><div class="cgrid">${P.filter(p => p.cat === g.key).map(ccard).join('')}</div></div>`).join('')}
</div></section>` }
// Site-wide Gallery: every real photo; each opens full screen and links to its product.
// Shown once there are at least 2 photos (a one-photo "gallery" would just repeat the Collection image).
function gallerySection() { if (ALL_PHOTOS.length < 2) return ''; return `<section class="gallerysec" id="gallery" aria-labelledby="gal-h"><div class="wrap"><p class="eyebrow">Gallery</p><h2 id="gal-h">Fresh from our oven.</h2>
<div class="ggrid">${ALL_PHOTOS.map((ph, i) => `<figure class="gitem"><button type="button" class="gopen" data-lb="all" data-i="${i}" aria-label="View photo: ${esc(ph.alt)}"><img src="${ph.small || ph.src}" alt="${esc(ph.alt)}" width="${ph.w}" height="${ph.h}" loading="lazy" decoding="async"></button><figcaption><a href="#product-${ph.p.id}">${ph.p.name}</a></figcaption></figure>`).join('')}</div></div></section>` }
// Product-page gallery: main photo (click = full screen) + thumbnails when there are several.
function pgallery(p) { const ph = p.photos || []; if (!ph.length) return `<div class="gallery" style="background:${p.bg}">${art(p)}</div>`;
  return `<div class="gallery photos"><button type="button" class="gmain" data-lb="${p.id}" data-i="0" aria-label="View photo full screen"><img id="gmainImg" src="${ph[0].small || ph[0].src}" srcset="${ph[0].small ? `${ph[0].small} 720w, ` : ''}${ph[0].src} ${ph[0].w}w" sizes="(max-width: 800px) 100vw, 50vw" alt="${esc(ph[0].alt)}" width="${ph[0].w}" height="${ph[0].h}" decoding="async"></button>
${ph.length > 1 ? `<div class="gthumbs">${ph.map((x, i) => `<button type="button" data-lb="${p.id}" data-i="${i}" aria-label="Photo ${i + 1}"><img src="${x.small || x.src}" alt="" loading="lazy"></button>`).join('')}</div>` : ''}</div>` }
function setCollection(k) { colFilter = k; $$('[data-col]').forEach(b => { const on = b.dataset.col === k; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on) }); $$('.cgroup').forEach(g => { g.hidden = k !== 'all' && g.dataset.group !== k }) }

function home() { return `<div class="view">
<section class="hero"><div class="wrap grid">
<div><h1><span>Don't just</span><span>eat bread.</span><span>Schmear it.</span></h1>
<p class="sub">Artisan sourdough. Bold vegetable spreads. Made to be together.</p>
<div class="cta"><a class="btn" href="#shop-spreads">Shop the spreads</a><a class="btn ghost" href="#shop-bread">Discover our bread</a></div></div>
<div><div class="plate">${slice('#D44D3E', true)}</div></div>
</div>
<div class="ticker" aria-hidden="true"><div>${'Dark rye · Red whole wheat · White whole wheat · Olive &amp; rosemary · Spinach &amp; walnut · Eggplant &amp; walnut · Green bean &amp; walnut · <b>Better together</b> · '.repeat(6)}</div></div>
</section>
${collection()}
${gallerySection()}
<section class="pair"><div class="wrap"><p class="eyebrow">The Perfect Pair</p><h2>Better together.</h2>
<div class="grid">
<div class="card"><div class="art">${loaf()}</div><h3>The bread</h3><p>Sourdough on natural starter, no commercial yeast. Dense, a little sour, built to carry a thick layer.</p><a class="btn ghost" href="#shop-bread">See the loaves</a></div>
<div class="plus" aria-hidden="true">+</div>
<div class="card"><div class="art">${jar(by('spinach'))}</div><h3>The schmear</h3><p>Pkhali: vegetables, walnuts and herbs ground into a bright, spoonable spread.</p><a class="btn ghost" href="#shop-spreads">Meet the spreads</a></div>
</div></div></section>
<section><div class="wrap"><p class="eyebrow">Shop by craving</p><h2>What are you hungry for?</h2>
<div class="tiles">
<a class="tile t1" href="#shop-bread"><div class="art">${loaf()}</div><div><h3>Bread</h3><p>Four sourdoughs, 30 oz loaves</p></div></a>
<a class="tile t2" href="#shop-spreads"><div class="art">${jar(by('eggplant'))}</div><div><h3>Spreads</h3><p>Three vegetable &amp; walnut spreads</p></div></a>
<a class="tile t3" href="#shop-sets"><div class="art">${boxArt()}</div><div><h3>Sets</h3><p>Bread and spread, boxed</p></div></a>
</div></div></section>
<section style="padding-top:0"><div class="wrap"><p class="eyebrow">Meet the schmears</p><h2>Three jars. Three moods.</h2>
<div class="cards">${P.filter(p => p.cat === 'spreads').map(card).join('')}
<article class="pcard" style="border-style:dashed"><div class="art" style="background:#EDE3D2"><span class="ph">[NEXT FLAVOR]</span></div><h3>Seasonal &amp; Specialty</h3><p class="small">Small batches that come and go with the season.</p><a class="btn ghost" href="#news">Tell me first</a></article>
</div></div></section>
<section class="craft" id="craft"><div class="wrap"><p class="eyebrow">The Craft</p><h2>Made the slow way.</h2>
<div class="cols">
<div><h3>Sourdough</h3><p>Natural starter, no commercial yeast. Good bread takes its time, so we give it time.</p></div>
<div><h3>Vegetables</h3><p>Spinach, eggplant, green beans. The vegetable is the main ingredient, not the garnish.</p></div>
<div><h3>Walnuts</h3><p>Ground into every pkhali for body and a round, toasty depth.</p></div>
<div><h3>Recipes</h3><p>Pkhali comes from the Georgian table. We kept the method and made it jar-ready.</p></div>
</div></div></section>
<section class="kosher" id="kosher"><div class="wrap"><div class="box"><div><p class="eyebrow">Kosher by design</p><h2>Certified, start to finish.</h2><p style="margin-top:14px;max-width:560px">Every loaf and every jar is made under kosher supervision by ${ph(SITE.kosherAgency)}. It is part of how we work, and you will find the mark on every label.</p></div><div class="mark">[CERTIFICATION MARK]</div></div></div></section>
<section class="boxteaser"><div class="wrap grid"><div><p class="eyebrow">Build your box</p><h2>Pick a loaf. Add three jars.</h2><p style="margin:16px 0 24px;font-size:20px;font-weight:500;max-width:480px">Mix the flavors your way and send it all in one box.</p><a class="btn" href="#box">Start building</a></div>
<div class="slots"><div class="slot full">${loaf()}</div><div class="slot full">${jar(by('spinach'))}</div><div class="slot full">${jar(by('eggplant'))}</div><div class="slot">Your pick</div></div></div></section>
<section class="story" id="story"><div class="wrap grid"><div class="txt"><p class="eyebrow" style="color:var(--pist)">Our story</p><h2>One baker. One mill. One idea.</h2><p style="font-size:20px;max-width:480px">Uriel Shtern mills, bakes and mixes every batch himself. Schmearly started with a simple thought: good bread deserves a great schmear.</p><p style="font-size:17px;max-width:480px;color:var(--pist)">Schmearly is made by the team behind <a href="https://rivkacakes.com" rel="noopener">Rivka Cakes</a>.</p></div><img src="founder.jpg" alt="Illustrated portrait of the baker behind Schmearly with his wooden grain mill and a bowl of fresh flour" loading="lazy" width="1000" height="1000" style="height:auto"></div></section>
<section class="news" id="news"><div class="wrap"><p class="eyebrow">Newsletter</p><h2>New jars first.</h2><p style="margin-top:12px;font-size:20px;font-weight:500">Seasonal flavors, special boxes, baking days.</p>
<form id="newsForm"><input type="email" required placeholder="you@email.com" aria-label="Email address"><button class="btn">Sign me up</button></form><p class="small" id="newsMsg" style="margin-top:10px"></p></div></section></div>` }

const CATS = { all: 'All', bread: 'Bread', spreads: 'Spreads', sets: 'Bread & Spread Sets' };
function shop(cat) { const list = P.filter(p => cat === 'all' || p.cat === cat); return `<div class="view wrap" style="padding-top:40px;padding-bottom:80px"><p class="eyebrow">Shop</p><h2>${CATS[cat]}</h2>
<div class="filters">${Object.keys(CATS).map(k => `<a class="chip ${k === cat ? 'on' : ''}" href="#shop-${k}">${CATS[k]}</a>`).join('')}</div>
<div class="cards">${list.map(card).join('')}</div></div>` }

function pdp(p) { return `<div class="view wrap"><div class="pdp">
${pgallery(p)}
<div class="info"><p class="eyebrow"><a href="#shop-${p.cat}">${CATS[p.cat]}</a></p><h1>${p.name}</h1><p style="font-size:21px;font-weight:500">${p.short}</p>
${p.price != null ? `<div class="price">${money(p.price)}</div>` : ''}
${canBuyOnline(p) ? `<div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center"><div class="qty"><button data-pq="-1" aria-label="Decrease quantity">−</button><span id="pq">1</span><button data-pq="1" aria-label="Increase quantity">+</button></div><button class="btn" style="flex:1 1 200px" data-add="${p.id}" data-usepq="1">Add to cart</button></div>`
  : isAvail(p) ? `<div class="prelaunch">${AVAIL}<button class="btn" data-order="${p.id}" style="flex:1 1 220px">Order</button></div><p class="small">We take orders by WhatsApp, text or phone.</p>`
  : `<div class="prelaunch">${SOON}<a class="btn ghost" href="#news">Notify me when it's ready</a></div>`}
<dl>${p.size ? `<div><dt>Size</dt><dd>${p.size}</dd></div>` : ''}<div><dt>Ingredients</dt><dd>${ph(p.ingredients)}</dd></div><div><dt>Allergens</dt><dd>${ph(p.allergens)}</dd></div><div><dt>Kosher</dt><dd>Certified by ${ph(SITE.kosherAgency)}</dd></div><div><dt>Storage</dt><dd>${ph(p.storage)}</dd></div><div><dt>Shelf life</dt><dd>${ph(p.shelfLife)}</dd></div></dl>
</div></div>
${p.cat === 'bread' ? `<a href="#story" class="maker"><img src="founder.jpg" alt="Illustrated portrait of the Schmearly baker" loading="lazy"><span><span class="eyebrow" style="color:var(--pist)">The baker</span><b>Milled, mixed and baked by Uriel Shtern.</b><span>Read our story</span></span></a>` : ''}
<div style="padding-bottom:80px"><p class="eyebrow">${p.cat === 'bread' ? 'This loaf wants a schmear' : 'Goes best with'}</p><h2 style="font-size:clamp(36px,5vw,64px)">Better together.</h2><div class="cards">${p.pair.map(i => card(by(i))).join('')}</div></div></div>` }

const MAX_BOX_BREADS = 2;
const emptyBox = () => ({ breads: Object.fromEntries(P.filter(p => p.cat === 'bread').map((p, i) => [p.id, i ? 0 : 1])), spreads: Object.fromEntries(P.filter(p => p.cat === 'spreads').map(p => [p.id, 0])) });
let bx = emptyBox();
const sum = o => Object.values(o).reduce((a, b) => a + b, 0);
const bxCount = () => sum(bx.spreads);
function prelaunchView(eyebrow, title) { return `<div class="view wrap" style="padding:80px 0;min-height:60vh"><p class="eyebrow">${eyebrow}</p><h2>${title}</h2><p style="margin:16px 0 8px;font-size:20px;max-width:560px">Our bread and spreads are getting ready for launch. Orders open soon.</p><p style="margin-bottom:28px">${SOON}</p><div class="cta"><a class="btn" href="#collection">See the collection</a><a class="btn ghost" href="#news">Notify me at launch</a></div></div>` }
function box() { if (!LIVE) return prelaunchView('Build your box', 'Your box, your rules.');
  const sp = P.filter(p => p.cat === 'spreads'), br = P.filter(p => p.cat === 'bread'), n = bxCount(), nb = sum(bx.breads);
  const picked = sp.flatMap(p => Array(bx.spreads[p.id]).fill(p)), loaves = br.flatMap(p => Array(bx.breads[p.id]).fill(p));
  const total = [...loaves, ...picked].reduce((a, p) => a + p.price, 0);
  const slots = [loaves[0] ? `<div class="slot full">${loaf(loaves[0])}</div>` : '<div class="slot">No bread</div>', ...[0, 1, 2].map(i => picked[i] ? `<div class="slot full">${jar(picked[i])}</div>` : '<div class="slot">Jar ' + (i + 1) + '</div>')].join('');
  return `<div class="view wrap" style="padding-top:40px"><p class="eyebrow">Build your box</p><h2>Your box, your rules.</h2>
<div class="byb" style="margin-top:32px"><div>
<h3>1. The bread <span class="small" style="font-family:Archivo,sans-serif;text-transform:none">up to ${MAX_BOX_BREADS} loaves</span></h3><div class="picks">${br.map(p => `<div class="pick">${loaf(p)}<div><b>${p.name}</b><div class="small">30 oz · ${money(p.price)}</div></div><div class="qty"><button data-bb="${p.id}" data-d="-1" aria-label="Remove ${p.word}">−</button><span>${bx.breads[p.id]}</span><button data-bb="${p.id}" data-d="1" aria-label="Add ${p.word}">+</button></div></div>`).join('')}</div>
${nb > 1 ? `<p class="small" style="margin:-18px 0 24px">${nb} loaves in this box.</p>` : ''}
<h3>2. Three spreads <span class="small" style="font-family:Archivo,sans-serif;text-transform:none">${n} of 3 picked</span></h3><div class="picks">${sp.map(p => `<div class="pick">${jar(p)}<div><b>${p.name}</b><div class="small">8 oz · ${money(p.price)}</div></div><div class="qty"><button data-bs="${p.id}" data-d="-1" aria-label="Remove ${p.word}">−</button><span>${bx.spreads[p.id]}</span><button data-bs="${p.id}" data-d="1" aria-label="Add ${p.word}">+</button></div></div>`).join('')}</div>
</div>
<div class="summary"><h3>In your box</h3><div class="slots">${slots}</div><div class="tot"><span>Total</span><span>${money(total)}</span></div><p class="small" style="color:var(--pist)">Spreads ship chilled. Shipping is calculated at checkout.</p><button class="btn light" id="boxAdd" ${n === 3 ? '' : 'disabled'}>${n === 3 ? 'Add box to cart' : 'Pick ' + (3 - n) + ' more'}</button></div></div></div>` }

let zipMsg = '';
function orderLines() { return Object.keys(cart).map(i => { const p = by(i); return `<div class="line">${art(p)}<div><b>${p.name}</b><div class="small">${money(p.price)} · ${p.size}</div></div><div class="qty"><button data-cq="${i}" data-d="-1" aria-label="Decrease ${p.name}">−</button><span>${cart[i]}</span><button data-cq="${i}" data-d="1" aria-label="Increase ${p.name}">+</button></div></div>` }).join('') }
function checkout() { if (!LIVE) return prelaunchView('Checkout', 'Almost ready.');
  if (!cartCount()) return `<div class="view wrap" style="padding:80px 0;min-height:60vh"><h2>Your cart is empty.</h2><p style="margin:16px 0 24px">Start with a jar or build a box.</p><a class="btn" href="#shop-all">Go to shop</a></div>`;
  return `<div class="view wrap" style="padding-top:40px"><p class="eyebrow">Checkout</p><h2>Almost yours.</h2>
<div class="co" style="margin-top:32px"><div>
<fieldset><legend>Your order</legend><div>${orderLines()}</div></fieldset>
<fieldset><legend>Delivery</legend><p>Bread ships standard. Spreads ship chilled, so delivery options depend on where you are.</p><div class="formrow" style="margin:0"><label>ZIP code<input id="zip" inputmode="numeric" maxlength="5" placeholder="10001"></label><button type="button" class="btn ghost" id="zipBtn" style="align-self:flex-end">Check delivery</button></div><div id="zipOut">${zipMsg}</div></fieldset>
</div>
<div class="summary" style="background:#FBF5EA;color:var(--green);border:2.5px solid var(--green)"><h3>Summary</h3>${Object.keys(cart).map(i => `<div style="display:flex;justify-content:space-between;gap:12px"><span>${cart[i]} × ${by(i).name}</span><b>${money(by(i).price * cart[i])}</b></div>`).join('')}
<div style="display:flex;justify-content:space-between"><span>Delivery</span><span class="small">Calculated at payment</span></div><div class="tot"><span>Subtotal</span><span>${money(cartSub())}</span></div><button class="btn" id="payBtn">Pay securely</button><p class="small" id="coMsg">You will enter your email, address and card (or Apple Pay / Google Pay) on the secure Stripe page.</p></div></div></div>` }

function thanks() { return `<div class="view wrap" style="padding:80px 0;min-height:60vh"><p class="eyebrow">Order received</p><h2>Thank you. It's schmear time.</h2><p style="margin:16px 0 24px;font-size:20px;max-width:560px">Your payment went through. A receipt is on its way to your email, and we'll be in touch about delivery.</p><a class="btn" href="#home">Back to the shop</a></div>` }

/* ---------- router ---------- */
function route() { const h = (location.hash || '#home').slice(1); let html, anchor;
  if (h.startsWith('shop-') && CATS[h.slice(5)]) html = shop(h.slice(5));
  else if (h.startsWith('product-') && by(h.slice(8))) html = pdp(by(h.slice(8)));
  else if (h === 'box') html = box();
  else if (h === 'checkout') html = checkout();
  else if (h === 'thanks') html = thanks();
  else { html = home(); if (['collection', 'gallery', 'craft', 'kosher', 'story', 'news'].includes(h)) anchor = h }
  $$('dialog[open]').forEach(d => d.close());
  $('#app').innerHTML = html; $('#nav').classList.remove('open'); $('#menuBtn').setAttribute('aria-expanded', 'false');
  $$('#nav a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + h));
  const prod = h.startsWith('product-') && by(h.slice(8));
  const page = prod ? prod.name : h.startsWith('shop-') ? CATS[h.slice(5)] : { box: 'Build Your Box', checkout: 'Checkout', thanks: 'Thank you' }[h];
  document.title = page ? `${page} · Schmearly` : 'Schmearly · Artisan sourdough bread & gourmet spreads';
  if (anchor) { const e = document.getElementById(anchor); e && e.scrollIntoView() } else window.scrollTo(0, 0) }
function rerender(html) { const y = window.scrollY; $('#app').innerHTML = html; const v = $('.view'); v && (v.style.animation = 'none'); window.scrollTo(0, y) }

/* ---------- cart UI ---------- */
function toast(t) { const e = $('#toast'); e.textContent = t; e.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => e.classList.remove('show'), 2600) }
function add(id, q = 1) { cart[id] = Math.min(SITE.maxQtyPerItem, (cart[id] || 0) + q); saveCart(); drawCart(); const b = $('#cartBtn'); b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump') }
function drawCart() { if (!LIVE) return; const ids = Object.keys(cart), n = cartCount(); $('#count').textContent = n;
  const hasBread = ids.some(i => by(i).cat === 'bread' || i === 'box'), hasSpread = ids.some(i => by(i).cat !== 'bread');
  let up = ''; if (n && !hasBread) up = `<div class="upsell"><span><b>No bread yet?</b><br><span class="small">${by('rye').name}, ${money(by('rye').price)}</span></span><button class="btn" data-add="rye" style="min-height:44px;padding:8px 16px">Add</button></div>`;
  else if (n && !hasSpread) up = `<div class="upsell"><span><b>This loaf wants a schmear.</b><br><span class="small">Spinach &amp; Walnut, ${money(by('spinach').price)}</span></span><button class="btn" data-add="spinach" style="min-height:44px;padding:8px 16px">Add</button></div>`;
  $('#cartItems').innerHTML = n ? orderLines() + up : '<p style="padding:28px 0">Nothing here yet. Bread is lonely without a schmear.</p>';
  $('#cartFt').innerHTML = n ? `<div class="tot"><span>Subtotal</span><span>${money(cartSub())}</span></div><p class="small">Shipping is calculated at checkout.</p><a class="btn" href="#checkout" id="toCo">Checkout</a>` : `<a class="btn" href="#shop-all" id="toCo">Go to shop</a>` }
function openCart(o) { $('#cart').classList.toggle('open', o); $('#scrim').classList.toggle('open', o); $('#cart').setAttribute('aria-hidden', String(!o)); $('#cart').inert = !o; if (o) $('#cartClose').focus() }

async function pay(btn) {
  btn.disabled = true; const old = btn.textContent; btn.textContent = 'Opening secure payment…';
  try {
    const res = await fetch('/api/checkout', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ items: Object.entries(cart).map(([id, qty]) => ({ id, qty })) }) });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.url) { location.href = data.url; return }
    throw new Error(data.error || 'Payment could not be started.');
  } catch (err) {
    $('#coMsg').textContent = err.message === 'Failed to fetch' ? 'Connection problem. Please try again.' : err.message;
    toast('Payment could not be started');
    btn.disabled = false; btn.textContent = old;
  }
}

/* ---------- photo viewer (full screen) ---------- */
const lb = { list: [], i: 0 };
function lbShow() { const ph = lb.list[lb.i]; $('#lbImg').src = ph.src; $('#lbImg').alt = ph.alt; $('#lbImg').width = ph.w; $('#lbImg').height = ph.h;
  $('#lbCap').innerHTML = `<a href="#product-${ph.p.id}" data-lbclose="1">${ph.p.name}</a>${lb.list.length > 1 ? ` <span>${lb.i + 1} / ${lb.list.length}</span>` : ''}`;
  $$('#lb .lbnav').forEach(b => b.hidden = lb.list.length < 2) }
function openLB(key, i) { lb.list = photoList(key); if (!lb.list.length) return; lb.i = Math.max(0, Math.min(i, lb.list.length - 1)); lbShow(); $('#lb').showModal() }
function stepLB(d) { if (lb.list.length < 2) return; lb.i = (lb.i + d + lb.list.length) % lb.list.length; lbShow() }

/* ---------- Order dialog (orders by WhatsApp / text / phone while online payment is off) ---------- */
function openOrder(id) { const p = by(id), c = SITE.contact;
  const msg = p ? `Hi! I'd like to order ${p.name} (${p.size}${p.price != null ? ', ' + money(p.price) : ''}).` : `Hi! I'd like to place an order with Schmearly.`;
  const m = encodeURIComponent(msg);
  const list = p ? '' : `<ul class="olist">${P.filter(isAvail).map(x => `<li><span>${x.name}</span><b>${money(x.price)}</b></li>`).join('')}</ul>`;
  $('#orderBody').innerHTML = `<p class="eyebrow">Order</p><h3 id="odTitle">${p ? p.name : 'Order fresh bread'}</h3>
${p ? `<p class="small">${p.size} · ${money(p.price)}</p>` : list}
<p>Send us a message and we'll confirm availability, pickup or delivery, and payment.</p>
<div class="oactions">${c.whatsapp ? `<a class="btn" href="https://wa.me/${c.whatsapp}?text=${m}" target="_blank" rel="noopener">WhatsApp</a>` : ''}${c.phone ? `<a class="btn ghost" href="sms:${c.phone}?&body=${m}">Text us</a><a class="btn ghost" href="tel:${c.phone}">Call ${c.phoneLabel || c.phone}</a>` : ''}${c.email ? `<a class="btn ghost" href="mailto:${c.email}?subject=${encodeURIComponent('Schmearly order')}&body=${m}">Email</a>` : ''}</div>
${!c.whatsapp && !c.phone && !c.email ? '<p class="ph">[CONTACT DETAILS TO ADD]</p>' : ''}`;
  $('#orderDlg').showModal() }

document.addEventListener('click', e => { const t = e.target.closest('button,a'); if (!t) return;
  if (t.dataset.lbclose) { $('#lb').close(); if (t.tagName === 'BUTTON') return }
  if (t.dataset.lbstep) return stepLB(+t.dataset.lbstep);
  if (t.dataset.lb) return openLB(t.dataset.lb, +t.dataset.i || 0);
  if (t.dataset.order) return openOrder(t.dataset.order);
  if (t.dataset.oclose) return $('#orderDlg').close();
  if (t.closest('#orderDlg .oactions')) { setTimeout(() => $('#orderDlg').close(), 300); return }
  if (t.id === 'cartBtn') return openCart(true);
  if (t.id === 'cartClose') return openCart(false);
  if (t.id === 'toCo') return openCart(false);
  if (t.dataset.col) return setCollection(t.dataset.col);
  if (!LIVE && (t.dataset.add || t.id === 'payBtn' || t.id === 'boxAdd')) return;
  if (t.id === 'payBtn') return pay(t);
  if (t.id === 'menuBtn') { const o = $('#nav').classList.toggle('open'); t.setAttribute('aria-expanded', o); return }
  if (t.dataset.add) { const q = t.dataset.usepq ? +$('#pq').textContent : 1; add(t.dataset.add, q); if (!t.closest('.upsell')) { const old = t.textContent; t.textContent = 'Schmeared in'; t.classList.add('added'); setTimeout(() => { t.textContent = old; t.classList.remove('added') }, 1100) } return }
  if (t.dataset.pq) { const s = $('#pq'); s.textContent = Math.min(SITE.maxQtyPerItem, Math.max(1, +s.textContent + +t.dataset.pq)); return }
  if (t.dataset.cq) { const id = t.dataset.cq; cart[id] = Math.min(SITE.maxQtyPerItem, cart[id] + +t.dataset.d); if (cart[id] <= 0) delete cart[id]; saveCart(); drawCart(); if (location.hash === '#checkout') rerender(checkout()); return }
  if (t.dataset.bb) { const d = +t.dataset.d, id = t.dataset.bb; if (d > 0 && sum(bx.breads) >= MAX_BOX_BREADS) return toast(`Up to ${MAX_BOX_BREADS} loaves per box.`); bx.breads[id] = Math.max(0, bx.breads[id] + d); return rerender(box()) }
  if (t.dataset.bs) { const d = +t.dataset.d, id = t.dataset.bs; if (d > 0 && bxCount() >= 3) return toast('Three jars per box. Remove one to swap.'); bx.spreads[id] = Math.max(0, bx.spreads[id] + d); return rerender(box()) }
  if (t.id === 'boxAdd') { for (const g of [bx.breads, bx.spreads]) for (const [i, q] of Object.entries(g)) if (q) add(i, q); bx = emptyBox(); rerender(box()); toast('Your box is in the cart'); return openCart(true) }
  if (t.id === 'zipBtn') { const z = $('#zip').value.trim(); zipMsg = /^\d{5}$/.test(z) ? `<div class="msg">We ship within the US. Chilled delivery to ${z}: <span class="ph">[DELIVERY ZONES TO CONFIRM]</span>. Final shipping options appear on the payment page.</div>` : `<div class="msg">Enter a 5 digit ZIP code.</div>`; $('#zipOut').innerHTML = zipMsg; return }
});
$('#scrim').addEventListener('click', () => openCart(false));
document.addEventListener('keydown', e => { if (e.key === 'Escape') openCart(false); if ($('#lb').open && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) stepLB(e.key === 'ArrowRight' ? 1 : -1) });
// Click on the dark backdrop closes a dialog.
$$('dialog').forEach(d => d.addEventListener('click', e => { if (e.target === d) d.close() }));
// Swipe left / right in the photo viewer on phones.
{ let x0 = null; const d = $('#lb'); d.addEventListener('touchstart', e => { x0 = e.touches[0].clientX }, { passive: true }); d.addEventListener('touchend', e => { if (x0 == null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) stepLB(dx < 0 ? 1 : -1); x0 = null }) }
document.addEventListener('submit', e => { e.preventDefault();
  if (e.target.id === 'newsForm') { $('#newsMsg').textContent = 'Thanks! Our newsletter is launching soon. [SIGN-UP SERVICE TO CONNECT]'; e.target.reset() } });
window.addEventListener('hashchange', route);

// Returning from a successful Stripe payment: empty the cart and show the thank-you view.
const qs = new URLSearchParams(location.search);
if (qs.get('order') === 'success') {
  for (const k of Object.keys(cart)) delete cart[k];
  saveCart();
  history.replaceState(null, '', location.pathname + '#thanks');
}
$('#cart').inert = true;
if (!LIVE) $('#cartBtn').outerHTML = P.some(isAvail) ? '<button class="btn cartbtn" data-order="any">Order</button>' : '<a class="btn cartbtn" href="#news">Notify me</a>';
$('#year').textContent = new Date().getFullYear();
drawCart(); route();
