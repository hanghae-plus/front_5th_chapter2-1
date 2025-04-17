import { layoutTemplate } from "./templates.js";

export function mount() {
  const root = document.getElementById("app");
  if (!root) throw new Error("cannot find root app element");

  root.innerHTML = layoutTemplate();

  const cartItemList = root.querySelector("#cart-items");
  const cartTotalEl = root.querySelector("#cart-total");
  const productSelector = root.querySelector("#product-select");
  const addToCartButton = root.querySelector("#add-to-cart");
  const stockStatusEl = root.querySelector("#stock-status");

  return {
    cartItemList,
    cartTotalEl,
    productSelector,
    addToCartButton,
    stockStatusEl,
  };
}
