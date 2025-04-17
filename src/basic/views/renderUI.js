import { CLASS_NAME, ID } from '../constants';

import { domRefs } from '../store/state';

export default function renderUI() {
    const rootElement = document.getElementById('app');
    const container = document.createElement('div');
    const wrapper = document.createElement('div');
    const headingElement = document.createElement('h1');

    domRefs.cartItemsContainer = document.createElement('div');
    domRefs.totalAmountElement = document.createElement('div');
    domRefs.productSelectElement = document.createElement('select');
    domRefs.addToCartButton = document.createElement('button');
    domRefs.stockStatusElement = document.createElement('div');

    domRefs.cartItemsContainer.id = ID.CART_ITEMS;
    domRefs.totalAmountElement.id = ID.CART_TOTAL;
    domRefs.productSelectElement.id = ID.PRODUCT_SELECT;
    domRefs.addToCartButton.id = ID.ADD_TO_CART;
    domRefs.stockStatusElement.id = ID.STOCK_STATUS;

    container.className = CLASS_NAME.CONTAINER;
    wrapper.className = CLASS_NAME.WRAPPER;
    headingElement.className = CLASS_NAME.HEADING;

    domRefs.totalAmountElement.className = CLASS_NAME.TOTAL_AMOUNT;
    domRefs.productSelectElement.className = CLASS_NAME.SELECT;
    domRefs.addToCartButton.className = CLASS_NAME.ADD_BUTTON;
    domRefs.stockStatusElement.className = CLASS_NAME.STOCK_STATUS;

    headingElement.textContent = '장바구니';
    domRefs.addToCartButton.textContent = '추가';

    wrapper.appendChild(headingElement);
    wrapper.appendChild(domRefs.cartItemsContainer);
    wrapper.appendChild(domRefs.totalAmountElement);
    wrapper.appendChild(domRefs.productSelectElement);
    wrapper.appendChild(domRefs.addToCartButton);
    wrapper.appendChild(domRefs.stockStatusElement);

    container.appendChild(wrapper);
    rootElement.appendChild(container);
}
