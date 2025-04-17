import {
  BULK_DISCOUNT_RATE,
  BULK_DISCOUNT_START,
} from "../../consts/discounts";

const calculateBulkDiscount = (
  totalEa,
  totalPrice,
  discountedPrice,
  totalDiscountRate,
  noDiscountTotalPrice,
) => {
  if (totalEa >= BULK_DISCOUNT_START) {
    var bulkDiscountedPrice = totalPrice * BULK_DISCOUNT_RATE;

    if (bulkDiscountedPrice > discountedPrice) {
      totalPrice = noDiscountTotalPrice * (1 - BULK_DISCOUNT_RATE);
      totalDiscountRate = BULK_DISCOUNT_RATE;
    } else {
      totalDiscountRate = discountedPrice / noDiscountTotalPrice;
    }
  } else {
    totalDiscountRate = discountedPrice / noDiscountTotalPrice;
  }

  return { totalPrice, totalDiscountRate };
};

export default calculateBulkDiscount;
