import { BULK_PURCHASE, TUESDAY_DISCOUNT } from '@/basic/consts';

interface DiscountParams {
  itemCount: number;
  totalAmount: number;
  subTotal: number;
}

export const getDiscountRate = ({
  itemCount,
  totalAmount,
  subTotal
}: DiscountParams): number => {
  let discountRate = 0;

  const isTuesday = new Date().getDay() === TUESDAY_DISCOUNT.DAY;
  const eligibleForBulk = itemCount >= BULK_PURCHASE.THRESHOLD;

  const bulkDiscount = subTotal * BULK_PURCHASE.DISCOUNT_RATE;
  const itemDiscount = subTotal - totalAmount;

  if (eligibleForBulk && bulkDiscount > itemDiscount) {
    discountRate = BULK_PURCHASE.DISCOUNT_RATE;
  } else {
    discountRate = itemDiscount / subTotal;
  }

  if (isTuesday) {
    discountRate = Math.max(discountRate, TUESDAY_DISCOUNT.DISCOUNT_RATE);
  }

  return discountRate;
};