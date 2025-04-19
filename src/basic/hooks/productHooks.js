import { getStore, updateStore } from "../store/store.js";
import { addToCart } from "../services/cartService.js";
import { renderUI } from "./cartHooks.js";
import { initFlashSaleTimer, initSuggestionTimer } from "../services/timerService.js";

/**
 * 상품 선택 이벤트 설정
 */
export const setupProductEvents = () => {
  const addButton = document.getElementById("add-to-cart");
  if (!addButton) return;

  // 상품 추가 버튼 클릭 이벤트
  addButton.addEventListener("click", () => {
    const selectElement = document.getElementById("product-select");
    if (!selectElement) return;

    const selectedId = selectElement.value;
    const state = getStore();

    // 상품을 장바구니에 추가
    const updatedState = addToCart(state, selectedId);

    // 상태가 변경되었으면 UI 업데이트
    if (updatedState !== state) {
      updateStore(updatedState);
      renderUI(updatedState);
    }
  });

  // 타이머 초기화
  initTimers();
};

/**
 * 타이머 초기화 함수
 */
const initTimers = () => {
  initFlashSaleTimer();
  initSuggestionTimer();
};
