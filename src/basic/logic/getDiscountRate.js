import { CartStore } from '../store';

const getBulkDiscountRate = (itemCount, totalAmount, subTotal) => {
  if (itemCount < 30) return (subTotal - totalAmount) / subTotal;

  const bulkDiscount = totalAmount * 0.25;
  const itemDiscount = subTotal - totalAmount;

  if (bulkDiscount > itemDiscount) {
    CartStore.set('totalAmount', subTotal * (1 - 0.25));
    return 0.25;
  }

  return itemDiscount / subTotal;
};

const applyTuesdayDiscount = (currentRate) => {
  const isTuesday = new Date().getDay() === 2;
  if (!isTuesday) return currentRate;

  const discounted = CartStore.get('totalAmount') * 0.9;
  CartStore.set('totalAmount', discounted);

  return Math.max(currentRate, 0.1);
};

export const getDiscountRate = (subTotal) => {
  const { itemCount, totalAmount } = CartStore.get();
  const rate = getBulkDiscountRate(itemCount, totalAmount, subTotal);

  return applyTuesdayDiscount(rate);
};
