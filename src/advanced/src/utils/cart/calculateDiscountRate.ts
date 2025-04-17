import { DISCOUNT_POLICY } from "../../constants";
import type { CartItem } from "../../types";

export const calculateDiscountRate = (totalPrice: number, cartList: CartItem[]) => {
  let calculatedTotalPrice = 0;
  for (const cartItem of cartList) {
    let productDiscountRate = 0;
    if (cartItem.count >= DISCOUNT_POLICY.PRODUCT.MIN_COUNT) {
      productDiscountRate = DISCOUNT_POLICY.PRODUCT.RATE[cartItem.id as keyof typeof DISCOUNT_POLICY.PRODUCT.RATE];
    }
    calculatedTotalPrice += cartItem.price * cartItem.count * (1 - productDiscountRate);
  }

  let discountRate = 0;

  if (totalPrice !== calculatedTotalPrice) {
    discountRate = (totalPrice - calculatedTotalPrice) / totalPrice;
  }

  const totalItemCount = cartList.reduce((acc, item) => acc + item.count, 0);

  let finalDiscountRate = Math.round(discountRate * 1000) / 1000;
  if (totalItemCount >= DISCOUNT_POLICY.BULK.MIN_COUNT) {
    const bulkDiscountedPrice = totalPrice * (1 - DISCOUNT_POLICY.BULK.RATE);
    if (bulkDiscountedPrice > calculatedTotalPrice) {
      finalDiscountRate = DISCOUNT_POLICY.BULK.RATE;
    }
  }

  // 화요일(요일이 2이면) 추가 할인: 할인율이 최소 10%가 되도록 보장
  if (new Date().getDay() === DISCOUNT_POLICY.DATE_SALE.DAY) {
    finalDiscountRate = Math.max(finalDiscountRate, DISCOUNT_POLICY.DATE_SALE.RATE);
  }

  const finalDiscountPrice = totalPrice * (1 - finalDiscountRate);

  return { finalDiscountRate, finalDiscountPrice };
};
