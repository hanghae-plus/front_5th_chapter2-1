import {
  createRootChildren,
  setSaleAlert,
  setSuggestionAlert,
} from "./logic.js";
import { calcCart } from "./calcCart.js";

function main() {
  const root = document.getElementById("app");
  const cont = createRootChildren();
  root.appendChild(cont);

  calcCart();
  setSaleAlert();
  setSuggestionAlert();
}

main();
