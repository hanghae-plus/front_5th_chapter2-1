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

export { SALE_CONFIG, PRODUCT_CONFIG };
