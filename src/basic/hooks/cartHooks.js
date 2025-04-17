import { getStore, updateStore } from "../store/store.js";
import { changeCartItemQuantity, removeCartItem } from "../services/cartService.js";
import { renderStockInfo } from "../renderers/stockRenderer.js";
import { renderProductOptions } from "../renderers/productRenderer.js";
import { renderCartItems } from "../renderers/cartRenderer.js";

/**
 * 장바구니 이벤트 핸들러 설정
 */
export const setupCartEvents = () => {
  const cartElement = document.getElementById("cart-items");
  if (!cartElement) return;

  // 이벤트 위임으로 장바구니 아이템 관련 이벤트 처리
  cartElement.addEventListener("click", (event) => {
    const target = event.target;
    const cartItem = target.closest("[data-product-id]");

    if (!cartItem) return;

    const productId = cartItem.dataset.productId;
    const state = getStore();
    let updatedState = state;

    // 수량 감소 버튼
    if (target.classList.contains("cart-decrease")) {
      updatedState = changeCartItemQuantity(state, productId, -1);
    }
    // 수량 증가 버튼
    else if (target.classList.contains("cart-increase")) {
      updatedState = changeCartItemQuantity(state, productId, 1);
    }
    // 제거 버튼
    else if (target.classList.contains("cart-remove")) {
      updatedState = removeCartItem(state, productId);
    }

    // 상태가 변경되었으면 모든 관련 UI 업데이트
    if (updatedState !== state) {
      updateStore(updatedState);
      renderUI(updatedState);
    }
  });
};

/**
 * 모든 UI 업데이트 함수
 * @param {Object} state 현재 상태
 */
export const renderUI = (state) => {
  renderCartItems(state);
  renderCartTotal(state);
  renderStockInfo(state);
  renderProductOptions(state.products);
};
