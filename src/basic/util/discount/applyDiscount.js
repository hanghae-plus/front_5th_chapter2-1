import {
  BULK_DISCOUNT_THRESHOLD,
  BULK_DISCOUNT_RATE,
  EXTRA_DISCOUNT_DAY,
  EXTRA_DISCOUNT_RATE,
} from '../../constant';

/**
 * 총액에 대해 묶음 할인과 요일 추가 할인을 적용하여 최종 금액과 적용된 할인율을 반환합니다.
 *
 * @param {number} totalBefore - 할인 적용 전 전체 금액
 * @param {number} totalAfterItem - 개별 아이템 할인 적용 후의 전체 금액
 * @param {number} productCount - 장바구니에 담긴 전체 제품 수량
 * @returns {{ finalTotal: number, appliedDiscountRate: number }} - 최종 금액과 적용된 할인율
 */

export function applyDiscount(totalBefore, totalAfterItem, productCount) {
  let finalTotal = totalAfterItem;
  let appliedDiscountRate = 0;

  const itemLevelDiscount = totalBefore - totalAfterItem;

  if (productCount >= BULK_DISCOUNT_THRESHOLD) {
    const bulkDiscount = totalBefore * BULK_DISCOUNT_RATE;

    if (bulkDiscount > itemLevelDiscount) {
      finalTotal = totalBefore * (1 - BULK_DISCOUNT_RATE);
      appliedDiscountRate = BULK_DISCOUNT_RATE;
    } else {
      appliedDiscountRate = itemLevelDiscount / totalBefore;
    }
  } else {
    appliedDiscountRate = itemLevelDiscount / totalBefore;
  }

  if (new Date().getDay() === EXTRA_DISCOUNT_DAY) {
    finalTotal *= 1 - EXTRA_DISCOUNT_RATE;
    appliedDiscountRate = Math.max(appliedDiscountRate, EXTRA_DISCOUNT_RATE);
  }

  return { finalTotal, appliedDiscountRate };
}
