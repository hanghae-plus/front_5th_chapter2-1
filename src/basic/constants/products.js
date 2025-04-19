export const INITIAL_PRODUCTS = [
  { id: "p1", name: "상품1", val: 10000, q: 50 },
  { id: "p2", name: "상품2", val: 20000, q: 30 },
  { id: "p3", name: "상품3", val: 30000, q: 20 },
  { id: "p4", name: "상품4", val: 15000, q: 0 },
  { id: "p5", name: "상품5", val: 25000, q: 10 }
];

export const PRODUCT_CONSTANTS = {
  // 대량 구매 할인 기준 수량
  BULK_PURCHASE_THRESHOLD: 30,

  // 대량 구매 할인율
  BULK_DISCOUNT_RATE: 0.25,

  // 개별 상품 대량 구매 할인율 (10개 이상 구매 시)
  QUANTITY_DISCOUNT_RATES: {
    product1: 0.1, // 상품1: 10% 할인
    product2: 0.15, // 상품2: 15% 할인
    product3: 0.2, // 상품3: 20% 할인
    product4: 0.05, // 상품4: 5% 할인
    product5: 0.25 // 상품5: 25% 할인
  },

  // 개별 할인 적용 기준 수량
  QUANTITY_DISCOUNT_THRESHOLD: 10,

  // 재고 부족 표시 기준
  LOW_STOCK_THRESHOLD: 5,

  // 포인트 적립 비율 (1000원당 1포인트)
  POINT_RATE: 1000
};
