import { BULK_DISCOUNT_THRESHOLD, DISCOUNT_RATES } from "@advanced/lib/configs/discounts";

interface DiscountSummary {
  discountRate: number;
  discountedPrice: number;
}

export function isTuesday() {
  return new Date().getDay() === 2;
}

export function applyDiscount(itemCount: number, discountedTotal: number, originalSubtotal: number): DiscountSummary {
  if (isTuesday()) {
    return calculateDiscountForTuesday(discountedTotal);
  }

  return itemCount < BULK_DISCOUNT_THRESHOLD
    ? calculateRegularDiscount(discountedTotal, originalSubtotal)
    : calculateBulkDiscount(discountedTotal, originalSubtotal);
}


export function calculateDiscountForTuesday(totalPrice: number): DiscountSummary {
  const discountedPrice = totalPrice * (1 - DISCOUNT_RATES.tuesday);

  return {
    discountRate: DISCOUNT_RATES.tuesday,
    discountedPrice,
  };
}

export function calculateRegularDiscount(totalPrice: number, originalTotalPrice: number): DiscountSummary {
  const discountRate = (originalTotalPrice - totalPrice) / originalTotalPrice;

  return {
    discountRate,
    discountedPrice: totalPrice,
  };
}

export function calculateBulkDiscount(totalPrice: number, originalTotalPrice: number): DiscountSummary {
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
      return 0.1;
    case "p2":
      return 0.15;
    case "p3":
      return 0.2;
    case "p4":
      return 0.05;
    case "p5":
      return 0.25;
    default:
      return 0;
  }
}
