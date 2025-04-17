import { ADD_TO_CART, UPDATE_CART_ITEM, REMOVE_FROM_CART, SET_LAST_SELECTED, UPDATE_CART_TOTALS } from "./types.js";

/**
 * 장바구니에 상품 추가 액션 생성자
 * @param {Object} product - 추가할 상품 객체
 * @param {number} quantity - 추가할 수량
 * @returns {Object} 액션 객체
 */
export const addToCart = (product, quantity = 1) => ({
  type: ADD_TO_CART,
  payload: { product, quantity }
});

/**
 * 장바구니 아이템 수량 업데이트 액션 생성자
 * @param {string} productId - 상품 ID
 * @param {number} quantity - 새 수량
 * @returns {Object} 액션 객체
 */
export const updateCartItem = (productId, quantity) => ({
  type: UPDATE_CART_ITEM,
  payload: { productId, quantity }
});

/**
 * 장바구니에서 상품 제거 액션 생성자
 * @param {string} productId - 상품 ID
 * @returns {Object} 액션 객체
 */
export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: { productId }
});

/**
 * 마지막 선택 상품 설정 액션 생성자
 * @param {string} productId - 상품 ID
 * @returns {Object} 액션 객체
 */
export const setLastSelected = (productId) => ({
  type: SET_LAST_SELECTED,
  payload: { productId }
});

/**
 * 장바구니 총액 업데이트 액션 생성자
 * @returns {Object} 액션 객체
 */
export const updateCartTotals = () => ({
  type: UPDATE_CART_TOTALS
});
