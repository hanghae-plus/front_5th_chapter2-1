// 프로모션 관련 비즈니스 로직 처리
import {
  FLASH_SALE_DISCOUNT_RATE,
  FLASH_SALE_INTERVAL,
  RECOMMENDED_DISCOUNT_RATE,
  RECOMMENDED_PRODUCT_INTERVAL
} from '../data/constants.js';

// 이벤트 처리를 위한 맵
const eventListeners = {
  flashSale: [],
  recommendedProduct: []
};

// 타이머 ID 저장 변수들
let flashSaleTimerId = null;
let recommendedProductTimerId = null;

/*
* ============== 공통 사용 ==============
*/

/*
* 이벤트 구독 메서드
* */
export function on(eventName, listener) {
  if (!eventListeners[eventName]) {
    eventListeners[eventName] = [];
  }
  eventListeners[eventName].push(listener);
}

/*
* 이벤트 구독 해제 메서드
* */
export function off(eventName, listener) {
  if (!eventListeners[eventName]) return;

  eventListeners[eventName] = eventListeners[eventName].filter(
    existingListener => existingListener !== listener
  );
}

/*
* 이벤트 발행 메서드
* */
export function emit(eventName, data) {
  if (!eventListeners[eventName]) return;

  eventListeners[eventName].forEach(listener => {
    listener(data);
  });
}

/*
* ============== 번개 세일 ==============
* */

/*
* 번개세일 타이머 시작 메서드
* */
export function startFlashSaleTimer(products) {
  // 초기 지연 시간(0~10초)
  const initDelay = Math.random() * 10000;

  // 타이머 시작
  setTimeout(() => {
    flashSaleTimerId = setInterval(() => {
      executeFlashSale(products);
    }, FLASH_SALE_INTERVAL);
  }, initDelay);
}

/*
* 번개세일 실행
* */
function executeFlashSale(products) {
  // 무작위 상품 선택
  const randomIndex = Math.floor(Math.random() * products.length);
  const luckyItem = products[randomIndex];

  // 30% 확률로 할인 진행(재고 O)
  if (Math.random() < 0.3 && luckyItem.stock > 0) {
    // 할인 적용
    luckyItem.price = Math.round(luckyItem.price * (1 - FLASH_SALE_DISCOUNT_RATE));

    // 이벤트 발행
    emit('flashSale', {
      product: luckyItem,
      discountRate: FLASH_SALE_DISCOUNT_RATE
    });
  }
}

/*
* ============== 추천 상품 ==============
* */

/*
* 추천 상품 타이머 시작
* */
export function startRecommendedProductTimer(products, lastSelectedProductRef) {
  // 초기 지연 (0~20초)
  const initDelay = Math.random() * 20000;

  // 타이머 시작
  setTimeout(() => {
    recommendedProductTimerId = setInterval(() => {
      const lastSelectedProduct = lastSelectedProductRef.current;
      if (lastSelectedProduct) {
        executeRecommendedProduct(products, lastSelectedProduct);
      }
    }, RECOMMENDED_PRODUCT_INTERVAL);
  }, initDelay);
}

/*
* 추천 상품 실행
* */
function executeRecommendedProduct(products, lastSelectedProduct) {
  // 마지막으로 선택한 상품과 다른 상품 중 재고 O 인 상품 찾기
  const possibleProduct = products.filter(
    item => item.id !== lastSelectedProduct && item.stock > 0
  );

  const suggest = possibleProduct.length > 0
    ? possibleProduct[Math.floor(Math.random() * possibleProduct.length)]
    : null;

  if (suggest) {
    suggest.price = Math.round(suggest.price * (1 - RECOMMENDED_DISCOUNT_RATE));

    // 이벤트 발행
    emit('recommendedProduct', {
      product: suggest,
      discountRate: RECOMMENDED_DISCOUNT_RATE
    });
  }
}

/*
* 프로모션 정리 메서드
* */
export function cleanup() {
  // 타이머 정리
  if (flashSaleTimerId) {
    clearInterval(flashSaleTimerId);
    flashSaleTimerId = null;
  }

  if (recommendedProductTimerId) {
    clearInterval(recommendedProductTimerId);
    recommendedProductTimerId = null;
  }

  // 이벤트 리스너 정리
  Object.keys(eventListeners).forEach(eventName => {
    eventListeners[eventName] = [];
  });
}

/*
* 프로모션 서비스 초기화 함수
* */
export function initPromotionService(products, lastSelectedProductRef) {
  // 번개 세일 타이머 시작
  startFlashSaleTimer(products);

  // 추천 상품 타이머 시작
  startRecommendedProductTimer(products, lastSelectedProductRef);

  // 정리 함수 반환
  return cleanup;
}