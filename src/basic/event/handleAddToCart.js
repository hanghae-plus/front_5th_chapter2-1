import calculateCart from '../feature/calculateCart';

import { state, domRefs } from '../store/state';

export default function handleAddToCart() {
    const { productSelectElement, cartItemsContainer } = domRefs;
    const { productList } = state;

    const selectedProductId = productSelectElement.value;
    const productToAdd = productList.find((p) => p.id === selectedProductId);

    if (!productToAdd || productToAdd.q <= 0) return;

    const existingCartItem = document.getElementById(productToAdd.id);

    if (existingCartItem) {
        const newQuantity = parseInt(existingCartItem.querySelector('span').textContent.split('x ')[1]) + 1;

        if (newQuantity <= productToAdd.q) {
            existingCartItem.querySelector('span').textContent =
                `${productToAdd.name} - ${productToAdd.val}원 x ${newQuantity}`;
            productToAdd.q--;
        } else {
            alert('재고가 부족합니다.');
        }
    } else {
        const newItemElement = document.createElement('div');
        newItemElement.id = productToAdd.id;
        newItemElement.className = 'flex justify-between items-center mb-2';

        const span = document.createElement('span');
        span.textContent = `${productToAdd.name} - ${productToAdd.val}원 x 1`;

        const buttonWrapper = document.createElement('div');
        buttonWrapper.innerHTML = `
      <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" 
        data-product-id="${productToAdd.id}" data-change="-1">-</button>
      <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" 
        data-product-id="${productToAdd.id}" data-change="1">+</button>
      <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" 
        data-product-id="${productToAdd.id}">삭제</button>`;

        newItemElement.appendChild(span);
        newItemElement.appendChild(buttonWrapper);
        cartItemsContainer.appendChild(newItemElement);

        productToAdd.q--;
    }

    state.lastSelectedProductId = selectedProductId;
    calculateCart();
}
