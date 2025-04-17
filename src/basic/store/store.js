import { INITIAL_PRODUCTS } from "../constants/products.js";
import { renderCartItems, renderCartTotal } from "../renderers/cartRenderer.js";
import { renderProductOptions } from "../renderers/productRenderer.js";
import { renderStockInfo } from "../renderers/stockRenderer.js";

// 초기 상태
let store = {
  products: INITIAL_PRODUCTS,
  cartItems: {},
  lastSelected: null,
  flashSaleProduct: null,
  suggestedProduct: null,
  bonusPoints: 0,
  totalAmount: 0,
  itemCount: 0
};

/**
 * 스토어 상태 getter
 * @returns {Object} 현재 상태의 복사본
 */
export const getStore = () => {
  return { ...store };
};

/**
 * 스토어 상태 updater
 * @param {Object} newState 업데이트할 상태
 */
export const updateStore = (newState) => {
  store = {
    ...store,
    ...newState
  };

  // 상태 변경 시 UI 업데이트
  renderUI();
};

/**
 * UI 업데이트 함수
 * 상태가 변경될 때마다 모든 UI 컴포넌트 업데이트
 */
export const renderUI = () => {
  const state = getStore();

  // 각 렌더러 함수 호출
  renderProductOptions(state.products);
  renderCartItems(state);
  renderCartTotal(state);
  renderStockInfo(state);
};

/**
 * 스토어 초기화
 */
export const initStore = () => {
  // 초기 상태로 UI 업데이트
  renderUI();
};
