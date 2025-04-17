import { BULK_PURCHASE, TUESDAY_DISCOUNT } from '@/basic/consts';
import type { CartState } from '@/advanced/context/types';

interface DiscountRateParams {
  itemCount: number;
  totalAmount: number;
  subTotal: number;
  setCart: React.Dispatch<React.SetStateAction<CartState>>;
}

const calculateBulkDiscountRate = ({
  itemCount,
  totalAmount,
  subTotal,
  setCart
}: DiscountRateParams) => {
  if (itemCount < BULK_PURCHASE.THRESHOLD) {
    return (subTotal - totalAmount) / subTotal;
  }

  const bulkDiscount = totalAmount * BULK_PURCHASE.DISCOUNT_RATE;
  const itemDiscount = subTotal - totalAmount;

  if (bulkDiscount > itemDiscount) {
    setCart(prevCart => ({
      ...prevCart,
      totalAmount: subTotal * (1 - BULK_PURCHASE.DISCOUNT_RATE)
    }));
    return BULK_PURCHASE.DISCOUNT_RATE;
  }

  return itemDiscount / subTotal;
};

const applyTuesdayDiscount = (currentRate: number, totalAmount: number, setCart: DiscountRateParams['setCart']) => {
  const isTuesday = new Date().getDay() === TUESDAY_DISCOUNT.DAY;
  if (!isTuesday) return currentRate;

  const discounted = totalAmount * (1 - TUESDAY_DISCOUNT.DISCOUNT_RATE);
  setCart(prevCart => ({
    ...prevCart,
    totalAmount: discounted
  }));

  return Math.max(currentRate, TUESDAY_DISCOUNT.DISCOUNT_RATE);
};

export const getDiscountRate = (params: DiscountRateParams): number => {
  const rate = calculateBulkDiscountRate(params);
  return applyTuesdayDiscount(rate, params.totalAmount, params.setCart);
};