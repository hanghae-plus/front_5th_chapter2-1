import { DISCOUNT_RATES, SALE_DAY, LIMIT } from '../constants/index.js';

export function calcFinalDiscount(
  totalAmount: number,
  itemCount: number,
  originalTotalAmount: number,
) {
  let finalDiscountRate = 0;
  let discountedTotalAmount = totalAmount;

  const bulkDiscount = totalAmount * DISCOUNT_RATES.BULK;
  const itemDiscount = originalTotalAmount - totalAmount;

  if (itemCount >= LIMIT.BULK_DISCOUNT && bulkDiscount > itemDiscount) {
    discountedTotalAmount = originalTotalAmount * (1 - DISCOUNT_RATES.BULK);
    finalDiscountRate = DISCOUNT_RATES.BULK;
  } else {
    finalDiscountRate =
      (originalTotalAmount - totalAmount) / originalTotalAmount;
  }

  if (new Date().getDay() === SALE_DAY) {
    discountedTotalAmount *= 1 - DISCOUNT_RATES.SALE_DAY;
    finalDiscountRate = Math.max(finalDiscountRate, SALE_DAY);
  }

  return { finalDiscountRate, discountedTotalAmount };
}
