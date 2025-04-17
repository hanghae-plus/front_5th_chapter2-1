/**
 * 모든 상품 목록 조회 셀렉터
 * @param {Object} state - 스토어 상태
 * @returns {Array} 상품 목록
 */
export const getProducts = (state) => state.products;

/**
 * ID로 상품 조회 셀렉터
 * @param {Object} state - 스토어 상태
 * @param {string} productId - 상품 ID
 * @returns {Object|null} 찾은 상품 또는 null
 */
export const getProductById = (state, productId) =>
  state.products.find(product => product.id === productId) || null;

/**
 * 상품 재고 조회 셀렉터
 * @param {Object} state - 스토어 상태
 * @param {string} productId - 상품 ID
 * @returns {number} 상품 재고
 */
export const getProductStock = (state, productId) => {
  const product = getProductById(state, productId);
  return product ? product.quantity : 0;
};