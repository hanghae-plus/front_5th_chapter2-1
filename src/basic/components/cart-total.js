import { createElementFromHTML } from '../utils/dom-utils.js';

const $cartTotal = () => {
  const cartTotal = createElementFromHTML(/* html */ `
    <div id="cart-total" class="text-xl font-bold my-4">총액: 0원(포인트: 0)</div>
  `);

  return cartTotal;
};

export { $cartTotal };
