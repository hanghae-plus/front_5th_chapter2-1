/**
 * 프로모션 서비스
 * 번개세일 및 추천 상품 알림 등의 프로모션 기능을 관리
 */
import store from "../store/index.js";
import { getProducts } from "../store/selectors/productSelectors.js";
import { getLastSelectedProduct } from "../store/selectors/cartSelectors.js";
import { renderProductOptions } from "../utils/renderUtils.js";
import DOMManager from "../utils/domManager.js";

/**
 * 번개세일 시작
 * 무작위 상품을 20% 할인하는 번개세일 기능을 시작
 */
export const startFlashSale = () => {
  setTimeout(() => {
    setInterval(() => {
      const state = store.getState();
      const products = getProducts(state);
      const luckyItem = products[Math.floor(Math.random() * products.length)];

      if (Math.random() < 0.3 && luckyItem.quantity > 0) {
        // 20% 할인 적용
        luckyItem.price = Math.round(luckyItem.price * 0.8);
        alert("번개세일! " + luckyItem.name + "이(가) 20% 할인 중입니다!");

        // UI 업데이트
        const { sel } = DOMManager.getAll();
        renderProductOptions(sel, products);
      }
    }, 30000); // 30초마다 실행
  }, Math.random() * 10000); // 0~10초 사이 랜덤한 시간 후 시작
};

/**
 * 추천 상품 알림 시작
 * 마지막으로 선택한 상품과 다른 상품을 추천하는 기능 시작
 */
export const startProductRecommendation = () => {
  setTimeout(() => {
    setInterval(() => {
      const state = store.getState();
      const lastSelectedId = getLastSelectedProduct(state);

      if (lastSelectedId) {
        const products = getProducts(state);
        const suggest = products.find((item) => item.id !== lastSelectedId && item.quantity > 0);

        if (suggest) {
          alert(suggest.name + "은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!");
          suggest.price = Math.round(suggest.price * 0.95);

          // UI 업데이트
          const { sel } = DOMManager.getAll();
          renderProductOptions(sel, products);
        }
      }
    }, 60000); // 60초마다 실행
  }, Math.random() * 20000); // 0~20초 사이 랜덤한 시간 후 시작
};

/**
 * 모든 프로모션 시작
 * 앱에서 사용되는 모든 프로모션 기능을 시작
 */
export const startAllPromotions = () => {
  startFlashSale();
  startProductRecommendation();
};
