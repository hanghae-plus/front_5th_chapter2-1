import { CART_ITEM_QUANTITY_TEXT } from '../../constant';

/**
 * 주어진 장바구니 아이템의 수량을 파싱하여 반환합니다.
 *
 * @param {HTMLElement} $cartItem - 수량을 포함하고 있는 장바구니 아이템의 HTML 요소
 * @returns {number} 아이템의 수량
 */

export function parseQuantity($cartItem) {
  return parseInt($cartItem.querySelector('span').textContent.split(CART_ITEM_QUANTITY_TEXT)[1]);
}
