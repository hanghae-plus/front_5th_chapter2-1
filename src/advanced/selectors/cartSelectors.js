// src/selectors/cartSelectors.js
/**
 * 장바구니 아이템 목록 조회 셀렉터
 * @param {Object} state - 스토어 상태
 * @returns {Array} 장바구니 아이템 목록
 */
export const getCartItems = (state) => state.cartItems;

/**
 * 장바구니 아이템 개수 조회 셀렉터
 * @param {Object} state - 스토어 상태
 * @returns {number} 장바구니 아이템 개수
 */
export const getCartItemCount = (state) => state.itemCount;

/**
 * 장바구니 총액 조회 셀렉터
 * @param {Object} state - 스토어 상태
 * @returns {number} 장바구니 총액
 */
export const getCartTotal = (state) => state.totalAmount;

/**
 * 장바구니 할인율 조회 셀렉터
 * @param {Object} state - 스토어 상태
 * @returns {number} 장바구니 할인율 (0-1 사이의 값)
 */
export const getDiscountRate = (state) => state.discountRate;

/**
 * 보너스 포인트 조회 셀렉터
 * @param {Object} state - 스토어 상태
 * @returns {number} 적립 포인트
 */
export const getBonusPoints = (state) => state.bonusPoints;

/**
 * 장바구니 내 특정 상품 조회 셀렉터
 * @param {Object} state - 스토어 상태
 * @param {string} productId - 상품 ID
 * @returns {Object|null} 장바구니 내 해당 상품 또는 null
 */
export const getCartItemById = (state, productId) =>
  state.cartItems.find((item) => item.productId === productId) || null;
