import BaseElement from './BaseElement';

class AddCartButton extends BaseElement {
  constructor() {
    super({
      tag: 'button',
      id: 'add-to-cart',
      className: 'bg-blue-500 text-white px-4 py-2 rounded',
      textContent: '추가',
    });
  }
}

const $addCartButton = new AddCartButton().get();

export default $addCartButton;
