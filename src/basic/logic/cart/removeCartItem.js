import { getQuantityFromElement } from '../../utils';

export const removeCartItem = (product, element) => {
  const quantity = getQuantityFromElement(element);
  product.quantity += quantity;
  element.remove();
};
