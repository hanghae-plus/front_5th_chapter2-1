import { PRODUCT_LIST } from '../consts/productList';
import { SelectedProductStore } from '../store/stores';
import { calculateCart } from '../logic';
import { CartItemsContainerDOM, ProductSelectDOM } from '../ui';

export const handleAddButtonClick = () => {
  const cartItemsContainer = CartItemsContainerDOM.get();
  const productSelect = ProductSelectDOM.get();

  const selectedProductId = productSelect.value;
  const itemToAdd = PRODUCT_LIST.find(
    (product) => product.id === selectedProductId,
  );

  if (!itemToAdd || itemToAdd.quantity <= 0) return;

  const item = document.getElementById(itemToAdd.id);

  if (item) {
    const newQuantity =
      parseInt(item.querySelector('span').dataset.quantity) + 1;

    if (newQuantity <= itemToAdd.quantity) {
      item.querySelector('span').dataset.quantity = newQuantity;
      item.querySelector('span').textContent =
        `${itemToAdd.name} - ${itemToAdd.value}원 x ${newQuantity}`;
      itemToAdd.quantity--;
    } else {
      alert('재고가 부족합니다.');
    }
  } else {
    const newItem = document.createElement('div');

    newItem.id = itemToAdd.id;
    newItem.className = 'flex justify-between items-center mb-2';
    newItem.innerHTML = `
        <span data-value="${itemToAdd.value}" data-quantity="1">${itemToAdd.name} - ${itemToAdd.value}원 x 1</span>
        <div>
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="-1">-</button>
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="1">+</button>
        <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${itemToAdd.id}">삭제</button>
        </div>
      `;
    cartItemsContainer.appendChild(newItem);
    itemToAdd.quantity--;
  }

  calculateCart();

  SelectedProductStore.set('selectedProduct', selectedProductId);
};
