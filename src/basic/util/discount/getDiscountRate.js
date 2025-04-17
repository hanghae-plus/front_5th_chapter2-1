import { DISCOUNT } from '../../constant';

/**
 * 제품 ID와 수량을 받아 할인율을 반환합니다.
 * @param {string} id - 제품 ID
 * @param {number} quantity - 구매 수량
 * @returns {number} 할인율 (0~1 사이)
 */

export function getDiscountRate(id, quantity) {
  if (quantity < 10) {
    return 0;
  }

  return DISCOUNT[id] || 0;
}
