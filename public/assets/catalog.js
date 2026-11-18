// Single source of truth for products and prices.
// Used by the storefront (public/assets/app.js) AND by the payment function
// (functions/api/checkout.js), so the price charged by Stripe is always the price here.
// Prices are in cents (1400 = $14.00).
//
// TODO (owner): confirm prices, ingredients, allergens, storage, shelf life.
// Text in [SQUARE BRACKETS] is shown on the site as a dashed placeholder until replaced.

export const CURRENCY = 'usd';

export const PRODUCTS = [
  // Breads: `crust` / `crumb` color the drawn loaf, `band` is the word printed on its paper band.
  {
    id: 'rye', cat: 'bread', name: 'Organic Dark Rye Sourdough', word: 'Dark Rye',
    short: 'Real dark rye on natural starter, no commercial yeast. Thick crust, dense crumb, deep flavor.',
    size: '30 oz (850 g) loaf', price: 1800, color: '#33251F', bg: '#B7C49A',
    crust: '#150E0C', crumb: '#33251F', band: 'DARK RYE.',
    ingredients: '[INGREDIENT LIST FROM PRODUCER]',
    allergens: 'Rye (gluten) [CONFIRM FULL LIST]',
    storage: '[STORAGE FROM PRODUCER]',
    shelfLife: '[CONFIRMED SHELF LIFE]',
    pair: ['spinach', 'eggplant', 'box'],
  },
  {
    id: 'redwheat', cat: 'bread', name: 'Organic Red Whole Wheat Sourdough', word: 'Red Wheat',
    short: 'Organic red whole wheat on natural starter, no commercial yeast. Nutty, hearty and made for every day.',
    size: '30 oz (850 g) loaf', price: 1800, color: '#7A4A2E', bg: '#EBD9C3',
    crust: '#3A2116', crumb: '#7A4A2E', band: 'RED WHEAT.',
    ingredients: '[INGREDIENT LIST FROM PRODUCER]',
    allergens: 'Wheat (gluten) [CONFIRM FULL LIST]',
    storage: '[STORAGE FROM PRODUCER]',
    shelfLife: '[CONFIRMED SHELF LIFE]',
    pair: ['greenbean', 'spinach', 'eggplant'],
  },
  {
    id: 'olive', cat: 'bread', name: 'Organic Kalamata Olive & Rosemary Whole Wheat Sourdough', word: 'Olive',
    short: 'Whole wheat sourdough with Kalamata olives and rosemary, on natural starter with no commercial yeast.',
    size: '30 oz (850 g) loaf', price: 1800, color: '#5B4A3A', bg: '#DCE0C8',
    crust: '#2B2119', crumb: '#5B4A3A', band: 'KALAMATA.', olives: true,
    ingredients: '[INGREDIENT LIST FROM PRODUCER]',
    allergens: 'Wheat (gluten) [CONFIRM FULL LIST]',
    storage: '[STORAGE FROM PRODUCER]',
    shelfLife: '[CONFIRMED SHELF LIFE]',
    pair: ['eggplant', 'spinach', 'greenbean'],
  },
  {
    id: 'spinach', cat: 'spreads', name: 'Spinach & Walnut Pkhali', word: 'Spinach',
    short: 'Bright, green and garlicky. The one to start with.',
    size: '8 oz (227 g) jar', price: 1200, color: '#7E9460', bg: '#E3EAD3',
    ingredients: '[INGREDIENT LIST FROM PRODUCER]',
    allergens: 'Contains walnuts',
    storage: 'Keep refrigerated [CONFIRM]',
    shelfLife: '[CONFIRMED SHELF LIFE]',
    pair: ['rye', 'eggplant'],
  },
  {
    id: 'eggplant', cat: 'spreads', name: 'Eggplant & Walnut Pkhali', word: 'Eggplant',
    short: 'Roasted, smoky and rich. Made for a thick slice of rye.',
    size: '8 oz (227 g) jar', price: 1200, color: '#6B4660', bg: '#E6D9E1',
    ingredients: '[INGREDIENT LIST FROM PRODUCER]',
    allergens: 'Contains walnuts',
    storage: 'Keep refrigerated [CONFIRM]',
    shelfLife: '[CONFIRMED SHELF LIFE]',
    pair: ['rye', 'greenbean'],
  },
  {
    id: 'greenbean', cat: 'spreads', name: 'Green Bean & Walnut Pkhali', word: 'Green Bean',
    short: 'Fresh and herby with a soft crunch.',
    size: '8 oz (227 g) jar', price: 1200, color: '#A9B97F', bg: '#EEF1DF',
    ingredients: '[INGREDIENT LIST FROM PRODUCER]',
    allergens: 'Contains walnuts',
    storage: 'Keep refrigerated [CONFIRM]',
    shelfLife: '[CONFIRMED SHELF LIFE]',
    pair: ['rye', 'spinach'],
  },
  {
    id: 'box', cat: 'sets', name: 'The Perfect Schmear Box', word: 'The Box',
    short: 'One organic dark rye loaf plus all three pkhali spreads.',
    size: '1 loaf + 3 jars', price: 4800, color: '#D44D3E', bg: '#F3D2CB',
    ingredients: '[INGREDIENT LIST FROM PRODUCER]',
    allergens: 'Contains walnuts, rye (gluten)',
    storage: 'Spreads: keep refrigerated [CONFIRM]',
    shelfLife: '[CONFIRMED SHELF LIFE]',
    pair: ['spinach', 'rye'],
  },
];

// Site-wide facts still to be confirmed by the owner.
export const SITE = {
  kosherAgency: '[CERTIFYING AGENCY]',
  maxQtyPerItem: 20,
};

export const byId = id => PRODUCTS.find(p => p.id === id);
