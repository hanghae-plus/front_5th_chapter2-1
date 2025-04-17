import BaseElement from './BaseElement';

class CartTotal extends BaseElement {
  constructor() {
    super({
      tag: 'div',
      id: 'cart-total',
      className: 'text-xl font-bold my-4',
    });
  }
}

const $cartTotal = new CartTotal().get();

export default $cartTotal;
