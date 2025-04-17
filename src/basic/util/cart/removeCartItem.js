import { CART_ITEM_QUANTITY_TEXT } from '../../constant';

/**
 * 장바구니 아이템 삭제 처리 함수
 * @param {HTMLElement} itemElem - 삭제할 아이템의 HTML 요소
 * @param {object} product - 해당 아이템의 제품 데이터
 */

export function removeCartItem(itemElem, product) {
  const removedQuantity = parseInt(
    itemElem.querySelector('span').textContent.split(CART_ITEM_QUANTITY_TEXT)[1],
  );
  product.stock += removedQuantity;
  itemElem.remove();
}
