import CartItem from "../components/CartItem.js";
import CartTotal from "../components/CartTotal.js";
import ProductSelect from "../components/ProductSelect.js";
import StockInfo from "../components/StockInfo.js";

/**
 * 특정 요소의 내용을 새 HTML로 대체
 * @param {Element} element - 대상 DOM 요소
 * @param {string} html - 새 HTML 문자열
 */
export const render = (element, html) => {
  element.innerHTML = html;
};

/**
 * 장바구니 아이템 렌더링
 * @param {Element} element - 장바구니 컨테이너 요소
 * @param {Object} product - 상품 정보
 * @param {number} quantity - 수량
 * @param {boolean} isNew - 새 아이템 여부
 */
export const renderCartItem = (element, product, quantity, isNew = false) => {
  const cartItemHtml = CartItem(product, quantity);

  if (isNew) {
    // 새 아이템인 경우 컨테이너에 추가
    const tempWrapperEl = document.createElement("div");
    tempWrapperEl.innerHTML = cartItemHtml;
    const newCartItemEl = tempWrapperEl.firstElementChild;
    element.appendChild(newCartItemEl);
  } else {
    // 기존 아이템인 경우 내용 업데이트
    const existingCartItemEl = document.getElementById(product.id);
    if (existingCartItemEl) {
      existingCartItemEl.querySelector("span").textContent = `${product.name} - ${product.price}원 x ${quantity}`;
    }
  }
};

/**
 * 장바구니 아이템 제거
 * @param {string} productId - 제거할 상품 ID
 */
export const removeCartItem = (productId) => {
  const cartItemEl = document.getElementById(productId);
  if (cartItemEl) cartItemEl.remove();
};

/**
 * 장바구니 총액 정보 렌더링
 * @param {Element} element - 총액 표시 요소
 * @param {number} totalAmount - 총 금액
 * @param {number} discountRate - 할인율
 * @param {number} bonusPoints - 보너스 포인트
 */
export const renderCartTotal = (element, totalAmount, discountRate, bonusPoints) => {
  render(element, CartTotal(totalAmount, discountRate, bonusPoints));
};

/**
 * 상품 선택기 렌더링
 * @param {Element} element - 상품 선택기 요소
 * @param {Array} products - 상품 목록
 */
export const renderProductSelect = (element, products) => {
  render(element, ProductSelect(products));
};

/**
 * 재고 정보 렌더링
 * @param {Element} element - 재고 정보 요소
 * @param {Array} products - 상품 목록
 * @param {number} threshold - 재고 부족 기준값 (기본값: 5)
 */
export const renderStockInfo = (element, products, threshold = 5) => {
  render(element, StockInfo(products, threshold));
};
