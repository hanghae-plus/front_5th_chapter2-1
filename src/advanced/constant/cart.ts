export const DISCOUNT = {
  p1: 0.1,
  p2: 0.15,
  p3: 0.2,
  p4: 0.05,
  p5: 0.25,
};

// 할인율 관련 상수
export const DISCOUNT_LUCKY_ITEM = 0.8; // 20% 할인
export const DISCOUNT_SUGGEST_ITEM = 0.95; // 5% 추가 할인
export const BULK_DISCOUNT_THRESHOLD = 30; // 30개 이상일 때 추가 할인
export const BULK_DISCOUNT_RATE = 0.25; // 대량 구매 시 25% 할인
export const EXTRA_DISCOUNT_DAY = 2; // 화요일 할인
export const EXTRA_DISCOUNT_RATE = 0.1; // 화요일 10% 할인

// 시간 관련 상수
export const LUCKY_ITEM_INTERVAL = 30000; // 30초 간격으로 번개세일
export const SUGGEST_ITEM_INTERVAL = 60000; // 60초 간격으로 추천 상품

// 재고 관련 상수
export const LOW_STOCK_THRESHOLD = 5; // 재고 5개 이하일 때 표시

// 기타 상수
export const CART_ITEM_QUANTITY_TEXT = 'x '; // 상품 수량을 표시할 때 사용할 문자열
export const CART_ITEM_ADD_ALERT = '재고가 부족합니다.'; // 재고 부족시 경고
