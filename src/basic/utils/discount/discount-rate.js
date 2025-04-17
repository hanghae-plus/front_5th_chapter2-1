import { TUESDAY, TUESDAY_DISCOUNT_RATE } from "../../constant/discount-constant";

/**
 * 할인율을 계산하는 함수
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
