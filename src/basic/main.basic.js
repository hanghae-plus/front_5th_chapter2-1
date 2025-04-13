import { MainPage } from "./pages/MainPage";
import { cartStore } from "./stores/cartStore";

MainPage();

const addBtn = document.getElementById("add-to-cart");
addBtn.addEventListener("click", function () {
  const sel = document.getElementById("product-select");
  cartStore.dispatch({ type: "ADD_ITEM", payload: sel });
});

const cartDisp = document.getElementById("cart-items");
cartDisp.addEventListener("click", function (event) {
  let tgt = event.target;
  if (
    tgt.classList.contains("quantity-change") ||
    tgt.classList.contains("remove-item")
  ) {
    cartStore.dispatch({ type: "REMOVE_ITEM", payload: tgt });
  }
});
