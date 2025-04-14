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

const updateItemQuantity = (element, product, newQuantity, change) => {
  updateQuantityText(element, product, newQuantity);
  product.quantity -= change;
};

const removeItemAndAdjustStock = (element, product, change) => {
  element.remove();
  product.quantity -= change;
};

const alertOutOfStock = () => {
  alert('재고가 부족합니다.');
};

const handleQuantityChange = (target, product, element) => {
  const change = parseInt(target.dataset.change, 10);
  const currentQuantity = getQuantityFromElement(element);
  const newQuantity = currentQuantity + change;
  const maxAllowed = product.quantity + currentQuantity;

  if (newQuantity <= 0) {
    removeItemAndAdjustStock(element, product, change);
    return;
  }

  if (newQuantity > maxAllowed) {
    alertOutOfStock();
    return;
  }

  updateItemQuantity(element, product, newQuantity, change);
};

const handleRemoveItem = (product, element) => {
  const quantity = getQuantityFromElement(element);
  product.quantity += quantity;
  element.remove();
};

export const handleCartItemsContainerClick = (event) => {
  const target = event.target;

  if (
    target.classList.contains('quantity-change')
    || target.classList.contains('remove-item')
  ) {
    const cartItemId = target.dataset.productId;
    const cartItemElement = getCartItemElement(cartItemId);
    const product = PRODUCT_LIST.find((p) => p.id === cartItemId);

    if (!cartItemElement || !product) return;

    if (target.classList.contains('quantity-change')) {
      handleQuantityChange(target, product, cartItemElement);
    } else if (target.classList.contains('remove-item')) {
      handleRemoveItem(product, cartItemElement);
    }

    calculateCart();
  }
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
    const newItem = document.createElement('div');
    newItem.id = itemToAdd.id;
    newItem.className = 'flex justify-between items-center mb-2';
    newItem.innerHTML = `
      <span data-value="${itemToAdd.value}" data-quantity="1">
        ${itemToAdd.name} - ${itemToAdd.value}원 x 1
      </span>
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
