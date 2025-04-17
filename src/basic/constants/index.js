const SALE_CONFIG = {
  FLASH_SALE: {
    INTERVAL: 30000,
    CHANCE: 0.3,
    DISCOUNT: 0.2,
  },
  RECOMMENDATION_SALE: {
    INTERVAL: 60000,
    DISCOUNT: 0.05,
  },
};

// 상품 상수
const PRODUCT_CONFIG = {
  DISCOUNT_RATE: {
    p1: 0.1,
    p2: 0.15,
    p3: 0.2,
    p4: 0.05,
    p5: 0.25,
  },
};

const initialProducts = [
  { id: 'p1', name: '상품1', price: 10000, stock: 50 },
  { id: 'p2', name: '상품2', price: 20000, stock: 30 },
  { id: 'p3', name: '상품3', price: 30000, stock: 20 },
  { id: 'p4', name: '상품4', price: 15000, stock: 0 },
  { id: 'p5', name: '상품5', price: 25000, stock: 10 },
];

export { SALE_CONFIG, PRODUCT_CONFIG, initialProducts };
