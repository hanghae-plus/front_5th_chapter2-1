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

  initializeElements: () => {
    DOM.elements.cartItemContainer.id = 'cart-items';
    DOM.elements.summary.id = 'cart-total';
    DOM.elements.select.id = 'product-select';
    DOM.elements.addProductButton.id = 'add-to-cart';
    DOM.elements.stockInfo.id = 'stock-status';

    DOM.elements.container.className = 'bg-gray-100 p-8';
    DOM.elements.wrapper.className = 'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';
    DOM.elements.header.className = 'text-2xl font-bold mb-4';
    DOM.elements.summary.className = 'text-xl font-bold my-4';
    DOM.elements.select.className = 'border rounded p-2 mr-2';
    DOM.elements.addProductButton.className = 'bg-blue-500 text-white px-4 py-2 rounded';
    DOM.elements.stockInfo.className = 'text-sm text-gray-500 mt-2';

    DOM.elements.header.textContent = '장바구니';
    DOM.elements.addProductButton.textContent = '추가';
  },
  buildDOMStructure: () => {
    DOM.elements.wrapper.appendChild(DOM.elements.header);
    DOM.elements.wrapper.appendChild(DOM.elements.cartItemContainer);
    DOM.elements.wrapper.appendChild(DOM.elements.summary);
    DOM.elements.wrapper.appendChild(DOM.elements.select);
    DOM.elements.wrapper.appendChild(DOM.elements.addProductButton);
    DOM.elements.wrapper.appendChild(DOM.elements.stockInfo);

    DOM.elements.container.appendChild(DOM.elements.wrapper);

    return DOM.elements.container;
  },
};
