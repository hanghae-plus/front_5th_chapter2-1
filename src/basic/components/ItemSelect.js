import BaseElement from './BaseElement';

class ItemSelect extends BaseElement {
  constructor() {
    super({
      tag: 'select',
      id: 'product-select',
      className: 'border rounded p-2 mr-2',
    });
  }
}

const $itemSelect = new ItemSelect().get();

export default $itemSelect;
