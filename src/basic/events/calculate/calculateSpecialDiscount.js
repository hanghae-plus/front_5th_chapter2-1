import {
  SPECIAL_DAY_DISCOUNT_DATE,
  SPECIAL_DAY_DISCOUNT_RATE,
} from "../../consts/discounts";

const calculateSpecialDiscount = (totalPrice, totalDiscountRate) => {
  if (new Date().getDay() === SPECIAL_DAY_DISCOUNT_DATE) {
    totalPrice *= 1 - SPECIAL_DAY_DISCOUNT_RATE;
    totalDiscountRate = Math.max(totalDiscountRate, SPECIAL_DAY_DISCOUNT_RATE);
  }
  return { totalPrice, totalDiscountRate };
};

export default calculateSpecialDiscount;
