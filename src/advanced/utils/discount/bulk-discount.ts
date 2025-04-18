import { BULK_DISCOUNT_RATE, BULK_DISCOUNT_THRESHOLD } from "../../constants/discount-constant";

/**
 * 대량 구매 할인 적용 함수
 *
 * @param finalTotal - 현재 할인 적용 금액
 * @param originalTotal - 원래 총액
 * @param itemCount - 총 수량
 * @returns 새로운 금액과 할인율
 */
export const applyBulkDiscount = (
  finalTotal: number,
  originalTotal: number,
  itemCount: number,
): { finalTotal: number; discountRate: number } => {
  let discountRate = (originalTotal - finalTotal) / originalTotal;
  let newFinalTotal = finalTotal;

  if (itemCount < BULK_DISCOUNT_THRESHOLD) {
    return { finalTotal: newFinalTotal, discountRate };
  }

  const bulkDiscount = finalTotal * BULK_DISCOUNT_RATE;
  const itemDiscount = originalTotal - finalTotal;

  // 대량 할인 적용 여부 판단
  if (bulkDiscount > itemDiscount) {
    newFinalTotal = originalTotal * (1 - BULK_DISCOUNT_RATE);
    discountRate = BULK_DISCOUNT_RATE;
  }

  return { finalTotal: newFinalTotal, discountRate };
};
