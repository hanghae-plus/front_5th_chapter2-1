import { products } from "../data/products";
import { createCartTemplate } from "../ui/create-cart-template";
import { calculateCart } from "./calculate-cart";

/**
 * 선택한 상품을 장바구니에 추가하고, 재고와 총액을 갱신
 *
 * @param {{ current: string | null }} lastSelectedRef - 최근 장바구니에 추가된 상품의 참조 객체
 */

export const handleAddToCart = (lastSelectedRef) => {
  const $select = document.getElementById("product-select");
  const selectedItem = $select.value;
  const itemToAdd = products.find((product) => product.id === selectedItem);

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
      const newItem = createCartTemplate(itemToAdd);
      $cartDisplay.appendChild(newItem);
      itemToAdd.q--;
    }

    calculateCart();
    lastSelectedRef.current = selectedItem;
  }
};
