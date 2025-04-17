import { DiscountPolicies } from '../types/discount';

export const DISCOUNT_POLICIES: DiscountPolicies = {
  PRODUCT: {
    RATES: {
      p1: 0.1,
      p2: 0.15,
      p3: 0.2,
      p4: 0.05,
      p5: 0.25,
    },
    MIN_QUANTITY: 10,
  },
  CART: {
    BULK_THRESHOLD: 30,
    BULK_RATE: 0.25,
  },
  TUESDAY: {
    RATE: 0.1,
  },
};
