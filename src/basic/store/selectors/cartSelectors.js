/**
 * 장바구니 아이템 목록 조회 셀렉터
 * @param {Object} state - 스토어 상태
 * @returns {Array} 장바구니 아이템 목록
 */
export const getCartItems = (state) => state.cartItems;

/**
 * 보너스 포인트 조회 셀렉터
 * @param {Object} state - 스토어 상태
 * @returns {number} 적립 포인트
 */
export const getBonusPoints = (state) => state.bonusPoints;

/**
 * 마지막 선택 상품 ID 조회 셀렉터
 * @param {Object} state - 스토어 상태
 * @returns {string|null} 마지막 선택 상품 ID
 */
export const getLastSelectedProduct = (state) => state.lastSelectedProduct;
