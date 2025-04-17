import {
  BULK_DISCOUNT_THRESHOLD,
  BULK_DISCOUNT_RATE,
  EXTRA_DISCOUNT_DAY,
  EXTRA_DISCOUNT_RATE,
} from '../constant/cart';

export function applyDiscount(totalBefore, totalAfterItem, productCount) {
  let finalTotal = totalAfterItem;
  let appliedDiscountRate = 0;

  const itemLevelDiscount = totalBefore - totalAfterItem;

  if (productCount >= BULK_DISCOUNT_THRESHOLD) {
    const bulkDiscount = totalBefore * BULK_DISCOUNT_RATE;

    if (bulkDiscount > itemLevelDiscount) {
      finalTotal = totalBefore * (1 - BULK_DISCOUNT_RATE);
      appliedDiscountRate = BULK_DISCOUNT_RATE;
    } else {
      appliedDiscountRate = itemLevelDiscount / totalBefore;
    }
  } else {
    appliedDiscountRate = itemLevelDiscount / totalBefore;
  }

  if (new Date().getDay() === EXTRA_DISCOUNT_DAY) {
    finalTotal *= 1 - EXTRA_DISCOUNT_RATE;
    appliedDiscountRate = Math.max(appliedDiscountRate, EXTRA_DISCOUNT_RATE);
  }

  return { finalTotal, appliedDiscountRate };
}
