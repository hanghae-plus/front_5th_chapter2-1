// services/timerService.js
import { getStore, updateStore } from "../store/store.js";
import { applyFlashSale, applySuggestionDiscount } from "./productService.js";
import { TIMER_CONSTANTS } from "../constants/timer.js";

/**
 * 번개세일 타이머 초기화
 */
export const initFlashSaleTimer = () => {
  const { FLASH_SALE } = TIMER_CONSTANTS;
  const initialDelay = Math.random() * FLASH_SALE.INITIAL_DELAY_MAX;

  setTimeout(() => {
    setInterval(() => {
      const state = getStore();
      const updatedState = applyFlashSale(state);

      if (updatedState) {
        updateStore(updatedState);
        const flashProduct = state.products.find((p) => p.id === updatedState.flashSaleProduct);

        if (flashProduct) {
          alert(`번개세일! ${flashProduct.name}이(가) 20% 할인 중입니다!`);
        }
      }
    }, FLASH_SALE.INTERVAL);
  }, initialDelay);
};

/**
 * 추천 상품 타이머 초기화
 */
export const initSuggestionTimer = () => {
  const { SUGGESTION } = TIMER_CONSTANTS;
  const initialDelay = Math.random() * SUGGESTION.INITIAL_DELAY_MAX;

  setTimeout(() => {
    setInterval(() => {
      const state = getStore();
      const updatedState = applySuggestionDiscount(state);

      if (updatedState) {
        updateStore(updatedState);
        const suggestedProduct = state.products.find((p) => p.id === updatedState.suggestedProduct);

        if (suggestedProduct) {
          alert(`${suggestedProduct.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
        }
      }
    }, SUGGESTION.INTERVAL);
  }, initialDelay);
};

/**
 * 모든 타이머 초기화
 */
export const initAllTimers = () => {
  initFlashSaleTimer();
  initSuggestionTimer();
};
