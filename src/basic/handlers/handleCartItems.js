import { EVENT_FRAGMENT } from "@/basic/config/fragments";
import { STOCK_ALERT_TEXT } from "@/basic/config/messages";
import { $ } from "@/basic/lib";

/**
 * [Handler] 수량 변경, 삭제 핸들러
 * 장바구니 내의 아이템의 수량을 조정하거나, 삭제
 *
 * - 장바구니 아이템의 버튼을 클릭
 * - 수량 변경 클릭 시
 *   - 증가 버튼은 수량 1개 증가
 *     - 재고가 없을 시 증가되지 않음
 *   - 감소 버튼은 수량 1개 감소
 *     - 변경된 수량이 0개이면 상품 제거
 * - 제거 버튼 클릭 시 제거
 *
 * @param {MouseEvent} event
 * @param {Array<{}>} products
 * @returns {void}
 *
 * @see EVENT_FRAGMENT
 */
export const handleCartItems = (target, products) => {
  // 수량 변경, 상품 삭제 이벤트 처리
  // const target = event.target;
  const isQuantityChange = target.classList.contains(
    EVENT_FRAGMENT.QUANTITY_CHANGE
  );
  const isRemoveItem = target.classList.contains(EVENT_FRAGMENT.REMOVE_ITEM);
  if (!isQuantityChange && !isRemoveItem) return;

  const productId = target.dataset.productId;
  const $item = $("#" + productId);
  const product = products.find((p) => p.id === productId);

  // 기존 수량 확인
  const $quantity = $item.querySelector("span");
  let [prefix, quantity] = $quantity.textContent.split("x ");
  quantity = parseInt(quantity);

  if (isQuantityChange) {
    // 상품 수량 변경
    const quantityChange = parseInt(target.dataset.change);
    const newQuantity = quantity + quantityChange;

    if (newQuantity > 0 && newQuantity <= product.quantity + quantity) {
      $quantity.textContent = prefix + "x " + newQuantity;
      product.quantity -= quantityChange;
    } else if (newQuantity <= 0) {
      $item.remove();
      product.quantity -= quantityChange;
    } else {
      alert(STOCK_ALERT_TEXT);
    }
  } else if (isRemoveItem) {
    // 상품 삭제
    const remainQuantity = quantity;
    product.quantity += remainQuantity;
    $item.remove();
  }
};
