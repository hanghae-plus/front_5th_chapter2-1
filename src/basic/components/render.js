import { PRODUCT_INVENTORY } from "../lib/configs/products";
import { CartItem } from "./CartItem";
import { ProductSelectItem } from "./ProductSelectItem";
import { StockInfo } from "./StockInfo";

export function renderTotalPrice(totalPrice) {
  const $cartTotal = document.getElementById("cart-total");

  $cartTotal.textContent = `총액: ${Math.round(totalPrice)}원`;
}

export function renderDiscountRate(discountRate) {
  const $cartTotal = document.getElementById("cart-total");

  if (discountRate > 0) {
    const discountSpan = document.createElement("span");
    discountSpan.classList.add("text-green-500", "ml-2");
    discountSpan.textContent = `(${(discountRate * 100).toFixed(1)}% 할인 적용)`;
    $cartTotal.appendChild(discountSpan);
  }
}

/**
 * 장바구니 아이템 렌더링
 * 1. 장바구니 아이템 렌더링 시 기존 아이템이 있으면 quantity 업데이트
 * 2. 기존 아이템이 없으면 새로 추가
 * 3. 장바구니 아이템에는 있는데 items에는 없는 아이템이 있으면 삭제
 * @description 장바구니 아이템 렌더링 시 전체 초기화하게 되면 quantity change 버튼의 참조가 변경되어 테스트 살패
 * @param {Array} updatedItems - 업데이트된 장바구니 아이템 배열
 */
export function renderCartItems(updatedItems) {
  const $cartItemsContainer = document.getElementById("cart-items");
  const $cartItems = Array.from($cartItemsContainer.children);

  const itemsToRemoveFromCart = $cartItems.filter(
    (child) => !updatedItems.some((item) => item.id === child.id),
  );
  itemsToRemoveFromCart.forEach((item) =>
    $cartItemsContainer.removeChild(item),
  );

  updatedItems.forEach((item) => {
    const $item = $cartItems.find((child) => child.id === item.id);

    if (!$item) {
      $cartItemsContainer.appendChild(
        CartItem({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        }),
      );
      return;
    }

    $item.querySelector("span").textContent =
      `${item.name} - ${item.price}원 x ${item.quantity}`;
  });
}

export function renderBonusPoints(bonusPoints) {
  let $pointsTag = document.getElementById("loyalty-points");

  if (!$pointsTag) {
    $pointsTag = document.createElement("span");
    $pointsTag.id = "loyalty-points";
    $pointsTag.className = "text-blue-500 ml-2";

    const sum = document.getElementById("cart-total");
    sum.appendChild($pointsTag);
  }

  $pointsTag.textContent = "(포인트: " + bonusPoints + ")";
}

export function renderStockInfo() {
  let infoMsg = "";

  PRODUCT_INVENTORY.forEach((item) => {
    infoMsg += StockInfo({
      name: item.name,
      quantityLeft: item.stock,
    });
  });

  const $stockInfo = document.getElementById("stock-status");
  $stockInfo.textContent = infoMsg;
}

export function renderProductInventory() {
  const $productSelect = document.getElementById("product-select");
  $productSelect.innerHTML = "";

  PRODUCT_INVENTORY.forEach((item) => {
    const selectItem = ProductSelectItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.stock,
    });
    $productSelect.appendChild(selectItem);
  });
}
