import { TUESDAY, TUESDAY_DISCOUNT_RATE } from "../../constants/discount-constant";

/**
 * 화요일 할인 적용 함수
 *
 * @param finalTotal - 현재 계산된 금액
 * @param currentDiscount - 기존 할인율
 * @returns 새로운 할인 적용 금액과 최종 할인율
 */
export const applyTuesdayDiscount = (
  finalTotal: number,
  currentDiscount: number,
): { finalTotal: number; discountRate: number } => {
  const today = new Date().getDay();

  if (today === TUESDAY) {
    const discountedTotal = finalTotal * (1 - TUESDAY_DISCOUNT_RATE);
    const discountRate = Math.max(currentDiscount, TUESDAY_DISCOUNT_RATE);

    return { finalTotal: discountedTotal, discountRate };
  }

  return { finalTotal, discountRate: currentDiscount };
};
