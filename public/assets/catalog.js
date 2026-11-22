// Single source of truth for products and prices.
// Used by the storefront (public/assets/app.js) AND by the payment code
// (src/checkout.js), so the price charged by Stripe is always the price here.
// Prices are in cents (1800 = $18.00). `price: null` = price not announced yet (hidden on the site).
//
// TODO (owner): confirm ingredients, allergens, storage, shelf life, spread sizes and prices.
// Text in [SQUARE BRACKETS] is shown on the site as a dashed placeholder until replaced.

export const CURRENCY = 'usd';

export const PRODUCTS = [
  // status: 'available' = can be ordered now (Order button), 'soon' = Coming Soon.
  // Breads: `crust` / `crumb` color the drawn loaf, `band` is the word printed on its paper band.
  // Photos (REAL photos only; until a product has one, the site shows its illustration):
  //   card:   square image for product cards (/img/...-card-800.webp, plus a -480 version)
  //   photos: full photos for the product-page gallery and the site Gallery
  {
    id: 'rye', cat: 'bread', status: 'available', name: 'Dark Rye Sourdough Bread', word: 'Dark Rye',
    short: 'Naturally leavened dark rye sourdough with a bold, crackled crust.',
    size: '30 oz (850 g)', price: 1800, color: '#33251F', bg: '#E4DCCB',
    crust: '#150E0C', crumb: '#33251F', band: 'DARK RYE.',
    card: '/img/dark-rye-card-800.webp', cardSmall: '/img/dark-rye-card-480.webp',
    photos: [
      { src: '/img/schmearly-dark-rye-1200.webp', small: '/img/schmearly-dark-rye-720.webp', w: 1199, h: 1312,
        alt: 'Dark Rye Sourdough Bread: a round loaf with a crackled, flour-dusted crust on a linen towel' },
    ],
    ingredients: '[INGREDIENT LIST FROM PRODUCER]',
    allergens: '[CONFIRM ALLERGENS]',
    storage: '[STORAGE FROM PRODUCER]',
    shelfLife: '[CONFIRMED SHELF LIFE]',
    pair: ['spinach', 'eggplant', 'greenbean'],
  },
  {
    id: 'redwheat', cat: 'bread', status: 'available', name: 'Organic Red Whole Wheat Sourdough', word: 'Red Wheat',
    short: 'Naturally leavened sourdough made with organic whole grain red wheat.',
    size: '30 oz (850 g)', price: 1800, color: '#7A4A2E', bg: '#EBD9C3',
    crust: '#3A2116', crumb: '#7A4A2E', band: 'RED WHEAT.',
    ingredients: '[INGREDIENT LIST FROM PRODUCER]',
    allergens: '[CONFIRM ALLERGENS]',
    storage: '[STORAGE FROM PRODUCER]',
    shelfLife: '[CONFIRMED SHELF LIFE]',
    pair: ['greenbean', 'spinach', 'eggplant'],
  },
  {
    id: 'whitewheat', cat: 'bread', status: 'soon', name: 'Organic White Whole Wheat Sourdough', word: 'White Wheat',
    short: 'Naturally leavened whole grain sourdough made with organic white wheat.',
    size: '30 oz (850 g)', price: 1800, color: '#B08A5E', bg: '#F1E8D6',
    crust: '#6A4527', crumb: '#B08A5E', band: 'WHITE WHEAT.',
    ingredients: '[INGREDIENT LIST FROM PRODUCER]',
    allergens: '[CONFIRM ALLERGENS]',
    storage: '[STORAGE FROM PRODUCER]',
    shelfLife: '[CONFIRMED SHELF LIFE]',
    pair: ['spinach', 'greenbean', 'eggplant'],
  },
  {
    id: 'olive', cat: 'bread', status: 'soon', name: 'Organic Olive & Rosemary Whole Wheat Sourdough', word: 'Olive',
    short: 'Naturally leavened organic white whole wheat with cured olives and fresh rosemary.',
    size: '30 oz (850 g)', price: 1800, color: '#5B4A3A', bg: '#DCE0C8',
    crust: '#2B2119', crumb: '#5B4A3A', band: 'OLIVE.', olives: true,
    ingredients: '[INGREDIENT LIST FROM PRODUCER]',
    allergens: '[CONFIRM ALLERGENS]',
    storage: '[STORAGE FROM PRODUCER]',
    shelfLife: '[CONFIRMED SHELF LIFE]',
    pair: ['eggplant', 'spinach', 'greenbean'],
  },
  // Spreads: no price or size announced yet.
  {
    id: 'spinach', cat: 'spreads', status: 'soon', name: 'Spinach & Walnut Spread', word: 'Spinach',
    short: 'A bright green vegetable spread inspired by Georgian cuisine. Made for a thick slice of sourdough.',
    size: null, price: null, color: '#7E9460', bg: '#E3EAD3',
    ingredients: '[INGREDIENT LIST FROM PRODUCER]',
    allergens: '[CONFIRM ALLERGENS]',
    storage: '[STORAGE FROM PRODUCER]',
    shelfLife: '[CONFIRMED SHELF LIFE]',
    pair: ['rye', 'redwheat', 'whitewheat'],
  },
  {
    id: 'eggplant', cat: 'spreads', status: 'soon', name: 'Eggplant & Walnut Spread', word: 'Eggplant',
    short: 'A rich, savory vegetable spread inspired by Georgian cuisine. Made to meet dark rye.',
    size: null, price: null, color: '#6B4660', bg: '#E6D9E1',
    ingredients: '[INGREDIENT LIST FROM PRODUCER]',
    allergens: '[CONFIRM ALLERGENS]',
    storage: '[STORAGE FROM PRODUCER]',
    shelfLife: '[CONFIRMED SHELF LIFE]',
    pair: ['rye', 'olive', 'redwheat'],
  },
  {
    id: 'greenbean', cat: 'spreads', status: 'soon', name: 'Green Bean & Walnut Spread', word: 'Green Bean',
    short: 'A fresh, vibrant vegetable spread inspired by Georgian cuisine. Made for whole wheat sourdough.',
    size: null, price: null, color: '#A9B97F', bg: '#EEF1DF',
    ingredients: '[INGREDIENT LIST FROM PRODUCER]',
    allergens: '[CONFIRM ALLERGENS]',
    storage: '[STORAGE FROM PRODUCER]',
    shelfLife: '[CONFIRMED SHELF LIFE]',
    pair: ['whitewheat', 'redwheat', 'rye'],
  },
  {
    id: 'box', cat: 'sets', status: 'soon', name: 'The Perfect Schmear Box', word: 'The Box',
    short: 'A loaf of our sourdough and three spreads, boxed together.',
    size: '1 loaf + 3 spreads', price: null, color: '#D44D3E', bg: '#F3D2CB',
    ingredients: '[INGREDIENT LIST FROM PRODUCER]',
    allergens: '[CONFIRM ALLERGENS]',
    storage: '[STORAGE FROM PRODUCER]',
    shelfLife: '[CONFIRMED SHELF LIFE]',
    pair: ['spinach', 'rye'],
  },
];

// Site-wide settings.
export const SITE = {
  // false = online cart / checkout / payment are off (also enforced in src/checkout.js);
  // products with status 'available' show an Order button that contacts us instead.
  // Set to true once Stripe is connected.
  launched: false,
  kosherAgency: '[CERTIFYING AGENCY]',
  // How customers order while online payment is off (Order button + footer).
  contact: { phone: '+19296661482', phoneLabel: '(929) 666-1482', whatsapp: '19296661482', email: '' },
  maxQtyPerItem: 20,
};

export const byId = id => PRODUCTS.find(p => p.id === id);
