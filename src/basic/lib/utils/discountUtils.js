import { BULK_DISCOUNT_THRESHOLD, DISCOUNT_RATES } from "../configs/discounts";

export function isTuesday() {
  return new Date().getDay() === 2;
}

export function applyDiscount(itemCount, discountedTotal, originalSubtotal) {
  if (isTuesday()) {
    return calculateDiscountForTuesday(discountedTotal);
  }

  return itemCount < BULK_DISCOUNT_THRESHOLD
    ? calculateRegularDiscount(discountedTotal, originalSubtotal)
    : calculateBulkDiscount(discountedTotal, originalSubtotal);
}

const createDiscountSummary = (discountedPrice, discountRate) => {
  return {
    discountRate,
    discountedPrice,
  };
};

export function calculateDiscountForTuesday(totalPrice) {
  const discountedPrice = totalPrice * (1 - DISCOUNT_RATES.tuesday);

  return createDiscountSummary(discountedPrice, DISCOUNT_RATES.tuesday);
}

export function calculateRegularDiscount(totalPrice, originalTotalPrice) {
  const discountRate = (originalTotalPrice - totalPrice) / originalTotalPrice;

  return createDiscountSummary(totalPrice, discountRate);
}

export function calculateBulkDiscount(totalPrice, originalTotalPrice) {
  const bulkDiscountAmount = totalPrice * DISCOUNT_RATES.bulk;
  const individualDiscountAmount = originalTotalPrice - totalPrice;

  const discountedPrice =
    bulkDiscountAmount > individualDiscountAmount
      ? originalTotalPrice * (1 - DISCOUNT_RATES.bulk)
      : originalTotalPrice - individualDiscountAmount;

  return createDiscountSummary(discountedPrice, DISCOUNT_RATES.bulk);
}

export function getDiscountRateByProduct(productId) {
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
  }
}
