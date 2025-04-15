import { calculateCart } from "../libs";

/**
 * 장바구니 클릭 이벤트
 *
 * @param {HTMLElement} $cartDisplay - 장바구니 요소
 * @param {HTMLElement} $sum - 총 금액 요소
 * @param {HTMLElement} $stockInfo - 재고 정보 요소
 * @param {Product[]} products - 상품 목록
 */
export const cartDisplayClickEvent = ($cartDisplay, $sum, $stockInfo, products) => {
  $cartDisplay.addEventListener("click", (event) => {
    const { target } = event;
    if (target.classList.contains("quantity-change") && target.classList.contains("remove-item")) return;

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

    calculateCart($cartDisplay, $sum, $stockInfo, products);
  });
};
