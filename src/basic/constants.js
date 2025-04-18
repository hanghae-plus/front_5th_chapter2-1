const PRODUCTS = [
  { id: 'p1', name: '상품1', price: 10000, quantity: 50 },
  { id: 'p2', name: '상품2', price: 20000, quantity: 30 },
  { id: 'p3', name: '상품3', price: 30000, quantity: 20 },
  { id: 'p4', name: '상품4', price: 15000, quantity: 0 },
  { id: 'p5', name: '상품5', price: 25000, quantity: 10 },
];

const QUANTITY_DISCOUNT_RATE = {
  p1: 0.1,
  p2: 0.15,
  p3: 0.2,
  p4: 0.05,
  p5: 0.25,
};

const BULK_DISCOUNT_RATE = 0.25;
const TUESDAY_DISCOUNT_RATE = 0.1;
const POINTS_RATIO = 1000;
const FLASH_SALE_DISCOUNT_RATE = 0.8;
const RECOMMEND_DISCOUNT_RATE = 0.95;

const BULK_DISCOUNT_THRESHOLD = 30;
const LOW_STOCK_THRESHOLD = 5;

const CART_ITEMS_ID = 'cart-items';
const CART_TOTAL_ID = 'cart-total';
const PRODUCT_SELECT_ID = 'product-select';
const ADD_TO_CART_ID = 'add-to-cart';
const STOCK_STATUS_ID = 'stock-status';
const LOYALTY_POINTS_ID = 'loyalty-points';

export {
  PRODUCTS,
  QUANTITY_DISCOUNT_RATE,
  TUESDAY_DISCOUNT_RATE,
  BULK_DISCOUNT_RATE,
  POINTS_RATIO,
  FLASH_SALE_DISCOUNT_RATE,
  RECOMMEND_DISCOUNT_RATE,
  BULK_DISCOUNT_THRESHOLD,
  LOW_STOCK_THRESHOLD,
  CART_ITEMS_ID,
  CART_TOTAL_ID,
  PRODUCT_SELECT_ID,
  ADD_TO_CART_ID,
  STOCK_STATUS_ID,
  LOYALTY_POINTS_ID,
};
