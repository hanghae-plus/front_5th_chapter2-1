import { Product } from '../types/product';
import { DISCOUNT_POLICIES } from '../constants/discount';
import { TuesdayDiscountResult } from '../types/discount';

export const calculateProductDiscount = (product: Product, quantity: number): number => {
  const discountRate =
    quantity >= DISCOUNT_POLICIES.PRODUCT.MIN_QUANTITY
      ? DISCOUNT_POLICIES.PRODUCT.RATES[product.id] || 0
      : 0;

  return product.price * quantity * (1 - discountRate);
};

const calculateBulkDiscount = (totalPrice: number): number => {
  return totalPrice * DISCOUNT_POLICIES.CART.BULK_RATE;
};

const calculateItemDiscount = (totalPriceBeforeDiscount: number, totalPrice: number): number => {
  return totalPriceBeforeDiscount - totalPrice;
};

export const calculateCartDiscount = (
  totalPrice: number,
  totalPriceBeforeDiscount: number,
  totalProductCount: number,
): number => {
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

export const calculateTuesdayDiscount = (
  price: number,
  currentDiscountRate: number,
): TuesdayDiscountResult => {
  if (new Date().getDay() === 2) {
    return {
      price: price * (1 - DISCOUNT_POLICIES.TUESDAY.RATE),
      discountRate: Math.max(currentDiscountRate, DISCOUNT_POLICIES.TUESDAY.RATE),
    };
  }

  return { price, discountRate: currentDiscountRate };
};
