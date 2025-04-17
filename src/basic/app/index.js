import { logic } from "./Cart/logic.js";
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
  logic();
  setSaleAlert();
  setSuggestionAlert();
}
