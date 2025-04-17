import { TUESDAY, TUESDAY_DISCOUNT_RATE } from "../../constants/discount-constant";

/**
 * 화요일 할인을 적용하는 함수
 * @param finalTotal - 현재 계산된 금액
 * @param currentDiscount - 기존 할인율
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
