import { updateCartTotalElement } from '../dom-helpers';
import { CART_TOTAL_ID } from '../constants';

const CartTotal = {
  init: ({ totalAmount, discountRate }) => {
    updateCartTotalElement(totalAmount, discountRate);
  },
  render: () => {
    return `<div id="${CART_TOTAL_ID}" class="text-xl font-bold my-4"></div>`;
  },
};

export default CartTotal;
