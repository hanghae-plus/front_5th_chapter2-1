import { handleAddToCart } from "@/basic/handlers/handleAddToCart";
import { handleCartItems } from "@/basic/handlers/handleCartItems";
import { $ } from "@/basic/lib";
import { renderCartTotal } from "@/basic/render";

export const setListener = () => {
  const $addToCart = $("#add-to-cart");
  const $cartItems = $("#cart-items");

  const handleClickAddToCart = () => {
    const { products, lastSelected } = globalThis;
    globalThis.lastSelected = handleAddToCart(products) || lastSelected;
    renderCartTotal(products);
  };
  const handleClickCartItems = (e) => {
    const { products } = globalThis;
    handleCartItems(e.target, products);
    renderCartTotal(products);
  };

  $addToCart.addEventListener("click", handleClickAddToCart);
  $cartItems.addEventListener("click", handleClickCartItems);
};
