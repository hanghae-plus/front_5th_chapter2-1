import { BULK_DISCOUNT_RATE, BULK_DISCOUNT_THRESHOLD } from "../../constants/discount-constant";

/**
 * 대량 구매 할인을 계산하고 적용하는 함수
 * 
 * @param finalTotal - 현재 할인 적용 금액
 * @param originalTotal - 원래 총액
 * @param itemCount - 총 수량

 */
export const applyBulkDiscount = (finalTotal, originalTotal, itemCount) => {
  let newDiscountRate = (originalTotal - finalTotal) / originalTotal;
  let newFinalTotal = finalTotal;

  if (itemCount < BULK_DISCOUNT_THRESHOLD) {
    return { finalTotal: newFinalTotal, discountRate: newDiscountRate };
  }

  const bulkDiscount = finalTotal * BULK_DISCOUNT_RATE;
  const itemDiscount = originalTotal - finalTotal;

  // 대량 구매 할인이 더 유리한 경우에만 적용
  if (bulkDiscount > itemDiscount) {
    newFinalTotal = originalTotal * (1 - BULK_DISCOUNT_RATE);
    newDiscountRate = BULK_DISCOUNT_RATE;
  }

  return { finalTotal: newFinalTotal, discountRate: newDiscountRate };
};
