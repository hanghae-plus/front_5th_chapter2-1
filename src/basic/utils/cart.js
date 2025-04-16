import { formatPrice } from './format';

export const getCartItemElement = (cartItemId) =>
  document.getElementById(cartItemId);

export const getQuantityFromElement = (element) =>
  Number.parseInt(element.querySelector('span').dataset.quantity, 10);

export const updateQuantityText = (element, product, quantity) => {
  const span = element.querySelector('span');
  span.dataset.quantity = quantity;
  span.textContent = `${product.name} - ${formatPrice(product.value)} x ${quantity}`;
};
