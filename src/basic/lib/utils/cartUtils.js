import { PRODUCT_LIST } from "../configs/products";
import { bonusPointService } from "../services/BonusPointService";
import { discountService } from "../services/DiscountService";

export function calculateCartTotal() {
  let totalQuantity = 0;
  let originalTotalPrice = 0;
  let totalPrice = 0;

  const cartDisp = document.getElementById("cart-items");
  const cartItems = cartDisp.children;

  if (cartItems.length === 0) {
    return {
      totalQuantity,
      originalTotalPrice,
      totalPrice,
    };
  }

  for (let i = 0; i < cartItems.length; i++) {
    let curItem;
    for (let j = 0; j < PRODUCT_LIST.length; j++) {
      if (PRODUCT_LIST[j].id === cartItems[i].id) {
        curItem = PRODUCT_LIST[j];
        break;
      }
    }
    let q = parseInt(
      cartItems[i].querySelector("span").textContent.split("x ")[1],
    );
    let itemTot = curItem.val * q;
    let disc = 0;
    totalQuantity += q;
    originalTotalPrice += itemTot;
    if (q >= 10) {
      if (curItem.id === "p1") disc = 0.1;
      else if (curItem.id === "p2") disc = 0.15;
      else if (curItem.id === "p3") disc = 0.2;
      else if (curItem.id === "p4") disc = 0.05;
      else if (curItem.id === "p5") disc = 0.25;
    }
    totalPrice += itemTot * (1 - disc);
  }

  totalPrice = discountService.applyDiscount(
    totalQuantity,
    totalPrice,
    originalTotalPrice,
  );

  bonusPointService.applyBonusPoints(totalPrice);

  return {
    totalQuantity,
    originalTotalPrice,
    totalPrice,
  };
}
