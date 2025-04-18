const DISCOUNT_RATES = {
  ITEM: {
    p1: 0.1,
    p2: 0.15,
    p3: 0.2,
    p4: 0.05,
    p5: 0.25,
  },
  SALE_DAY: 0.1,
  BULK: 0.25,
  RANDOM: 0.3,
} as const;

const DAYS = {
  SUN: 0,
  MON: 1,
  TUE: 2,
  WED: 3,
  THU: 4,
  FRI: 5,
  SAT: 6,
} as const;
const SALE_DAY = DAYS['TUE'];

const LIMIT = {
  QUANTITY_DISCOUNT: 10,
  BULK_DISCOUNT: 30,
  STOCK_WARNING: 5,
} as const;

const POINTS_RATE = 1000;

const BUNGAE_SALE = {
  INTERVAL: 30000,
  DELAY: 10000,
  RATE: 0.8,
} as const;

const SUGGEST_SALE = {
  INTERVAL: 60000,
  DELAY: 20000,
  RATE: 0.95,
} as const;

export {
  DISCOUNT_RATES,
  SALE_DAY,
  LIMIT,
  BUNGAE_SALE,
  SUGGEST_SALE,
  POINTS_RATE,
};
