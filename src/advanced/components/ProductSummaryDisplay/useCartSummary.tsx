import { useMemo } from 'react';
import { useCartControls } from '../../context';
import { DISCOUNT_RATE, PRODUCT_LIST } from '../../constant';

export const useCartSummary = () => {
  const { cart } = useCartControls();

  return useMemo(() => {
    let subTotal = 0;
    let totalAmount = 0;
    let itemCount = 0;

    cart.forEach((item) => {
      const product = PRODUCT_LIST.find((p) => p.id === item.id);
      if (!product) return;

      const itemSubTotal = product.price * item.currentQuantity;
      const discountRate = item.currentQuantity >= 10 ? (DISCOUNT_RATE[product.id] ?? 0) : 0;
      const discountedTotal = itemSubTotal * (1 - discountRate);

      subTotal += itemSubTotal;
      totalAmount += discountedTotal;
      itemCount += item.currentQuantity;
    });

    const itemDiscountRate = subTotal === 0 ? 0 : (subTotal - totalAmount) / subTotal;
    const bulkDiscount = itemCount >= 30 ? 0.25 : 0;
    const isTuesday = new Date().getDay() === 2;
    const tuesdayDiscount = isTuesday ? 0.1 : 0;

    const discount = Math.max(itemDiscountRate, bulkDiscount, tuesdayDiscount);
    const amount = Math.round(subTotal * (1 - discount));
    const point = Math.floor(amount / 1000);

    return {
      amount,
      discount,
      point,
    };
  }, [cart]);
};
