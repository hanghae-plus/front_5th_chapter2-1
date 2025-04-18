import { createElement } from '../utils/elementUtils';

export const cartWrapperElement = createElement('div', {
  className: 'bg-gray-100 p-8',
});

export const cartContentElement = createElement('div', {
  className:
    'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8',
});

export const cartText = createElement('h1', {
  className: 'text-2xl font-bold mb-4',
  textContent: '장바구니',
});
