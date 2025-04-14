import { DISCOUNT_RATES } from "../configs/discounts";

export function isTuesday() {
  return new Date().getDay() === 2;
}

const createDiscountSummary = (discountedPrice, discountRate) => {
  return {
    discountedPrice,
    discountRate,
  };
};

export function calculateDiscountForTuesday(totalPrice) {
  const discountedPrice = totalPrice * (1 - DISCOUNT_RATES.TUESDAY);

  return createDiscountSummary(discountedPrice, DISCOUNT_RATES.TUESDAY);
}

export function calculateRegularDiscount(totalPrice, originalTotalPrice) {
  const discountRate = (originalTotalPrice - totalPrice) / originalTotalPrice;

  return createDiscountSummary(totalPrice, discountRate);
}

export function calculateBulkDiscount(totalPrice, originalTotalPrice) {
  const bulkDiscountAmount = totalPrice * DISCOUNT_RATES.BULK;
  const individualDiscountAmount = originalTotalPrice - totalPrice;

  totalPrice =
    bulkDiscountAmount > individualDiscountAmount
      ? originalTotalPrice * (1 - DISCOUNT_RATES.BULK)
      : originalTotalPrice - individualDiscountAmount;

  return createDiscountSummary(totalPrice, DISCOUNT_RATES.BULK);
}
