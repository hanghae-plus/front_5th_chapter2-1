// 공통 UI 컴포넌트 함수
import { html, appendChildren } from '../utils/dom.js';

/*
* 앱 컨테이너 생성 함수
* */
export function createAppContainer() {
  return html`<div class="bg-gray-100 p-8"></div>`;
}

/*
* 메인 래퍼 생성 함수
* */
export function createMainWrapper() {
  return html`<div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8"></div>`;
}

/*
* 페이지 타이틀 생성 함수
* */
export function createPageTitle(titleText = '장바구니') {
  return html`<h1 class="text-2xl font-bold mb-4">${titleText}</h1>`;
}

/*
* 장바구니 목록 컨테이너 생성 함수
* */
export function createCartContainer() {
  return html`<ul id="cart-items"></ul>`;
}

/*
* 총액 표시 컨테이너 생성 함수
* */
export function createTotalDisplay() {
  return html`<div id="cart-total" class="text-xl font-bold my-4"></div>`;
}

/*
* 상품 선택 드롭다운 생성 함수
* */
export function createProductSelect() {
  return html`<select id="product-select" class="border rounded p-2 mr-2"></select>`;
}

/*
* 추가 버튼 생성 함수
* */
export function createAddButton(buttonText = '추가') {
  return html`<button id="add-to-cart" class="bg-blue-500 text-white px-4 py-2 rounded">${buttonText}</button>`;
}

/*
* 재고 정보 표시 컨테이너 생성 함수
* */
export function createStockInfoDisplay() {
  return html`<div id="stock-status" class="text-sm text-gray-500 mt-2"></div>`;
}

/*
* 모든 UI 요소를 생성하고 조합하는 함수
* */
export function createAllUIElements() {
  // 필수 요소 생성
  const title = createPageTitle();
  const cartList = createCartContainer();
  const totalDisplay = createTotalDisplay();
  const productSelect = createProductSelect();
  const addButton = createAddButton();
  const stockInfoDisplay = createStockInfoDisplay();

  // 요소 조합
  const wrapper = createMainWrapper();
  appendChildren(wrapper, title, cartList, totalDisplay, productSelect, addButton, stockInfoDisplay);

  const container = createAppContainer();
  container.appendChild(wrapper);

  // 모든 요소를 객체로 반환
  return {
    container,
    wrapper,
    title,
    cartList,
    totalDisplay,
    productSelect,
    addButton,
    stockInfoDisplay
  };
}