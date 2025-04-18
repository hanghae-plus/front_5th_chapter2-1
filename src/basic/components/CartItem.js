import { CART_ITEMS_ID } from '../constants';

const CartItem = {
  init: cartService => {
    const cartItemsElement = document.querySelector(`#${CART_ITEMS_ID}`);

    const { updateCartItem, removeCartItem } = cartService;

    cartItemsElement.addEventListener('click', event => {
      const { target } = event;

      const productId = target.dataset.productId;

      if (target.classList.contains('quantity-change')) {
        const change = parseInt(target.dataset.change);
        updateCartItem(change, productId);
        return;
      }

      if (target.classList.contains('remove-item')) {
        removeCartItem(productId);
      }
    });
  },
  render: () => {},
};

export default CartItem;
