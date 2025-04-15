import { PRODUCT_LIST } from '../consts/productList';
import { calculateCart } from '../logic';
import { SelectedProductStore } from '../store/stores';
import { CartItemsContainerDOM, ProductSelectDOM } from '../ui';

const getCartItemElement = (cartItemId) => document.getElementById(cartItemId);

const getQuantityFromElement = (element) =>
  parseInt(element.querySelector('span').dataset.quantity, 10);

const updateQuantityText = (element, product, quantity) => {
  const span = element.querySelector('span');
  span.dataset.quantity = quantity;
  span.textContent = `${product.name} - ${product.value}원 x ${quantity}`;
};

const createCartItemElement = (item) => {
  const newItem = document.createElement('div');
  newItem.id = item.id;
  newItem.className = 'flex justify-between items-center mb-2';
  newItem.innerHTML = `
    <span data-value="${item.value}" data-quantity="1">
      ${item.name} - ${item.value}원 x 1
    </span>
    <div>
      <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${item.id}" data-change="-1">-</button>
      <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${item.id}" data-change="1">+</button>
      <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${item.id}">삭제</button>
    </div>
  `;
  return newItem;
};

export const handleAddButtonClick = () => {
  const cartItemsContainer = CartItemsContainerDOM.get();
  const productSelect = ProductSelectDOM.get();

  const selectedProductId = productSelect.value;
  const itemToAdd = PRODUCT_LIST.find(
    (product) => product.id === selectedProductId,
  );

  if (!itemToAdd || itemToAdd.quantity <= 0) return;

  const item = getCartItemElement(itemToAdd.id);

  if (item) {
    const newQuantity = getQuantityFromElement(item) + 1;

    if (newQuantity <= itemToAdd.quantity) {
      updateQuantityText(item, itemToAdd, newQuantity);
      itemToAdd.quantity--;
    } else {
      alertOutOfStock();
      return;
    }
  } else {
    const newItem = createCartItemElement(itemToAdd);
    cartItemsContainer.appendChild(newItem);
    itemToAdd.quantity--;
  }

  calculateCart();
  SelectedProductStore.set('selectedProduct', selectedProductId);
};
