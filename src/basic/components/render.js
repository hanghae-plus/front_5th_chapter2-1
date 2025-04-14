import { PRODUCT_LIST } from "../lib/configs/products";
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

export function renderNewCartItem(item) {
  const $cartItems = document.getElementById("cart-items");

  const newItem = CartItem({
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: 1,
  });
  $cartItems.appendChild(newItem);
}

export function renderBonusPts(bonusPoints) {
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

  PRODUCT_LIST.forEach((item) => {
    infoMsg += StockInfo({
      name: item.name,
      quantityLeft: item.stock,
    });
  });

  const $stockInfo = document.getElementById("stock-status");
  $stockInfo.textContent = infoMsg;
}

export function renderProductList() {
  const $productSelect = document.getElementById("product-select");
  $productSelect.innerHTML = "";

  PRODUCT_LIST.forEach((item) => {
    const selectItem = ProductSelectItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.stock,
    });
    $productSelect.appendChild(selectItem);
  });
}
