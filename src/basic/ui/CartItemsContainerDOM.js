import { handleCartItemsContainerClick } from '../handlers';
import { DOM_IDS } from '../consts';

export const CartItemsContainerDOM = {
  _element: null,

  init() {
    this._element = document.createElement('div');
    this._element.id = DOM_IDS.CART.CONTAINER;

    this._element.addEventListener('click', (event) =>
      handleCartItemsContainerClick(event),
    );
  },

  get() {
    return this._element;
  },
};
