import { handleCartItemsContainerClick } from '../handlers/handleCartItemsContainerClick';

export const CartItemsContainerDOM = {
  _element: null,

  init() {
    this._element = document.createElement('div');
    this._element.id = 'cart-items';

    this._element.addEventListener('click', (event) =>
      handleCartItemsContainerClick(event),
    );
  },

  get() {
    return this._element;
  },
};
