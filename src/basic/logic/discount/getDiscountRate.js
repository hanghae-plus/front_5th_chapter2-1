import { CartStore } from '../../store';
import { BULK_PURCHASE, TUESDAY_DISCOUNT } from '../../consts';

const calculateBulkDiscountRate = (itemCount, totalAmount, subTotal) => {
  if (itemCount < BULK_PURCHASE.THRESHOLD)
    return (subTotal - totalAmount) / subTotal;

  const bulkDiscount = totalAmount * BULK_PURCHASE.DISCOUNT_RATE;
  const itemDiscount = subTotal - totalAmount;

  if (bulkDiscount > itemDiscount) {
    CartStore.set('totalAmount', subTotal * (1 - BULK_PURCHASE.DISCOUNT_RATE));
    return BULK_PURCHASE.DISCOUNT_RATE;
  }

  return itemDiscount / subTotal;
};

const applyTuesdayDiscount = (currentRate) => {
  const isTuesday = new Date().getDay() === TUESDAY_DISCOUNT.DAY;
  if (!isTuesday) return currentRate;

  const discounted =
    CartStore.get('totalAmount') * (1 - TUESDAY_DISCOUNT.DISCOUNT_RATE);
  CartStore.set('totalAmount', discounted);

  return Math.max(currentRate, TUESDAY_DISCOUNT.DISCOUNT_RATE);
};

export const getDiscountRate = (subTotal) => {
  const { itemCount, totalAmount } = CartStore.get();
  const rate = calculateBulkDiscountRate(itemCount, totalAmount, subTotal);

  return applyTuesdayDiscount(rate);
};
