import { CART_ITEM_QUANTITY_TEXT } from '../../constant';

/**
 * 장바구니 항목의 텍스트에서 수량 숫자만 파싱하여 반환하는 함수
 *
 * @param {string} text - 수량 정보가 포함된 문자열 (예: "상품명 - 1000원 수량:2")
 * @returns {number} - 파싱된 수량 숫자
 */

export function getItemQuantity(text) {
  return parseInt(text.split(CART_ITEM_QUANTITY_TEXT)[1]);
}
