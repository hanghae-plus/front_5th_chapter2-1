import { applyBulkDiscount } from "../discount/bulk-discount";
import { applyTuesdayDiscount } from "./../discount/tuesday-discount";

export const calculateDiscount = (
  originalTotal: number,
  itemCount: number,
  finalTotal?: number,
): {
  finalTotal: number;
  discountRate: number;
} => {
  let final = finalTotal ?? originalTotal;

  // 대량 할인 적용
  const bulkResult = applyBulkDiscount(final, originalTotal, itemCount);

  // 화요일 할인 적용
  const tuesdayResult = applyTuesdayDiscount(bulkResult.finalTotal, bulkResult.discountRate);

  return {
    finalTotal: tuesdayResult.finalTotal,
    discountRate: tuesdayResult.discountRate,
  };
};
