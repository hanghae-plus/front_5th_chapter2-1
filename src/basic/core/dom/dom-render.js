import { createElement } from './dom-builder';

// 요소 생성
const $root = document.getElementById('app');
const $container = createElement('div', { className: 'bg-gray-100 p-8' });
const $wrapper = createElement('div', {
  className:
    'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8',
});

const elements = {
  header: createElement('h1', {
    className: 'text-2xl font-bold mb-4',
    textContent: '장바구니',
  }),
  cartItemsContainer: createElement('div', {
    id: 'cart-items',
    className: 'text-xl font-bold my-4',
  }),
  cartTotal: createElement('div', {
    id: 'cart-total',
    className: 'text-xl font-bold my-4',
  }),
  productSelect: createElement('select', {
    id: 'product-select',
    className: 'border rounded p-2 mr-2',
  }),
  addToCartBtn: createElement('button', {
    id: 'add-to-cart',
    className: 'bg-blue-500 text-white px-4 py-2 rounded',
    textContent: '추가',
  }),
  stockStatus: createElement('div', {
    id: 'stock-status',
    className: 'text-sm text-gray-500 mt-2',
  }),
};

/**
 * DOM 요소 생성
 */
const createElements = () => {
  $root.append($container);
  $container.append($wrapper);
  $wrapper.append(...Object.values(elements));
};

const render = () => {
  createElements();
};

export { render, elements };
