import { MainPage } from "./pages/MainPage";
import { cartService } from "./services/CartService";

MainPage();

const addBtn = document.getElementById("add-to-cart");
addBtn.addEventListener("click", function () {
  const sel = document.getElementById("product-select");
  let selItem = sel.value;
  cartService.addToCart(selItem);
});

const cartDisp = document.getElementById("cart-items");
cartDisp.addEventListener("click", function (event) {
  let tgt = event.target;
  if (
    tgt.classList.contains("quantity-change") ||
    tgt.classList.contains("remove-item")
  ) {
    cartService.removeFromCart(tgt);
  }
});
