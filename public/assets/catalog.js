// Single source of truth for products and prices.
// Used by the storefront (public/assets/app.js) AND by the payment code
// (src/checkout.js), so the price charged by Stripe is always the price here.
// Prices are in cents (1800 = $18.00). `price: null` = price not announced yet (hidden on the site).
//
// TODO (owner): confirm ingredients, allergens, storage, shelf life, spread sizes and prices.
// Text in [SQUARE BRACKETS] is shown on the site as a dashed placeholder until replaced.

export const CURRENCY = 'usd';

export const PRODUCTS = [
  // Breads: `crust` / `crumb` color the drawn loaf, `band` is the word printed on its paper band.
  // `photo`: path to a REAL product photo in /img (leave null until one exists).
  {
    id: 'rye', cat: 'bread', name: 'Dark Rye Sourdough Bread', word: 'Dark Rye',
    short: 'Naturally leavened dark rye sourdough with a bold, crackled crust.',
    size: '30 oz (850 g)', price: 1800, color: '#33251F', bg: '#E4DCCB',
    crust: '#150E0C', crumb: '#33251F', band: 'DARK RYE.', photo: null,
    ingredients: '[INGREDIENT LIST FROM PRODUCER]',
    allergens: '[CONFIRM ALLERGENS]',
    storage: '[STORAGE FROM PRODUCER]',
    shelfLife: '[CONFIRMED SHELF LIFE]',
    pair: ['spinach', 'eggplant', 'greenbean'],
  },
  {
    id: 'redwheat', cat: 'bread', name: 'Organic Red Whole Wheat Sourdough', word: 'Red Wheat',
    short: 'Naturally leavened sourdough made with organic whole grain red wheat.',
    size: '30 oz (850 g)', price: 1800, color: '#7A4A2E', bg: '#EBD9C3',
    crust: '#3A2116', crumb: '#7A4A2E', band: 'RED WHEAT.', photo: null,
    ingredients: '[INGREDIENT LIST FROM PRODUCER]',
    allergens: '[CONFIRM ALLERGENS]',
    storage: '[STORAGE FROM PRODUCER]',
    shelfLife: '[CONFIRMED SHELF LIFE]',
    pair: ['greenbean', 'spinach', 'eggplant'],
  },
  {
    id: 'whitewheat', cat: 'bread', name: 'Organic White Whole Wheat Sourdough', word: 'White Wheat',
    short: 'Naturally leavened whole grain sourdough made with organic white wheat.',
    size: '30 oz (850 g)', price: 1800, color: '#B08A5E', bg: '#F1E8D6',
    crust: '#6A4527', crumb: '#B08A5E', band: 'WHITE WHEAT.', photo: null,
    ingredients: '[INGREDIENT LIST FROM PRODUCER]',
    allergens: '[CONFIRM ALLERGENS]',
    storage: '[STORAGE FROM PRODUCER]',
    shelfLife: '[CONFIRMED SHELF LIFE]',
    pair: ['spinach', 'greenbean', 'eggplant'],
  },
  {
    id: 'olive', cat: 'bread', name: 'Organic Olive & Rosemary Whole Wheat Sourdough', word: 'Olive',
    short: 'Naturally leavened organic white whole wheat with cured olives and fresh rosemary.',
    size: '30 oz (850 g)', price: 1800, color: '#5B4A3A', bg: '#DCE0C8',
    crust: '#2B2119', crumb: '#5B4A3A', band: 'OLIVE.', olives: true, photo: null,
    ingredients: '[INGREDIENT LIST FROM PRODUCER]',
    allergens: '[CONFIRM ALLERGENS]',
    storage: '[STORAGE FROM PRODUCER]',
    shelfLife: '[CONFIRMED SHELF LIFE]',
    pair: ['eggplant', 'spinach', 'greenbean'],
  },
  // Spreads: no price or size announced yet.
  {
    id: 'spinach', cat: 'spreads', name: 'Spinach & Walnut Spread', word: 'Spinach',
    short: 'A bright green vegetable spread inspired by Georgian cuisine. Made for a thick slice of sourdough.',
    size: null, price: null, color: '#7E9460', bg: '#E3EAD3', photo: null,
    ingredients: '[INGREDIENT LIST FROM PRODUCER]',
    allergens: '[CONFIRM ALLERGENS]',
    storage: '[STORAGE FROM PRODUCER]',
    shelfLife: '[CONFIRMED SHELF LIFE]',
    pair: ['rye', 'redwheat', 'whitewheat'],
  },
  {
    id: 'eggplant', cat: 'spreads', name: 'Eggplant & Walnut Spread', word: 'Eggplant',
    short: 'A rich, savory vegetable spread inspired by Georgian cuisine. Made to meet dark rye.',
    size: null, price: null, color: '#6B4660', bg: '#E6D9E1', photo: null,
    ingredients: '[INGREDIENT LIST FROM PRODUCER]',
    allergens: '[CONFIRM ALLERGENS]',
    storage: '[STORAGE FROM PRODUCER]',
    shelfLife: '[CONFIRMED SHELF LIFE]',
    pair: ['rye', 'olive', 'redwheat'],
  },
  {
    id: 'greenbean', cat: 'spreads', name: 'Green Bean & Walnut Spread', word: 'Green Bean',
    short: 'A fresh, vibrant vegetable spread inspired by Georgian cuisine. Made for whole wheat sourdough.',
    size: null, price: null, color: '#A9B97F', bg: '#EEF1DF', photo: null,
    ingredients: '[INGREDIENT LIST FROM PRODUCER]',
    allergens: '[CONFIRM ALLERGENS]',
    storage: '[STORAGE FROM PRODUCER]',
    shelfLife: '[CONFIRMED SHELF LIFE]',
    pair: ['whitewheat', 'redwheat', 'rye'],
  },
  {
    id: 'box', cat: 'sets', name: 'The Perfect Schmear Box', word: 'The Box',
    short: 'A loaf of our sourdough and three spreads, boxed together.',
    size: '1 loaf + 3 spreads', price: null, color: '#D44D3E', bg: '#F3D2CB', photo: null,
    ingredients: '[INGREDIENT LIST FROM PRODUCER]',
    allergens: '[CONFIRM ALLERGENS]',
    storage: '[STORAGE FROM PRODUCER]',
    shelfLife: '[CONFIRMED SHELF LIFE]',
    pair: ['spinach', 'rye'],
  },
];

// Site-wide settings.
export const SITE = {
  // false = pre-launch: every product shows "Coming Soon", cart / checkout / payment are off
  // (also enforced on the server in src/checkout.js). Set to true on launch day.
  launched: false,
  kosherAgency: '[CERTIFYING AGENCY]',
  maxQtyPerItem: 20,
};

export const byId = id => PRODUCTS.find(p => p.id === id);
