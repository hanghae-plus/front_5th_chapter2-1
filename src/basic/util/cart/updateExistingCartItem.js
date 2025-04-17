import { CART_ITEM_ADD_ALERT, CART_ITEM_QUANTITY_TEXT } from '../../constant';
import { getItemQuantity } from '../cart';

/**
 * 이미 장바구니에 존재하는 항목의 수량을 증가시키고, UI 및 재고를 업데이트하는 함수
 *
 * @param {HTMLElement} cartItemElement - 장바구니 항목의 DOM 요소
 * @param {object} product - 수량을 증가시킬 대상 제품 객체
 */

export function updateExistingCartItem(cartItemElement, product) {
  const quantitySpan = cartItemElement.querySelector('span');
  const currentQuantity = getItemQuantity(quantitySpan.textContent);
  const newQuantity = currentQuantity + 1;

  if (newQuantity > product.stock) {
    alert(CART_ITEM_ADD_ALERT);
    return;
  }

  quantitySpan.textContent = `${product.name} - ${product.price}원 ${CART_ITEM_QUANTITY_TEXT}${newQuantity}`;
  product.stock--;
}
