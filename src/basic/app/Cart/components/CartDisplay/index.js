import { ElementIds } from "../../../../../constants.js";
import { handleClickCartDisp } from "./logic.js";

export function createCartDisplay() {
  const cartDisplay = document.createElement("div");
  cartDisplay.id = ElementIds.CART_DISP;
  cartDisplay.addEventListener("click", handleClickCartDisp);

  return cartDisplay;
}
