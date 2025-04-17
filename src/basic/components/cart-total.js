import { createElementFromHTML } from '../utils/dom-utils.js';
import { state } from '../store';

const $cartTotal = () => {
  const { totalAmount, discountRate } = state;
  const loyaltyPoints = Math.floor(totalAmount / 1000);

  const cartTotal = createElementFromHTML(/* html */ `
    <div id="cart-total" class="text-xl font-bold my-4">총액: ${totalAmount}원${
      discountRate > 0
        ? `<span class="text-green-500 ml-2">(${(discountRate * 100).toFixed(1)}% 할인 적용)</span>`
        : ''
    }<span id="loyalty-points" class="text-blue-500 ml-2">(포인트: ${loyaltyPoints})</span></div>
  `);

  return cartTotal;
};

export { $cartTotal };
