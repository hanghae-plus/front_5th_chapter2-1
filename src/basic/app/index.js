import { updateCartDom } from "./Cart/updateCartDom.js";
import { setSaleAlert, setSuggestionAlert } from "./logic.js";
import { createCart } from "./Cart/index.js";

export function createRootChildren() {
  const cont = document.createElement("div");
  cont.className = "bg-gray-100 p-8";

  const cart = createCart();
  cont.appendChild(cart);

  return cont;
}

export function setUp() {
  updateCartDom();
  setSaleAlert();
  setSuggestionAlert();
}
