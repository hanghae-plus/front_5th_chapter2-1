import { PRODUCT_LIST } from "../configs/products";
import { bonusPointService } from "../services/BonusPointService";
import { discountService } from "../services/DiscountService";

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
    let itemTot = curItem.price * q;
    let disc = 0;
    totalQuantity += q;
    totalAmountBeforeDiscount += itemTot;
    if (q >= 10) {
      if (curItem.id === "p1") disc = 0.1;
      else if (curItem.id === "p2") disc = 0.15;
      else if (curItem.id === "p3") disc = 0.2;
      else if (curItem.id === "p4") disc = 0.05;
      else if (curItem.id === "p5") disc = 0.25;
    }
    totalAmount += itemTot * (1 - disc);
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
