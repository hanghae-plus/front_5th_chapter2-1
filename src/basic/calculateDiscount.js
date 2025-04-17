const DISCOUNT_POLICIES = {
  PRODUCT: {
    RATES: {
      p1: 0.1,
      p2: 0.15,
      p3: 0.2,
      p4: 0.05,
      p5: 0.25,
    },
    MIN_QUANTITY: 10,
  },
  CART: {
    BULK_THRESHOLD: 30,
    BULK_RATE: 0.25,
  },
  TUESDAY: {
    RATE: 0.1,
  },
};

export const calculateProductDiscount = (product, quantity) => {
  const discountRate =
    quantity >= DISCOUNT_POLICIES.PRODUCT.MIN_QUANTITY
      ? DISCOUNT_POLICIES.PRODUCT.RATES[product.id] || 0
      : 0;

  return product.price * quantity * (1 - discountRate);
};

const calculateBulkDiscount = (totalPrice) => {
  return totalPrice * DISCOUNT_POLICIES.CART.BULK_RATE;
};

const calculateItemDiscount = (totalPriceBeforeDiscount, totalPrice) => {
  return totalPriceBeforeDiscount - totalPrice;
};

export const calculateCartDiscount = (totalPrice, totalPriceBeforeDiscount, totalProductCount) => {
  if (totalProductCount < DISCOUNT_POLICIES.CART.BULK_THRESHOLD) {
    return (totalPriceBeforeDiscount - totalPrice) / totalPriceBeforeDiscount;
  }

  const bulkDiscount = calculateBulkDiscount(totalPrice);
  const itemDiscount = calculateItemDiscount(totalPriceBeforeDiscount, totalPrice);

  if (bulkDiscount > itemDiscount) {
    return DISCOUNT_POLICIES.CART.BULK_RATE;
  }

  return itemDiscount / totalPriceBeforeDiscount;
};

export const calculateTuesdayDiscount = (price, currentDiscountRate) => {
  if (new Date().getDay() === 2) {
    return {
      price: price * (1 - DISCOUNT_POLICIES.TUESDAY.RATE),
      discountRate: Math.max(currentDiscountRate, DISCOUNT_POLICIES.TUESDAY.RATE),
    };
  }

  return { price, discountRate: currentDiscountRate };
};
