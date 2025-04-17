import { BULK_DISCOUNT_THRESHOLD, DISCOUNT_RATES, DISCOUNT_RATES_BY_PRODUCT } from "@advanced/lib/configs";

interface DiscountResult {
  discountRate: number;
  discountedPrice: number;
}

export function isTuesday() {
  return new Date().getDay() === 2;
}

export function applyDiscount(itemCount: number, discountedTotal: number, originalSubtotal: number): DiscountResult {
  if (isTuesday()) {
    return calculateDiscountForTuesday(discountedTotal);
  }

  return itemCount < BULK_DISCOUNT_THRESHOLD
    ? calculateRegularDiscount(discountedTotal, originalSubtotal)
    : calculateBulkDiscount(discountedTotal, originalSubtotal);
}

export function calculateDiscountForTuesday(totalPrice: number): DiscountResult {
  const discountedPrice = totalPrice * (1 - DISCOUNT_RATES.tuesday);

  return {
    discountRate: DISCOUNT_RATES.tuesday,
    discountedPrice,
  };
}

export function calculateRegularDiscount(totalPrice: number, originalTotalPrice: number): DiscountResult {
  const discountRate = (originalTotalPrice - totalPrice) / originalTotalPrice;

  return {
    discountRate,
    discountedPrice: totalPrice,
  };
}

export function calculateBulkDiscount(totalPrice: number, originalTotalPrice: number): DiscountResult {
  const bulkDiscountAmount = totalPrice * DISCOUNT_RATES.bulk;
  const individualDiscountAmount = originalTotalPrice - totalPrice;

  const discountedPrice =
    bulkDiscountAmount > individualDiscountAmount
      ? originalTotalPrice * (1 - DISCOUNT_RATES.bulk)
      : originalTotalPrice - individualDiscountAmount;

  return {
    discountRate: DISCOUNT_RATES.bulk,
    discountedPrice,
  };
}

export function getDiscountRateByProduct(productId: string) {
  switch (productId) {
    case "p1":
      return DISCOUNT_RATES_BY_PRODUCT.p1;
    case "p2":
      return DISCOUNT_RATES_BY_PRODUCT.p2;
    case "p3":
      return DISCOUNT_RATES_BY_PRODUCT.p3;
    default:
      return 0;
  }
}
