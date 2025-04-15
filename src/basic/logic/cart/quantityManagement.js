import {
  getQuantityFromElement,
  updateQuantityText,
  alertOutOfStock,
} from '../../utils';

const updateItemQuantity = (element, product, newQuantity, change) => {
  updateQuantityText(element, product, newQuantity);
  product.quantity -= change;
};

const removeItemAndAdjustStock = (element, product, change) => {
  element.remove();
  product.quantity -= change;
};

export const changeItemQuantity = (target, product, element) => {
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

export const removeCartItem = (product, element) => {
  const quantity = getQuantityFromElement(element);
  product.quantity += quantity;
  element.remove();
};
