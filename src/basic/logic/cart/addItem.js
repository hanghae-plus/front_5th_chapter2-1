import {
  getCartItemElement,
  getQuantityFromElement,
  updateQuantityText,
  alertOutOfStock,
} from '../../utils';
import { createCartItemElement } from '../../render';

export const addItemToCart = (itemToAdd, cartItemsContainer) => {
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
};
