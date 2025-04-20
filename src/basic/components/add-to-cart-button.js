import { prodList } from '../lib/constants';
import { store } from '../lib/store';
import { updateCartItems } from '../updates/cartItems';
import { createElement, extractCartProductInfo } from '../lib/utils';

export const AddToCartButton = {
  template:
    () => `<button id="add-to-cart" class="bg-blue-500 text-white px-4 py-2 rounded">
      추가
    </button>`,
  onMount: () => {
    const addBtn = document.getElementById('add-to-cart');

    addBtn.addEventListener('click', function () {
      const productSelect = document.getElementById('product-select');
      const cartDisp = document.getElementById('cart-items');

      const selectedProductId = productSelect.value;
      const itemToAdd = prodList.find((p) => p.id === selectedProductId);

      if (!itemToAdd || itemToAdd.quantity <= 0) return;

      const itemInCart = document.getElementById(itemToAdd.id);

      // 이미 장바구니에 있다면 수량 증가
      if (itemInCart) {
        const itemStrElem = itemInCart.querySelector('span');
        const { quantity: prevQuantity } = extractCartProductInfo(itemStrElem);
        const newQuantity = prevQuantity + 1;

        // 재고가 충분한지 확인 후 텍스트, 수량 업데이트
        if (newQuantity <= itemToAdd.quantity) {
          const newItemString = `${itemToAdd.name} - ${itemToAdd.price}원 x ${newQuantity}`;
          itemStrElem.textContent = newItemString;
          itemToAdd.quantity--;
        } else {
          alert('재고가 부족합니다.');
        }
      } else {
        // 장바구니에 없다면 새로 추가
        const newItem = createElement('div', {
          id: itemToAdd.id,
          className: 'flex justify-between items-center mb-2',
        });

        const minusBtnString = `<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="-1">-</button>`;
        const plusBtnString = `<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="1">+</button>`;
        const removeBtnString = `<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${itemToAdd.id}">삭제</button>`;
        const itemInfoString = `<span>${itemToAdd.name} - ${itemToAdd.price}원 x 1</span>`;

        newItem.innerHTML = `${itemInfoString}<div>${minusBtnString}${plusBtnString}${removeBtnString}</div>`;
        cartDisp.appendChild(newItem);

        itemToAdd.quantity--;
      }
      updateCartItems();
      store.lastSelectedId = selectedProductId;
    });
  },
};
