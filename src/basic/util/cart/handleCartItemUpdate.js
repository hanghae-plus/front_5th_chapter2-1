import { CART_ITEM_QUANTITY_TEXT, CART_ITEM_ADD_ALERT } from '../../constant';

/**
 * 장바구니 아이템의 수량 변경 또는 삭제 처리를 담당하는 함수
 * @param {HTMLElement} itemElem - 처리할 아이템의 HTML 요소
 * @param {HTMLElement} clickedButton - 클릭된 타겟 요소 (수량 변경/삭제 버튼)
 * @param {object} product - 해당 아이템의 제품 데이터
 */

export function handleCartItemUpdate($cartItem, clickedButton, product) {
  const quantityChange = parseInt(clickedButton.dataset.change);
  const currentQty = parseInt(
    $cartItem.querySelector('span').textContent.split(CART_ITEM_QUANTITY_TEXT)[1],
  );
  const newQuantity = currentQty + quantityChange;
  const maxStock = product.stock + currentQty;

  if (newQuantity <= 0) {
    $cartItem.remove();
    product.stock -= quantityChange;
    return;
  }

  if (newQuantity > maxStock) {
    alert(CART_ITEM_ADD_ALERT);
    return;
  }

  $cartItem.querySelector('span').textContent =
    `${$cartItem.querySelector('span').textContent.split(CART_ITEM_QUANTITY_TEXT)[0]}${CART_ITEM_QUANTITY_TEXT}${newQuantity}`;
  product.stock -= quantityChange;
}
