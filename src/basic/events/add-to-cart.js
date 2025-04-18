import { calculateCart } from "../services/calculate-cart";
import { cartState } from "../store/state";
import { createCartItemElement } from "../ui/create-cart-element";

/** 선택된 상품을 찾기 */
const getSelectedProduct = () => {
  const $select = document.getElementById("product-select");
  const selectedId = $select.value;
  const product = cartState.products.find((product) => product.id === selectedId);
  return { product, selectedId };
};

/**
 * 장바구니 표시를 업데이트하여 새 항목을 추가하거나 기존 항목의 수량을 증가시키는 함수
 *
 * @param {Object} itemToAdd - 장바구니에 추가할 항목
 * @returns {boolean} - 항목이 성공적으로 추가되면 true, 재고가 부족하면 false 반환
 */

const updateCartDisplay = (itemToAdd) => {
  const $cartDisplay = document.getElementById("cart-items");
  const $item = document.getElementById(itemToAdd.id);

  if ($item) {
    const currentQuantity = parseInt($item.querySelector("span").textContent.split("x ")[1]);
    const newQuantity = currentQuantity + 1;

    if (newQuantity > itemToAdd.q) {
      alert("재고가 부족합니다.");
      return false;
    }

    $item.querySelector("span").textContent =
      `${itemToAdd.name} - ${itemToAdd.val}원 x ${newQuantity}`;
    itemToAdd.q--;
  } else {
    const newItem = createCartItemElement(itemToAdd);
    $cartDisplay.appendChild(newItem);
    itemToAdd.q--;
  }

  return true;
};

/**
 * 선택한 상품을 장바구니에 추가하고, 재고와 총액을 갱신
 *
 */

export const handleAddToCart = () => {
  const { product: itemToAdd, selectedId } = getSelectedProduct();

  if (!itemToAdd || itemToAdd.q <= 0) return;
  const updated = updateCartDisplay(itemToAdd);
  if (!updated) return;

  calculateCart();
  cartState.lastSelected = selectedId;
};
