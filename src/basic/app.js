import { renderCart } from "./components/cart";
import { createAppContainer, createMainContainer, createTitle } from "./components/common";
import { renderProductList } from "./components/product";
import { handleAddToCart, handleCartItemEvents } from "./utils/cart/handlers";
import { initializeFlashSale, initializeRecommendation } from "./utils/product";

/**
 * 앱 초기화 함수
 * @param {HTMLElement} rootElement - 루트 엘리먼트
 */
export const initializeApp = (rootElement) => {
  // 앱 구조 설정
  const appContainer = createAppContainer();
  const mainContainer = createMainContainer();
  const title = createTitle("장바구니");

  // 장바구니 컴포넌트
  const cartItemsContainer = document.createElement("div");
  cartItemsContainer.id = "cart-items";

  // 총액 표시 컴포넌트
  const cartTotalElement = document.createElement("div");
  cartTotalElement.id = "cart-total";
  cartTotalElement.className = "text-xl font-bold my-4";

  // 상품 선택 컴포넌트
  const productSelect = document.createElement("select");
  productSelect.id = "product-select";
  productSelect.className = "border rounded p-2 mr-2";

  // 추가 버튼
  const addButton = document.createElement("button");
  addButton.id = "add-to-cart";
  addButton.className = "bg-blue-500 text-white px-4 py-2 rounded";
  addButton.textContent = "추가";

  // 재고 상태 컴포넌트
  const stockStatusElement = document.createElement("div");
  stockStatusElement.id = "stock-status";
  stockStatusElement.className = "text-sm text-gray-500 mt-2";

  mainContainer.appendChild(title);
  mainContainer.appendChild(cartItemsContainer);
  mainContainer.appendChild(cartTotalElement);
  mainContainer.appendChild(productSelect);
  mainContainer.appendChild(addButton);
  mainContainer.appendChild(stockStatusElement);
  appContainer.appendChild(mainContainer);
  rootElement.appendChild(appContainer);

  // 초기 렌더링
  renderProductList(productSelect);
  renderCart();

  // 이벤트 핸들러 설정
  addButton.addEventListener("click", handleAddToCart(productSelect));
  cartItemsContainer.addEventListener("click", handleCartItemEvents);

  // 특별 기능 초기화
  initializeFlashSale();
  initializeRecommendation();
};
