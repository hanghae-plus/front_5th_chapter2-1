// 상품별 할인율 (id: 할인율)
export const DISCOUNT_RATES = {
  p1: 0.1,    // 상품1 10% 할인
  p2: 0.15,   // 상품2 15% 할인
  p3: 0.2,    // 상품3 20% 할인
  p4: 0.05,   // 상품4 5% 할인
  p5: 0.25,   // 상품5 25% 할인
};

// 할인 관련 상수
export const BULK_DISCOUNT_RATE = 0.25;         // 대량 구매 할인율
export const BULK_QUANTITY_THRESHOLD = 30;      // 대량 구매 기준 수량
export const TUESDAY_DISCOUNT_RATE = 0.1;       // 화요일 할인율
export const FLASH_SALE_DISCOUNT_RATE = 0.2;    // 번개세일 할인율
export const RECOMMENDED_DISCOUNT_RATE = 0.05;  // 추천상품 할인율

// 포인트 관련 상수
export const POINT_PER_1000_WON = 0.001;        // 포인트 적립 비율 (1000원당 1점)

// 프로모션 관련 상수
export const FLASH_SALE_INTERVAL = 30000;           // 번개세일 간격 (30초)
export const RECOMMENDED_PRODUCT_INTERVAL = 60000;  // 추천 상품 표시 간격 (60초)