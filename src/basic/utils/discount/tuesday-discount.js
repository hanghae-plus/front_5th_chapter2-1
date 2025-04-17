import { TUESDAY, TUESDAY_DISCOUNT_RATE } from "../../constant/discount-constant";

/**
 * 화요일 할인을 적용하는 함수
 */
export const applyTuesdayDiscount = (finalTotal, currentDiscount) => {
  if (new Date().getDay() === TUESDAY) {
    return {
      finalTotal: finalTotal * (1 - TUESDAY_DISCOUNT_RATE),
      discountRate: Math.max(currentDiscount, TUESDAY_DISCOUNT_RATE),
    };
  }
  return { finalTotal, discountRate: currentDiscount };
};
