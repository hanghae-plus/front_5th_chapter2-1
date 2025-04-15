import BaseElement from './BaseElement';

class Stock extends BaseElement {
  constructor() {
    super({
      tag: 'div',
      id: 'stock-status',
      className: 'text-sm text-gray-500 mt-2',
    });
  }
}

const $stock = new Stock().get();

export default $stock;
