import { TUESDAY, TUESDAY_DISCOUNT_RATE } from "../../constants/discount-constant";

/**
 * 할인율을 계산하는 함수
 *
 * @param finalTotal - 할인 적용 후 금액
 * @param originalTotal - 할인 전 금액
 * @returns 최종 할인율 (0.1 = 10%)
 */
export const calculateDiscountRate = (finalTotal: number, originalTotal: number): number => {
  const actualDiscountRate = (originalTotal - finalTotal) / originalTotal;
  const isTuesday = new Date().getDay() === TUESDAY;

  return isTuesday ? Math.max(actualDiscountRate, TUESDAY_DISCOUNT_RATE) : actualDiscountRate;
};
