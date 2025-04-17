import { BULK_DISCOUNT_RATE, BULK_DISCOUNT_THRESHOLD } from "../../constant/discount-constant";

/**
 * 대량 구매 할인을 계산하고 적용하는 함수
 */
export const applyBulkDiscount = (finalTotal, originalTotal, itemCount) => {
  if (itemCount < BULK_DISCOUNT_THRESHOLD) {
    return finalTotal;
  }

  // 대량 구매 할인액과 현재 할인액 비교
  const bulkDiscount = finalTotal * BULK_DISCOUNT_RATE;
  const currentDiscount = originalTotal - finalTotal;

  // 대량 구매 할인이 더 큰 경우, 대량 구매 할인 적용
  if (bulkDiscount > currentDiscount) {
    return originalTotal * (1 - BULK_DISCOUNT_RATE);
  }

  // 기존 할인이 더 크면 그대로 유지
  return finalTotal;
};
