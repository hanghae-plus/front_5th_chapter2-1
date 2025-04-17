/**
 * DOM 참조 관리 모듈
 * 애플리케이션에서 사용되는 DOM 요소 참조를 중앙에서 관리
 */
const DOMManager = (() => {
  // DOM 요소 참조를 저장할 객체
  const refs = {};

  /**
   * DOM 요소 참조 초기화
   * @returns {Object} 초기화된 DOM 참조 객체
   */
  const initialize = () => {
    refs.productSelectEl = document.getElementById("product-select");
    refs.addToCartButtonEl = document.getElementById("add-to-cart");
    refs.cartItemsEl = document.getElementById("cart-items");
    refs.cartTotalEl = document.getElementById("cart-total");
    refs.stockStatusEl = document.getElementById("stock-status");

    return refs;
  };

  /**
   * 특정 DOM 요소 참조 가져오기
   * @param {string} refName - 요소 참조 이름
   * @returns {Element} DOM 요소
   */
  const get = (refName) => {
    if (!refs[refName]) {
      refs[refName] = document.getElementById(refName);
    }
    return refs[refName];
  };

  /**
   * 모든 DOM 참조 가져오기
   * @returns {Object} 모든 DOM 참조
   */
  const getAll = () => {
    return { ...refs };
  };

  /**
   * 특정 DOM 참조 설정
   * @param {string} refName - 요소 참조 이름
   * @param {Element} element - DOM 요소
   */
  const set = (refName, element) => {
    refs[refName] = element;
  };

  return {
    initialize,
    get,
    getAll,
    set
  };
})();

export default DOMManager;
