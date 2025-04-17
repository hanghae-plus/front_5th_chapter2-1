import { CartItem } from '../../component';

/**
 * 새 제품을 장바구니에 추가하는 함수
 * - 주어진 제품 정보를 기반으로 장바구니 아이템 요소를 생성하고,
 *   해당 요소를 장바구니 목록에 추가합니다.
 * - 제품의 재고를 1 감소시킵니다.
 *
 * @param {object} product - 장바구니에 추가할 제품 데이터
 */

export function addNewCartItem(product) {
  const $cartItemElement = CartItem(product);
  document.getElementById('cart-items').appendChild($cartItemElement);
  product.stock--;
}
