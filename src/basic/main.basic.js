import { createElement } from './utils/index.js';
import { updateProductOptions } from './components/index.js';
import { calculateCartSummary } from './cart/index.js';
import { randomSale, suggestProduct } from './promotion/index.js';
import { products } from './data/products.js';
import { handleAddToCart, handleCartItemClick } from './cart/index.js';
import { TITLE_TEXT, ADD_BUTTON_TEXT } from './constants/index.js';

let select, addButton, cartItemsContainer, total, stockInfo, lastSelectedItem;

const bindEvents = () => {
  // 장바구니 상품 클릭 이벤트 처리
  const setLastSelectedItem = value => {
    lastSelectedItem = value;
  };

  // 장바구니 추가 버튼 클릭 이벤트 처리
  addButton.addEventListener('click', () => {
    handleAddToCart(
      select,
      cartItemsContainer,
      total,
      stockInfo,
      setLastSelectedItem,
      products
    );
  });

  // 장바구니 상품 클릭 이벤트 처리
  cartItemsContainer.addEventListener('click', event => {
    handleCartItemClick(event, cartItemsContainer, total, stockInfo, products);
  });
};

const initializeLayout = () => {
  const root = document.querySelector('#app');

  if (!root) {
    console.error('루트 엘리먼트가 없습니다.');
    return;
  }

  // 가독성을 위해 innerHtml로 변경
  root.innerHTML = `
    <div class="bg-gray-100 p-8">
      <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 class="text-2xl font-bold mb-4">${TITLE_TEXT}</h1>

        <div id="cart-items"></div>

        <div id="cart-total" class="text-xl font-bold my-4"></div>

          <select id="product-select" class="border rounded p-2 flex-1"></select>
          <button
            id="add-to-cart"
            class="bg-blue-500 text-white px-4 py-2 rounded"
          >
            ${ADD_BUTTON_TEXT}
          </button>

        <div id="stock-status" class="text-sm text-gray-500 mt-2"></div>
      </div>
    </div>
  `;

  // DOM 요소 참조 다시 저장
  cartItemsContainer = document.querySelector('#cart-items');
  total = document.querySelector('#cart-total');
  select = document.querySelector('#product-select');
  addButton = document.querySelector('#add-to-cart');
  stockInfo = document.querySelector('#stock-status');
};

const main = () => {
  // DOM 초기화
  initializeLayout();

  // 장바구니 상품 목록 초기화
  updateProductOptions(select, products);

  calculateCartSummary(total, cartItemsContainer.children, products, stockInfo);

  // 번개세일
  randomSale(lastSelectedItem, products);

  // 재고 업데이트
  suggestProduct(lastSelectedItem, products);

  // 이벤트 바인딩
  bindEvents();
};

main();
