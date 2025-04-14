// 할인율
const ID_DISCOUNT_RATES = {
  // 각 상품별 할인율
  p1: 0.1,
  p2: 0.15,
  p3: 0.2,
  p4: 0.05,
  p5: 0.25,
};
const BUNGAE_SALE_DISCOUNT_RATE = 0.8; // 번개세일 할인 적용 시 가격 비율
const SUGGEST_ITEM_DISCOUNT_RATE = 0.95; // 추천 상품 할인 적용 시 가격 비율

const BULK_DISCOUNT_RATE = 0.25; // 대량 구매 할인율
const WEEKLY_DISCOUNT_DAY = 2; // 화요일
const WEEKLY_DISCOUNT_RATE = 0.1; // 요일 할인율

// 수량
const QUANTITY_DISCOUNT_LIMIT = 10; // 할인 적용 수량
const BULK_DISCOUNT_LIMIT = 30; // 대량 구매 할인 적용 수량
const STOCK_WARNING_LIMIT = 5; // 재고 부족 경고 수량

// 포인트
const POINT_RATE = 1000; // 포인트 적립 비율 (1000원당 1포인트)

// 시간
const BUNGAE_SALE_INTERVAL = 30000; // 번개세일 알림 주기 (30초)
const BUNGAE_SALE_DELAY = 10000; // 번개세일 초기 알림 지연 시간 (10초)
const SUGGEST_SALE_INTERVAL = 60000; // 추천 상품 알림 주기 (1분)
const SUGGEST_SALE_DELAY = 20000; // 추천 상품 알림 초기 지연 시간 (20초)

// 메시지

const OUT_OF_STOCK_MESSAGE = '재고가 부족합니다.';

export const CONSTNANTS = {
  ID_DISCOUNT_RATES,
  BUNGAE_SALE_DISCOUNT_RATE,
  SUGGEST_ITEM_DISCOUNT_RATE,
  BULK_DISCOUNT_RATE,
  WEEKLY_DISCOUNT_DAY,
  WEEKLY_DISCOUNT_RATE,
  QUANTITY_DISCOUNT_LIMIT,
  BULK_DISCOUNT_LIMIT,
  STOCK_WARNING_LIMIT,
  POINT_RATE,
  BUNGAE_SALE_INTERVAL,
  BUNGAE_SALE_DELAY,
  SUGGEST_SALE_INTERVAL,
  SUGGEST_SALE_DELAY,
  OUT_OF_STOCK_MESSAGE,
};
