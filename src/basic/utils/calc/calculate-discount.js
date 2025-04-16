const BULK_DISCOUNT_THRESHOLD = 30;
const BULK_DISCOUNT_RATE = 0.25;

const TUESDAY = 2;
const TUESDAY_DISCOUNT_RATE = 0.1;

/**
 * 상품 수량, 할인 적용 전후 금액을 기준으로 할인율을 계산.
 * 화요일에는 추가 할인 적용이 포함.
 *
 * @param {number} itemCount - 총 수량
 * @param {number} finalTotal - 할인 적용 후 금액
 * @param {number} originalTotal - 할인 적용 전 금액
 * @returns {{ discountRate: number }} - 최종 할인율
 */

export const calculateDiscount = (itemCount, finalTotal, originalTotal) => {
  let discountRate = 0;

  if (itemCount >= BULK_DISCOUNT_THRESHOLD) {
    const bulkDiscount = finalTotal * BULK_DISCOUNT_RATE;
    const itemDiscount = originalTotal - finalTotal;

    if (bulkDiscount > itemDiscount) {
      finalTotal = originalTotal * (1 - BULK_DISCOUNT_RATE);
      discountRate = BULK_DISCOUNT_RATE;
    } else {
      discountRate = (originalTotal - finalTotal) / originalTotal;
    }
  } else {
    discountRate = (originalTotal - finalTotal) / originalTotal;
  }

  if (new Date().getDay() === TUESDAY) {
    finalTotal *= 1 - TUESDAY_DISCOUNT_RATE;
    discountRate = Math.max(discountRate, TUESDAY_DISCOUNT_RATE);
  }

  return { discountRate };
};
