// 📁 useCartCalculations.ts
import { useMemo } from 'react';
import { calculation } from '@/advanced/logic/cart';
import { BULK_PURCHASE, TUESDAY_DISCOUNT } from '@/basic/consts';
import type { CartItem } from '@/advanced/types';

export const useCartCalculations = (cartItems: CartItem[]) => {
  return useMemo(() => {
    const { itemCount, subTotal, totalAmount: rawTotal } = calculation(cartItems);

    let discountRate = 0;
    let totalAmount = rawTotal;

    const isTuesday = new Date().getDay() === TUESDAY_DISCOUNT.DAY;
    const eligibleForBulk = itemCount >= BULK_PURCHASE.THRESHOLD;

    const bulkDiscount = rawTotal * BULK_PURCHASE.DISCOUNT_RATE;
    const itemDiscount = subTotal - rawTotal;

    if (eligibleForBulk && bulkDiscount > itemDiscount) {
      totalAmount = subTotal * (1 - BULK_PURCHASE.DISCOUNT_RATE);
      discountRate = BULK_PURCHASE.DISCOUNT_RATE;
    } else {
      discountRate = itemDiscount / subTotal;
    }

    if (isTuesday) {
      const tuesdayTotal = totalAmount * (1 - TUESDAY_DISCOUNT.DISCOUNT_RATE);
      totalAmount = tuesdayTotal;
      discountRate = Math.max(discountRate, TUESDAY_DISCOUNT.DISCOUNT_RATE);
    }

    return {
      itemCount,
      subTotal,
      totalAmount,
      discountRate,
    };
  }, [cartItems]);
};