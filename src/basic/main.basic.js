import { MainPage } from "./pages/MainPage";
import { cartStore } from "./stores/cartStore";

MainPage();

const addBtn = document.getElementById("add-to-cart");
addBtn.addEventListener("click", () => {
  const sel = document.getElementById("product-select");
  cartStore.dispatch({ type: "ADD_TO_CART", payload: sel });
});

const cartDisp = document.getElementById("cart-items");
cartDisp.addEventListener("click", (event) => {
  console.log("cartDisp click", event);
  const tgt = event.target;

  if (tgt.classList.contains("quantity-change")) {
    console.log("CHANGE_QUANTITY", tgt);
    cartStore.dispatch({ type: "CHANGE_QUANTITY", payload: tgt });
  }

  if (tgt.classList.contains("remove-item")) cartStore.dispatch({ type: "REMOVE_FROM_CART", payload: tgt });
});
