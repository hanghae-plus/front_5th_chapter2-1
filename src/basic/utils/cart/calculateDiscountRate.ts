import type { CartItem } from "../../types";

export const calculateDiscountRate = (totalPrice: number, cartList: CartItem[]) => {
  let calculatedTotalPrice = 0;
  for (const cartItem of cartList) {
    let productDiscountRate = 0;

    if (cartItem.count >= 10) {
      if (cartItem.id === "p1") productDiscountRate = 0.1;
      else if (cartItem.id === "p2") productDiscountRate = 0.15;
      else if (cartItem.id === "p3") productDiscountRate = 0.2;
      else if (cartItem.id === "p4") productDiscountRate = 0.05;
      else if (cartItem.id === "p5") productDiscountRate = 0.25;
    }
    calculatedTotalPrice += cartItem.price * cartItem.count * (1 - productDiscountRate);
  }

  let discountRate = 0;

  if (totalPrice !== calculatedTotalPrice) {
    discountRate = (totalPrice - calculatedTotalPrice) / totalPrice;
  }

  const totalItemCount = cartList.reduce((acc, item) => acc + item.count, 0);

  let finalDiscountRate = Math.round(discountRate * 1000) / 1000;
  if (totalItemCount >= 30) {
    const bulkDiscountedPrice = totalPrice * (1 - 0.25);
    if (bulkDiscountedPrice > calculatedTotalPrice) {
      finalDiscountRate = 0.25;
    }
  }

  // 화요일(요일이 2이면) 추가 할인: 할인율이 최소 10%가 되도록 보장
  if (new Date().getDay() === 2) {
    finalDiscountRate = Math.max(finalDiscountRate, 0.1);
  }

  const finalDiscountPrice = totalPrice * (1 - finalDiscountRate);

  return { finalDiscountRate, finalDiscountPrice };
};
