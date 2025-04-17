import { INITIALIZE_PRODUCTS, UPDATE_PRODUCT_STOCK } from "./types.js";
import { INITIAL_PRODUCTS } from "../../constant/index.js";

/**
 * 상품 데이터 초기화 액션 생성자
 * @returns {Object} 액션 객체
 */
export const initializeProducts = () => ({
  type: INITIALIZE_PRODUCTS,
  payload: INITIAL_PRODUCTS
});

/**
 * 상품 재고 업데이트 액션 생성자
 * @param {string} productId - 상품 ID
 * @param {number} changeAmount - 변경할 수량 (양수: 감소, 음수: 증가)
 * @returns {Object} 액션 객체
 */
export const updateProductStock = (productId, changeAmount) => ({
  type: UPDATE_PRODUCT_STOCK,
  payload: {
    productId,
    changeAmount
  }
});
