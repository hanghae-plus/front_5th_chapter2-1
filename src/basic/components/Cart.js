import { productStore, cartStore } from '../stores';
import { addEvent } from '../@lib/eventManager';
import { calculateCartItem } from '../services/calculateCartItems';

export const Cart = () => {
  const { changeCartItemQuantity, removeFromCart } = cartStore.actions;

  const template = /*html */ `
    <h1 class="text-2xl font-bold">장바구니</h1>
    <div id="cart-items"></div>
    <div id="cart-total" class="text-xl font-bold my-4"></div>
  `;

  const init = () => {
    render();
  };

  const render = () => {
    const { products } = productStore.getState();
    const { cartItems } = cartStore.getState();

    const $cartItems = document.getElementById('cart-items');
    if ($cartItems) {
      $cartItems.innerHTML = renderCartItems(cartItems);
    }

    const $cartTotal = document.getElementById('cart-total');
    if ($cartTotal) {
      $cartTotal.innerHTML = renderCartTotal(cartItems);
    }

    addEvent('click', '.quantity-change', (e) => {
      const { productId, change } = e.target.dataset;
      const product = products.find((p) => p.id === productId);
      changeCartItemQuantity(product, Number(change));
    });

    addEvent('click', '.remove-item', (e) => {
      const { productId } = e.target.dataset;
      removeFromCart(productId);
    });
  };

  const renderCartItems = (cartItems) => {
    return cartItems
      .map(
        (item) => `
          <div id="${item.id}" class="flex justify-between items-center mb-2">
            <span>${item.name} - ${item.price}원 x ${item.quantity}</span>
            <div>
              <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${item.id}" data-change="-1">-</button>
              <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${item.id}" data-change="1">+</button>
              <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${item.id}">삭제</button>
            </div>
          </div>
      `,
      )
      .join('');
  };

  const renderCartTotal = (cartItems) => {
    const { total, discountRate, bonusPoint } = calculateCartItem(cartItems);
    return `
    <div id="cart-total" class="text-xl font-bold my-4">
      ${
        `총액: ${total}원` +
        `${discountRate > 0 ? `<span class="text-green-500 ml-2">(${(discountRate * 100).toFixed(1)}% 할인 적용)</span>` : ''}` +
        `<span id="loyalty-points" class="text-blue-500 ml-2">(포인트: ${bonusPoint})</span>`
      }
    </div>
    `;
  };

  return { init, template, render };
};
