import { calculateCart } from "../logic/calculate-cart";
import { cartState } from "../store/state";
import { createCartItemElement } from "../ui/create-cart-element";

/**
 * 선택한 상품을 장바구니에 추가하고, 재고와 총액을 갱신
 *
 */

export const handleAddToCart = () => {
  const $select = document.getElementById("product-select");
  const selectedItem = $select.value;
  const itemToAdd = cartState.products.find((product) => product.id === selectedItem);

  const $cartDisplay = document.getElementById("cart-items");

  if (itemToAdd && itemToAdd.q > 0) {
    const $item = document.getElementById(itemToAdd.id);

    if ($item) {
      const newQuantity = parseInt($item.querySelector("span").textContent.split("x ")[1]) + 1;

      if (newQuantity <= itemToAdd.q) {
        $item.querySelector("span").textContent =
          itemToAdd.name + " - " + itemToAdd.val + "원 x " + newQuantity;
        itemToAdd.q--;
      } else {
        alert("재고가 부족합니다.");
      }
    } else {
      const newItem = createCartItemElement(itemToAdd);
      $cartDisplay.appendChild(newItem);
      itemToAdd.q--;
    }

    calculateCart();
    cartState.lastSelected = selectedItem;
  }
};
