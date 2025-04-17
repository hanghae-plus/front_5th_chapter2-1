import {
  INITIALIZE_PRODUCTS,
  START_FLASH_SALE,
  START_PRODUCT_RECOMMENDATION,
  UPDATE_PRODUCT_PRICE,
  UPDATE_PRODUCT_STOCK
} from "./types.js";

/**
 * 상품 데이터 초기화 액션 생성자
 * @returns {Object} 액션 객체
 */
export const initializeProducts = () => ({
  type: INITIALIZE_PRODUCTS
});

/**
 * 상품 재고 업데이트 액션 생성자
 * @param {string} productId - 상품 ID
 * @param {number} changeAmount - 변경할 수량 (양수: 감소, 음수: 증가)
 * @returns {Object} 액션 객체
 */
export const updateProductStock = (productId, changeAmount) => ({
  type: UPDATE_PRODUCT_STOCK,
  payload: { productId, changeAmount }
});

/**
 * 상품 가격 업데이트 액션 생성자
 * @param {string} productId - 상품 ID
 * @param {number} newPrice - 새 가격
 * @returns {Object} 액션 객체
 */
export const updateProductPrice = (productId, newPrice) => ({
  type: UPDATE_PRODUCT_PRICE,
  payload: { productId, newPrice }
});

/**
 * 번개세일 시작 액션 생성자
 * @returns {Object} 액션 객체
 */
export const startFlashSale = () => ({
  type: START_FLASH_SALE
});

/**
 * 추천 상품 알림 시작 액션 생성자
 * @returns {Object} 액션 객체
 */
export const startProductRecommendation = () => ({
  type: START_PRODUCT_RECOMMENDATION
});
