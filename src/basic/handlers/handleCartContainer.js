import { useCalcCart } from "../hooks/useCalcCart";

export default function handleCartContainer(
  totalAmount,
  itemCount,
  cartContainer,
  productList,
  stockInfo,
  totalPrice,
) {
  return function (event) {
    let target = event.target;
    if (target.classList.contains("quantity-change") || target.classList.contains("remove-item")) {
      let productId = target.dataset.productId;
      let productElement = document.getElementById(productId);
      let product = productList.find(function (p) {
        return p.id === productId;
      });
      if (target.classList.contains("quantity-change")) {
        let quantityChange = parseInt(target.dataset.change);
        let newQuantity =
          parseInt(productElement.querySelector("span").textContent.split("x ")[1]) +
          quantityChange;
        if (
          newQuantity > 0 &&
          newQuantity <=
            product.quantity +
              parseInt(productElement.querySelector("span").textContent.split("x ")[1])
        ) {
          productElement.querySelector("span").textContent =
            productElement.querySelector("span").textContent.split("x ")[0] + "x " + newQuantity;
          product.quantity -= quantityChange;
        } else if (newQuantity <= 0) {
          productElement.remove();
          product.quantity -= quantityChange;
        } else {
          alert("재고가 부족합니다.");
        }
      } else if (target.classList.contains("remove-item")) {
        let removeQuantity = parseInt(
          productElement.querySelector("span").textContent.split("x ")[1],
        );
        product.quantity += removeQuantity;
        productElement.remove();
      }
      useCalcCart(totalAmount, itemCount, cartContainer, productList, stockInfo, totalPrice);
    }
  };
}
