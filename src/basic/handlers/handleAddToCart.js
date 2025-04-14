import { CartItem } from "@/basic/components";
import { STOCK_ALERT_TEXT } from "@/basic/config/messages";
import { $ } from "@/basic/lib";

/**
 * [Handler] 장바구니에 추가 핸들러
 * 추가 버튼을 클릭하면 장바구니에 아이템이 추가
 *
 * - 추가 버튼을 상품이 추가
 *   - 이미 있는 상품이라면 수량 증가
 *   - 새로운 아이템이라면 엘리먼트 추가
 * - 현재 재고가 없으면 추가되지 않음
 *
 * @param {Array<{}>} products
 * @returns {string | null}
 */
export const handleAddToCart = (products) => {
  const $productSelect = $("#product-select");
  const $cartItems = $("#cart-items");
  if (!$productSelect || !$cartItems) return null;
  const selectedItemId = $productSelect.value;
  const itemToAdd = products.find((p) => p.id === selectedItemId);

  if (!itemToAdd || itemToAdd.quantity <= 0) return null;

  const currentItem = $("#" + itemToAdd.id);
  if (currentItem) {
    // 이미 있는 상품
    const newQuantity =
      parseInt(currentItem.querySelector("span").textContent.split("x ")[1]) +
      1;
    if (newQuantity <= itemToAdd.quantity) {
      currentItem.querySelector("span").textContent =
        itemToAdd.name + " - " + itemToAdd.cost + "원 x " + newQuantity;
      itemToAdd.quantity -= 1;
    } else {
      alert(STOCK_ALERT_TEXT);
    }
  } else {
    // 장바구니에 새 상품 추가
    $cartItems.appendChild(CartItem({ ...itemToAdd }));
    itemToAdd.quantity -= 1;
  }
  return selectedItemId;
};
