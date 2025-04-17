import { createElementFromHTML } from '../utils/dom-utils.js';

const $cartItemsContainer = () => {
  return createElementFromHTML(/* html */ `
    <div id="cart-items" class="text-xl font-bold my-4"></div>
  `);
};

export { $cartItemsContainer };
