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
export const getProductById = (state, productId) => state.products.find((product) => product.id === productId) || null;

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

/**
 * 재고 부족 상품 목록 조회 셀렉터
 * @param {Object} state - 스토어 상태
 * @param {number} threshold - 재고 부족 기준값 (기본값: 5)
 * @returns {Array} 재고 부족 상품 목록
 */
export const getLowStockProducts = (state, threshold = 5) => state.products.filter((item) => item.quantity < threshold);

/**
 * 무작위 상품 선택 셀렉터
 * @param {Object} state - 스토어 상태
 * @returns {Object|null} 무작위 상품 또는 null
 */
export const getRandomProduct = (state) => {
  const products = state.products;
  if (products.length === 0) return null;

  return products[Math.floor(Math.random() * products.length)];
};

/**
 * 추천 상품 선택 셀렉터
 * @param {Object} state - 스토어 상태
 * @returns {Object|null} 추천 상품 또는 null
 */
export const getRecommendedProduct = (state) => {
  const lastSelectedId = state.lastSelectedProduct;
  if (!lastSelectedId) return null;

  return state.products.find((item) => item.id !== lastSelectedId && item.quantity > 0);
};
