import BaseElement from './BaseElement';

class Cart extends BaseElement {
  constructor() {
    super({
      tag: 'div',
      id: 'cart-items',
    });
  }
}

const $cart = new Cart().get();

export default $cart;
