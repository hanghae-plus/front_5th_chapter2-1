import { PRODUCT_LIST } from '../consts';
import { getCartItemElement } from '../utils';
import { calculateCart, changeItemQuantity, removeCartItem } from '../logic';

export const handleCartItemsContainerClick = (event) => {
  const target = event.target;
  const cartItemId = target.dataset.productId;
  const element = getCartItemElement(cartItemId);
  const product = PRODUCT_LIST.find((p) => p.id === cartItemId);

  if (!element || !product) return;

  if (target.classList.contains('quantity-change')) {
    changeItemQuantity(target, product, element);
  } else if (target.classList.contains('remove-item')) {
    removeCartItem(product, element);
  }

  calculateCart();
};
