// 세일 이벤트 상수
const SALE_CONFIG = {
  FLASH_SALE: {
    INTERVAL: 30000, // 30초
    CHANCE: 0.3, // 30% 확률
    DISCOUNT: 0.2, // 20% 할인
  },
  RECOMMENDATION_SALE: {
    INTERVAL: 60000, // 60초
    DISCOUNT: 0.05, // 5% 할인
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

// 최대 재고 상수 추가
const MAXIMUM_STOCKS = initialProducts.map((product) => ({
  id: product.id,
  stock: product.stock,
}));

export { SALE_CONFIG, PRODUCT_CONFIG, initialProducts, MAXIMUM_STOCKS };
