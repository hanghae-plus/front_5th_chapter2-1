import { PRODUCT_LIST } from '../consts/productList';
import { SelectedProductStore } from '../store/stores';
import { calculateCart } from '../main.basic';
import { CartItemsContainerDOM, ProductSelectDOM } from '../ui';

export const handleAddButtonClick = (stockStatusContainer) => {
  const cartItemsContainer = CartItemsContainerDOM.get();

  const productSelect = ProductSelectDOM.get();
  const selectedProductId = productSelect.value;
  const itemToAdd = PRODUCT_LIST.find(
    (product) => product.id === selectedProductId,
  );

  if (itemToAdd && itemToAdd.quantity > 0) {
    const item = document.getElementById(itemToAdd.id);

    if (item) {
      const newQuantity =
        parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;

      if (newQuantity <= itemToAdd.quantity) {
        item.querySelector('span').textContent =
          itemToAdd.name + ' - ' + itemToAdd.value + '원 x ' + newQuantity;
        itemToAdd.quantity--;
      } else {
        alert('재고가 부족합니다.');
      }
    } else {
      const newItem = document.createElement('div');

      newItem.id = itemToAdd.id;
      newItem.className = 'flex justify-between items-center mb-2';
      newItem.innerHTML = `
        <span>${itemToAdd.name} - ${itemToAdd.value}원 x 1</span>
        <div>
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="-1">-</button>
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="1">+</button>
        <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${itemToAdd.id}">삭제</button>
        </div>
      `;
      cartItemsContainer.appendChild(newItem);
      itemToAdd.quantity--;
    }

    calculateCart(stockStatusContainer);

    SelectedProductStore.set('selectedProduct', selectedProductId);
  }
};
