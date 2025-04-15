import { calculateCart } from "#basic/libs";
import store from "#basic/libs/store";

/**
 * 장바구니 클릭 이벤트
 * @param {MouseEvent} event
 */
export const handleCartDisplayClick = (event) => {
  const { target } = event;
  if (target.classList.contains("quantity-change") && target.classList.contains("remove-item")) return;

  const { products } = store.states;

  const productId = target.dataset.productId;
  const $product = document.getElementById(productId);
  const product = products.find((p) => p.id === productId);
  const $productName = $product.querySelector("span");
  const productQuantity = parseInt($productName.textContent.split("x ")[1]);

  if (target.classList.contains("quantity-change")) {
    const quantityChange = parseInt(target.dataset.change);
    const newQuantity = productQuantity + quantityChange;

    if (newQuantity > 0 && newQuantity <= product.stock + productQuantity) {
      $productName.textContent = $productName.textContent.split("x ")[0] + "x " + newQuantity;
      product.stock -= quantityChange;
    } else if (newQuantity <= 0) {
      $product.remove();
      product.stock -= quantityChange;
    } else {
      alert("재고가 부족합니다.");
    }
  }

  if (target.classList.contains("remove-item")) {
    product.stock += productQuantity;
    $product.remove();
  }

  calculateCart();
};
