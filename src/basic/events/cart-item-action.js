import { calculateCart } from "../logic/calculate-cart";
import { cartState } from "../store/state";

/**
 * 장바구니 항목 내 버튼 클릭 시 수량 변경 또는 항목 삭제를 처리합니다.
 *
 * @param {MouseEvent} event
 */

export const handleCartItemAction = (event) => {
  const target = event.target;
  const isQuantityChangeBtn = target.classList.contains("quantity-change");
  const isRemoveBtn = target.classList.contains("remove-item");

  if (!isQuantityChangeBtn && !isRemoveBtn) return;

  const productId = target.dataset.productId;
  const itemElem = document.getElementById(productId);
  const product = cartState.products.find((p) => p.id === productId);

  const quantityText = itemElem.querySelector("span").textContent;
  const currentQuantity = parseInt(quantityText.split("x ")[1]);

  if (isQuantityChangeBtn) {
    const quantityChange = parseInt(target.dataset.change);
    const newQuantity = currentQuantity + quantityChange;

    if (newQuantity > 0 && newQuantity <= product.q + currentQuantity) {
      itemElem.querySelector("span").textContent = quantityText.split("x ")[0] + "x " + newQuantity;
      product.q -= quantityChange;
    } else if (newQuantity <= 0) {
      itemElem.remove();
      product.q -= quantityChange;
    } else {
      alert("재고가 부족합니다.");
    }
  }

  if (isRemoveBtn) {
    product.q += currentQuantity;
    itemElem.remove();
  }
  calculateCart();
};
