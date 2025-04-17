import { getDiscountRate as basicGetDiscountRate } from '@/basic/logic';

export const getDiscountRate = (itemCount: number, totalAmount: number, subTotal: number): number => {
  return basicGetDiscountRate(itemCount, totalAmount, subTotal);
};