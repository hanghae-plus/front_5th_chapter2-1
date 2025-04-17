export const DISCOUNT_POLICY = {
  PRODUCT: {
    RATE: {
      p1: 0.1,
      p2: 0.15,
      p3: 0.2,
      p4: 0.05,
      p5: 0.25,
    },
    MIN_COUNT: 10,
  },
  BULK: {
    RATE: 0.25,
    MIN_COUNT: 30,
  },
  DATE_SALE: {
    DAY: 2,
    RATE: 0.1,
  },
} as const;
