export const CONSTANTS = {
  FLASH_SALE: {
    DISCOUNT_RATE: 0.8, // 20% 할인
    CHANCE: 0.3, // 30% 확률
    INTERVAL: 30000, // 30초마다 체크
    MAX_DELAY: 10000, // 최대 10초 지연
  },
  FRIDAY_SALE: {
    DISCOUNT_RATE: 0.9,
  },
  SUGGESTION: {
    DISCOUNT_RATE: 0.95, // 5% 할인
    INTERVAL: 60000, // 60초마다 체크
    MAX_DELAY: 20000, // 최대 20초 지연
  },
  DISCOUNT_TABLE: {
    p1: 0.1,
    p2: 0.15,
    p3: 0.2,
    p4: 0.05,
    p5: 0.25,
  },
  CART: {
    ITEM_DISCOUNT_THRESHOLD: 10,
    BULK_DISCOUNT_ITEM_COUNT: 30,
    BULK_DISCOUNT_RATE: 0.25,
  },
  POINTS: {
    EARNING_UNIT: 1000, // 1000원당 1포인트 적립
  },
  INVENTORY: {
    LOW_STOCK_THRESHOLD: 5, // 5개 미만이면 재고 부족으로 판단
  },
};
