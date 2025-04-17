const container = document.createElement('div');
const wrapper = document.createElement('div');
const header = document.createElement('h1');
const cartItemContainer = document.createElement('div');
const summary = document.createElement('div');
const select = document.createElement('select');
const addProductButton = document.createElement('button');
const stockInfo = document.createElement('div');

export const DOM = {
  elements: {
    container,
    wrapper,
    header,
    cartItemContainer,
    summary,
    select,
    addProductButton,
    stockInfo,
  },

  getElement: (name) => DOM.elements[name],

  appendElement: (name, element) => {
    DOM.elements[name].appendChild(element);
  },

  setElementId: (name, id) => {
    DOM.elements[name].setAttribute('id', id);
  },
  setElementClass: (name, ...classes) => {
    DOM.elements[name].classList.add(...classes);
  },

  initializeElements: () => {
    DOM.setElementId('cartItemContainer', 'cart-items');
    DOM.setElementId('summary', 'cart-total');
    DOM.setElementId('select', 'product-select');
    DOM.setElementId('addProductButton', 'add-to-cart');
    DOM.setElementId('stockInfo', 'stock-status');

    DOM.setElementClass('container', 'bg-gray-100', 'p-8');
    DOM.setElementClass(
      'wrapper',
      'max-w-md',
      'mx-auto',
      'bg-white',
      'rounded-xl',
      'shadow-md',
      'overflow-hidden',
      'md:max-w-2xl',
      'p-8',
    );
    DOM.setElementClass('summary', 'text-xl', 'font-bold', 'my-4');
    DOM.setElementClass('select', 'border', 'rounded', 'p-2', 'mr-2');
    DOM.setElementClass('addProductButton', 'bg-blue-500', 'text-white', 'px-4', 'py-2', 'rounded');
    DOM.setElementClass('stockInfo', 'text-sm', 'text-gray-500', 'mt-2');

    DOM.getElement('header').textContent = '장바구니';
    DOM.getElement('addProductButton').textContent = '추가';
  },
  buildDOMStructure: () => {
    DOM.getElement('wrapper').appendChild(DOM.getElement('header'));
    DOM.getElement('wrapper').appendChild(DOM.getElement('cartItemContainer'));
    DOM.getElement('wrapper').appendChild(DOM.getElement('summary'));
    DOM.getElement('wrapper').appendChild(DOM.getElement('select'));
    DOM.getElement('wrapper').appendChild(DOM.getElement('addProductButton'));
    DOM.getElement('wrapper').appendChild(DOM.getElement('stockInfo'));

    DOM.getElement('container').appendChild(DOM.getElement('wrapper'));

    return DOM.getElement('container');
  },
};
