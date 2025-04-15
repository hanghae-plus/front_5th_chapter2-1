const elements = {
  /** @type {HTMLSelectElement} */
  get $select() {
    return document.getElementById("product-select");
  },
  /** @type {HTMLDivElement} */
  get $sum() {
    return document.getElementById("cart-total");
  },
  /** @type {HTMLDivElement} */
  get $cartDisplay() {
    return document.getElementById("cart-items");
  },
  /** @type {HTMLButtonElement} */
  get $addCartButton() {
    return document.getElementById("add-to-cart");
  },
  /** @type {HTMLDivElement} */
  get $stockInfo() {
    return document.getElementById("stock-status");
  },
};

export default elements;
