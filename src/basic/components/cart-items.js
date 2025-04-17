import { state } from '../store';
import { addEventListeners } from '../utils/event.js';
import {
  handleClickIncrease,
  handleClickDecrease,
  handleClickRemove,
} from '../services/cart-service.js';

const CartItems = () => {
  const $cartItems = Object.assign(document.createElement('div'), {
    id: 'cart-items',
    className: 'my-4',
  });

  const render = () => {
    const cartList = state.cartList;
    const products = state.products;

    $cartItems.innerHTML = `${cartList
      .map(
        ({
          id,
          name,
          _,
          quantity,
        }) => `<div id="${id}" class="flex justify-between items-center mb-2">
              <span>${name} - ${products.find(({ id }) => id === id)?.price}원 x ${quantity}</span>
              <div>
                <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${id}" data-change="-1">-</button>
                <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${id}" data-change="1">+</button>
                <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${id}">삭제</button>
              </div>
            </div>
          `,
      )
      .join('')}`;

    addEventListeners('button[data-change="1"]', 'click', handleClickIncrease);
    addEventListeners('button[data-change="-1"]', 'click', handleClickDecrease);
    addEventListeners('.remove-item', 'click', handleClickRemove);
  };

  state.subscribe('cartList', render);
  render();

  return $cartItems;
};

export { CartItems };
