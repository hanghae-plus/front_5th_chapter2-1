import { TUESDAY, TUESDAY_DISCOUNT_RATE } from "../../constants/discount-constant";

/**
 * 할인율을 계산하는 함수
 *
 * @param finalTotal - 할인 적용 후 금액
 * @param originalTotal - 할인 전 원래 금액
 * @returns 최종 할인율 (0.1 = 10%)
 */
export const calculateDiscountRate = (finalTotal, originalTotal) => {
  // 기본 할인율 계산
  const actualDiscountRate = (originalTotal - finalTotal) / originalTotal;

  // 화요일 할인과 비교하여 더 큰 할인율 적용
  if (new Date().getDay() === TUESDAY) {
    return Math.max(actualDiscountRate, TUESDAY_DISCOUNT_RATE);
  }

  return actualDiscountRate;
};
