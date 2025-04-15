class BaseElement {
  constructor({ tag, id, className, textContent }) {
    this.$element = document.createElement(tag);
    if (id) this.$element.id = id;
    if (className) this.$element.className = className;
    if (textContent) this.$element.textContent = textContent;
  }

  get() {
    return this.$element;
  }
}

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

class Cart extends BaseElement {
  constructor() {
    super({
      tag: 'div',
      id: 'cart-items',
    });
  }
}

class ItemSelect extends BaseElement {
  constructor() {
    super({
      tag: 'select',
      id: 'product-select',
      className: 'border rounded p-2 mr-2',
    });
  }
}

class Title extends BaseElement {
  constructor() {
    super({
      tag: 'h1',
      className: 'text-2xl font-bold mb-4',
      textContent: '장바구니',
    });
  }
}

class Sum extends BaseElement {
  constructor() {
    super({
      tag: 'div',
      id: 'cart-total',
      className: 'text-xl font-bold my-4',
    });
  }
}

class StockState extends BaseElement {
  constructor() {
    super({
      tag: 'div',
      id: 'stock-status',
      className: 'text-sm text-gray-500 mt-2',
    });
  }
}

let $addToCartButton = new AddCartButton().get();
let $cart = new Cart().get();
let $itemSelect = new ItemSelect().get();
let $title = new Title().get();
let $sum = new Sum().get();
let $stockState = new StockState().get();

export { $addToCartButton, $cart, $title, $itemSelect, $sum, $stockState };
