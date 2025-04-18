export function getDiscountRate(quantity: number, cartItemId: string): number {
  if (quantity >= 30) {
    return 0.25; // Bulk discount rate
  }

  if (quantity >= 10) {
    return getProductDiscountRate(cartItemId);
  }

  return 0;
}

export function getBulkDiscountRate(
  itemQuantity: number,
  totalPrice: number,
  subTotalPrice: number
): number {
  const minQuantityForBulkDiscount = 30;
  const twentyFivePercentDiscountRate = 0.25;

  if (itemQuantity >= minQuantityForBulkDiscount) {
    const bulkDiscountAmount = totalPrice * twentyFivePercentDiscountRate;
    const itemDiscountAmount = subTotalPrice - totalPrice;

    if (bulkDiscountAmount > itemDiscountAmount) {
      return twentyFivePercentDiscountRate;
    } else {
      return (subTotalPrice - totalPrice) / subTotalPrice;
    }
  } else {
    return (subTotalPrice - totalPrice) / subTotalPrice;
  }
}

export function getProductDiscountRate(productId: string): number {
  if (productId === 'p1') return 0.1;
  if (productId === 'p2') return 0.15;
  if (productId === 'p3') return 0.2;
  if (productId === 'p4') return 0.05;
  if (productId === 'p5') return 0.25;

  return 0;
}
