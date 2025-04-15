import { PRODUCT_LIST } from '../consts/productList';
import { calculateCart } from '../logic';
import { SelectedProductStore } from '../store';
import { CartItemsContainerDOM, ProductSelectDOM } from '../ui';
import { cartItemElement } from '../render';
import {
  formatPrice,
  getCartItemElement,
  getQuantityFromElement,
  updateQuantityText,
  alertOutOfStock,
} from '../utils';

const getCartItemElement = (cartItemId) => document.getElementById(cartItemId);

const getQuantityFromElement = (element) =>
  parseInt(element.querySelector('span').dataset.quantity, 10);

const updateQuantityText = (element, product, quantity) => {
  const span = element.querySelector('span');
  span.dataset.quantity = quantity;
  span.textContent = `${product.name} - ${formatPrice(product.value)} x ${quantity}`;
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
    const newItem = cartItemElement(itemToAdd);
    cartItemsContainer.appendChild(newItem);
    itemToAdd.quantity--;
  }

  calculateCart();
  SelectedProductStore.set('selectedProduct', selectedProductId);
};
