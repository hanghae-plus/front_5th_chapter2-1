import { DISCOUNT_RATIO } from "./fixture";
import { cartState, state } from "./main.basic";

const isTuesDay = () => (new Date().getDay() === 2 ? true : false);

function getDiscountRatioWhenProductOver10(quantity, id) {
  if (quantity >= DISCOUNT_RATIO.EACH_PRODUCT.QUANTITY) {
    if (id === "p1") return DISCOUNT_RATIO.EACH_PRODUCT.RATIO[id];
    else if (id === "p2") return DISCOUNT_RATIO.EACH_PRODUCT.RATIO[id];
    else if (id === "p3") return DISCOUNT_RATIO.EACH_PRODUCT.RATIO[id];
    else if (id === "p4") return DISCOUNT_RATIO.EACH_PRODUCT.RATIO[id];
    else if (id === "p5") return DISCOUNT_RATIO.EACH_PRODUCT.RATIO[id];
  }
  return 0;
}

export function calcCart() {
  let itemCnt = Object.values(cartState).reduce((acc, count) => {
    return acc + count;
  }, 0);

  let subTot = Object.entries(cartState).reduce((acc, [prodId, quantity]) => {
    return acc + state.stock[prodId].price * quantity;
  }, 0);

  let totalAmount = Object.entries(cartState).reduce(
    (acc, [prodId, quantity]) => {
      const itemTot = state.stock[prodId].price * quantity;
      let discount = getDiscountRatioWhenProductOver10(quantity, prodId);
      return acc + itemTot * (1 - discount);
    },
    0
  );

  let discountRate = (subTot - totalAmount) / subTot;
  if (itemCnt >= DISCOUNT_RATIO.ALL_PRODUCT.QUANTITY) {
    const bulkDiscount = totalAmount * DISCOUNT_RATIO.ALL_PRODUCT.RATIO;
    const itemDiscount = subTot - totalAmount;
    if (bulkDiscount > itemDiscount) {
      totalAmount = subTot * (1 - DISCOUNT_RATIO.ALL_PRODUCT.RATIO);
      discountRate = DISCOUNT_RATIO.ALL_PRODUCT.RATIO;
    }
  }

  if (isTuesDay()) {
    totalAmount *= 1 - 0.1;
    discountRate = Math.max(discountRate, 0.1);
  }

  return {
    totalAmount,
    discountRate,
  };
}
