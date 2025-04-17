export const TIMER_NUMBER = {
  FLASH_TIME: Math.random() * 10000,
  FLASH_INTERVAL: 30000,
  SUGGEST_TIME: Math.random() * 20000,
  SUGGEST_INTERVAL: 60000,
};

export const SALE_NUMBER = {
  FLASH: 0.8,
  SUGGEST: 0.95,
};

export const RANDOM_NUMBER = Math.random() < 0.3;

export const DISCOUNT = {
  FULL_PRICE_RATIO: 1,
  ITEM_RATIO: {
    p1: 0.1,
    p2: 0.15,
    p3: 0.2,
    p4: 0.05,
    p5: 0.25,
  },
  FOR_MIN_QUANTITY: 10,
  BULK_DISCOUNT: {
    QUANTITY: 30,
    RATIO: 0.25,
  },
  TUESDAY_RATIO: 0.1,
};
