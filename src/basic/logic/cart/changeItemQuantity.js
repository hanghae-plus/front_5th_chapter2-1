import {
  getQuantityFromElement,
  updateQuantityText,
  alertOutOfStock,
} from '../../utils';

const updateCartItemQuantity = (element, product, newQuantity, change) => {
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

  updateCartItemQuantity(element, product, newQuantity, change);
};
