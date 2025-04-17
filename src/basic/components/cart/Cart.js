import { renderStockStatus } from "../product";
import { renderCartItems } from "./CartItems";

import { cartStore } from "../../stores";
import { calculateCartTotal, renderBonusPoints } from "../../utils/cart";

const renderCartTotal = (totalElement) => {
  const { cartItems } = cartStore.state;
  const { discountRate, totalAmount } = calculateCartTotal(cartItems);

  totalElement.textContent = `총액: ${Math.round(totalAmount)}원`;

  if (discountRate > 0) {
    const discountSpan = document.createElement("span");
    discountSpan.className = "text-green-500 ml-2";
    discountSpan.textContent = `(${(discountRate * 100).toFixed(1)}% 할인 적용)`;
    totalElement.appendChild(discountSpan);
  }

  renderBonusPoints(totalElement, totalAmount);
};

export const renderCart = () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");
  const stockStatusElement = document.getElementById("stock-status");

  if (!cartItemsContainer || !cartTotalElement || !stockStatusElement) return;

  renderCartItems(cartItemsContainer);
  renderCartTotal(cartTotalElement);
  renderStockStatus(stockStatusElement);
};
