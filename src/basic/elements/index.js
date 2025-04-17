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
    DOM.getElement(name).appendChild(element);
  },

  setElementId: ({ element, id }) => {
    DOM.getElement(element).setAttribute('id', id);
  },
  setElementClass: ({ element, classes }) => {
    DOM.getElement(element).classList.add(...classes);
  },

  initializeElements: () => {
    DOM.setElementId({ element: 'cartItemContainer', id: 'cart-items' });
    DOM.setElementId({ element: 'summary', id: 'cart-total' });
    DOM.setElementId({ element: 'select', id: 'product-select' });
    DOM.setElementId({ element: 'addProductButton', id: 'add-to-cart' });
    DOM.setElementId({ element: 'stockInfo', id: 'stock-status' });

    DOM.setElementClass({ element: 'container', classes: ['bg-gray-100', 'p-8'] });
    DOM.setElementClass({
      element: 'wrapper',
      classes: ['max-w-md', 'mx-auto', 'bg-white', 'rounded-xl', 'shadow-md', 'overflow-hidden', 'md:max-w-2xl', 'p-8'],
    });
    DOM.setElementClass({ element: 'summary', classes: ['text-xl', 'font-bold', 'my-4'] });
    DOM.setElementClass({ element: 'select', classes: ['border', 'rounded', 'p-2', 'mr-2'] });
    DOM.setElementClass({
      element: 'addProductButton',
      classes: ['bg-blue-500', 'text-white', 'px-4', 'py-2', 'rounded'],
    });
    DOM.setElementClass({ element: 'stockInfo', classes: ['text-sm', 'text-gray-500', 'mt-2'] });

    DOM.getElement('header').textContent = '장바구니';
    DOM.getElement('addProductButton').textContent = '추가';
  },
  buildDOMStructure: () => {
    const WRAPPER_CHILDREN = ['header', 'cartItemContainer', 'summary', 'select', 'addProductButton', 'stockInfo'];

    WRAPPER_CHILDREN.forEach((child) => {
      DOM.appendElement('wrapper', DOM.getElement(child));
    });

    DOM.appendElement('container', DOM.getElement('wrapper'));

    return DOM.getElement('container');
  },
};
