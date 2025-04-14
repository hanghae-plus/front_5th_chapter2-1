import { CONSTNANTS } from '../constants/index.js';

function getIdDiscountRate(itemCode) {
  const discountRatesById = {
    p1: 0.1,
    p2: 0.15,
    p3: 0.2,
    p4: 0.05,
    p5: 0.25,
  };

  return discountRatesById[itemCode] || 0;
}

function calcFinalDiscount(totalAmount, originalTotalAmount, itemCount) {
  let finalDiscountRate = 0; // 할인율
  let discountedTotalAmount = totalAmount; // 할인 적용된 총액

  const bulkDiscount = totalAmount * CONSTNANTS.BULK_DISCOUNT_RATE;
  const itemDiscount = originalTotalAmount - totalAmount;

  // 30개 이상 구매 시 25% 할인 적용
  if (
    itemCount >= CONSTNANTS.BULK_DISCOUNT_LIMIT &&
    bulkDiscount > itemDiscount
  ) {
    discountedTotalAmount =
      originalTotalAmount * (1 - CONSTNANTS.BULK_DISCOUNT_RATE);
    finalDiscountRate = CONSTNANTS.BULK_DISCOUNT_RATE;
  } else {
    finalDiscountRate =
      (originalTotalAmount - totalAmount) / originalTotalAmount;
  }

  // 특정 요일 할인 적용
  if (new Date().getDay() === CONSTNANTS.WEEKLY_DISCOUNT_DAY) {
    discountedTotalAmount *= 1 - CONSTNANTS.WEEKLY_DISCOUNT_RATE;
    finalDiscountRate = Math.max(
      finalDiscountRate,
      CONSTNANTS.WEEKLY_DISCOUNT_RATE,
    );
  }

  return { finalDiscountRate, discountedTotalAmount };
}

export const calcUtils = {
  getIdDiscountRate,
  calcFinalDiscount,
};
