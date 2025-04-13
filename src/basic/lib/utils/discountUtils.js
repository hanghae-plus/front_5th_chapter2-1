export function isTuesday() {
  return new Date().getDay() === 2;
}

function createDiscountSummary(discountedPrice, discountRate) {
  return {
    discountedPrice,
    discountRate,
  };
}

export function calculateDiscountForTuesday(totalPrice) {
  const discountRate = 0.1;
  const discountedPrice = totalPrice * (1 - discountRate);

  return createDiscountSummary(discountedPrice, discountRate);
}

export function calculateRegularDiscount(totalAmt, subTotal) {
  const discountRate = (subTotal - totalAmt) / subTotal;

  return createDiscountSummary(totalAmt, discountRate);
}

export function calculateBulkDiscount(discountedTotal, originalSubtotal) {
  let discRate = 0;

  const bulkDiscountAmount = discountedTotal * 0.25;
  const individualDiscountAmount = originalSubtotal - discountedTotal;

  if (bulkDiscountAmount > individualDiscountAmount) {
    discountedTotal = originalSubtotal * (1 - 0.25);
    discRate = 0.25;
  } else {
    discRate = (originalSubtotal - discountedTotal) / originalSubtotal;
  }

  return createDiscountSummary(discountedTotal, discRate);
}
