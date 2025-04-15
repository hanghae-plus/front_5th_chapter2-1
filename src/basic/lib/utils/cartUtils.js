import { PRODUCT_LIST } from "../configs/products";
import { bonusPointService } from "../services/BonusPointService";
import { discountService } from "../services/DiscountService";
import { getDiscountRateByProduct } from "./discountUtils";

export function calculateCartTotal() {
  let totalQuantity = 0;
  let totalAmountBeforeDiscount = 0;
  let totalAmount = 0;

  const cartDisp = document.getElementById("cart-items");
  const cartItems = cartDisp.children;

  if (cartItems.length === 0) {
    bonusPointService.resetBonusPoints();
    return {
      totalQuantity,
      totalAmountBeforeDiscount,
      totalAmount,
    };
  }

  for (let $cartItem of cartItems) {
    const productItem = PRODUCT_LIST.find((item) => item.id === $cartItem.id);

    const quantity = parseInt(
      $cartItem.querySelector("span").textContent.split("x ")[1],
    );
    const totalAmountOfItem = productItem.price * quantity;

    totalQuantity += quantity;
    totalAmountBeforeDiscount += totalAmountOfItem;

    if (quantity < 10) {
      totalAmount += totalAmountOfItem;
      continue;
    }

    totalAmount +=
      totalAmountOfItem * (1 - getDiscountRateByProduct(productItem.id));
  }

  totalAmount = discountService.applyDiscount(
    totalQuantity,
    totalAmount,
    totalAmountBeforeDiscount,
  );

  bonusPointService.getBonusPointsFromTotalAmount(totalAmount);

  return {
    totalQuantity,
    totalAmountBeforeDiscount,
    totalAmount,
  };
}

export function getQuantityOfItem(itemElem) {
  return parseInt(itemElem.querySelector("span").textContent.split("x ")[1]);
}

export function getNameOfItem(itemElem) {
  return itemElem.querySelector("span").textContent.split("x ")[0];
}

export function isProductOutOfSold(newQuantity, currentQuantity, stock) {
  return newQuantity > stock;
}
