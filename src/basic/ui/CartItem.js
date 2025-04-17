import { cartItemStore } from '../store/cartItemStore';

const cartItem = () => {
  const cartEl = document.createElement('div'); // div
  cartEl.id = 'cart-items';

  // 장바구니 아이템 렌더링 함수
  const renderItems = () => {
    cartEl.innerHTML = '';

    const { items } = cartItemStore.getState();

    items.forEach((item) => {
      const $newCartItem = document.createElement('div');
      $newCartItem.id = item.id;
      $newCartItem.className = 'flex justify-between items-center mb-2';
      $newCartItem.innerHTML = `
          <span>${item.name} - ${item.price}원 x ${item.quantity}</span>
          <div>
            <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${item.id}" data-change="-1">-</button>
            <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${item.id}" data-change="1">+</button>
            <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${item.id}">삭제</button>
          </div>`;
      cartEl.appendChild($newCartItem);
    });
  };

  // DOM에 추가하는 로직
  const render = (targetEl) => {
    targetEl.appendChild(cartEl);

    renderItems();

    cartItemStore.subscribe(renderItems);
  };

  return { element: cartEl, render };
};

export { cartItem };
