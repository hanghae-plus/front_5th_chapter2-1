import { CartStore } from '../store';

export const getDiscountRate = (subTotal) => {
  const { itemCount, totalAmount } = CartStore.get();
  let discountRate = 0;

  if (itemCount >= 30) {
    const bulkDiscount = totalAmount * 0.25;
    const itemDiscount = subTotal - totalAmount;

    if (bulkDiscount > itemDiscount) {
      CartStore.set('totalAmount', subTotal * (1 - 0.25));
      discountRate = 0.25;
    } else {
      discountRate = (subTotal - totalAmount) / subTotal;
    }
  } else {
    discountRate = (subTotal - totalAmount) / subTotal;
  }

  if (new Date().getDay() === 2) {
    CartStore.set('totalAmount', CartStore.get('totalAmount') * 0.9);
    discountRate = Math.max(discountRate, 0.1);
  }

  return discountRate;
};
