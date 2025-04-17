import { TUESDAY, TUESDAY_DISCOUNT_RATE } from "../../constants/discount-constant";

export const calculateDiscount = (
  finalTotal: number,
  originalTotal: number,
  itemCount: number,
): { finalTotal: number; discountRate: number } => {
  let discountRate = 0;

  const isTuesday = new Date().getDay() === TUESDAY;
  const bulkDiscount = itemCount >= 10 ? 0.25 : 0;

  // 더 높은 할인율 적용
  discountRate = Math.max(discountRate, bulkDiscount);
  if (isTuesday) discountRate = Math.max(discountRate, 0.1);

  finalTotal = originalTotal * (1 - discountRate);

  return { finalTotal, discountRate };
};

/**
 * 할인율 계산 함수
 *
 * @param finalTotal - 할인 적용 후 금액
 * @param originalTotal - 할인 전 원래 금액
 * @returns 최종 할인율 (0.1 = 10%)
 */
export const calculateDiscountRate = (finalTotal: number, originalTotal: number): number => {
  const actualDiscountRate = (originalTotal - finalTotal) / originalTotal;

  const today = new Date().getDay();
  return today === TUESDAY
    ? Math.max(actualDiscountRate, TUESDAY_DISCOUNT_RATE)
    : actualDiscountRate;
};
