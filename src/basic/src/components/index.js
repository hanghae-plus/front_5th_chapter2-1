import { createElement, createTypography } from '../utils/createNode';

export const container = createElement('div', null, 'bg-gray-100 p-8');
export const wrapper = createElement(
  'div',
  null,
  'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8'
);
export const cartList = createElement('div', 'cart-items', null);
export const cartTitle = createTypography(
  'h1',
  'text-2xl font-bold mb-4',
  '장바구니'
);
export const cartTotal = createElement(
  'div',
  'cart-total',
  'text-xl font-bold my-4'
);

export const select = createElement(
  'select',
  'product-select',
  'border rounded p-2 mr-2'
);

export const addButton = createElement(
  'button',
  'add-to-cart',
  'bg-blue-500 text-white px-4 py-2 rounded'
);
addButton.textContent = '추가';

export const stockStatus = createElement(
  'div',
  'stock-status',
  'text-sm text-gray-500 mt-2'
);
