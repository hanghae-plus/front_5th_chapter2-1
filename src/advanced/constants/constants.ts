export const DISCOUNT = {
    SALE_PROBABILITY: 0.3,
    BASIC_RATE: 0.2,
    ADDITIONAL_RATE: 0.05,
    TUESDAY_RATE: 0.1,
    BULK_RATE: 0.25,   
} as const;

// 재고 관련 상수
export const STOCK = {
    LOW_THRESHOLD: 5,
  } as const;

// 상품별 할인율
export const PRODUCT_DISCOUNT_RATE = {
    p1: 0.1,
    p2: 0.15,
    p3: 0.2,
    p4: 0.05,
    p5: 0.25,
  } as const;