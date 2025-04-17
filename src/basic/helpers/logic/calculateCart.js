import { products, discountRateMap } from "../../constants.js";
import { getProductById, getQuantity } from "../utils.js";

const BULK_DISCOUNT_RATE = 0.25;
const TUESDAY_EXTRA_DISCOUNT = 0.1;
const STOCK_WARNING_THRESHOLD = 5;

export function calculateCart({ cartItemList, cartTotalEl, stockStatusEl }) {
  let originalTotal = 0;
  let discountedTotal = 0;
  let totalQuantity = 0;

  const cartItems = getCartItems(cartItemList);
  for (const { id, quantity } of cartItems) {
    const product = getProductById(id);
    if (!product) continue;

    const lineAmount = product.price * quantity;
    const itemDiscountRate = getItemDiscountRate(quantity, id);

    totalQuantity += quantity;
    originalTotal += lineAmount;
    discountedTotal += lineAmount * (1 - itemDiscountRate);
  }

  const bulkResult = applyBulkDiscount(
    originalTotal,
    discountedTotal,
    totalQuantity,
  );
  let finalTotal = bulkResult.discountedTotal;
  let discountRate = bulkResult.discountRate;

  if (isTuesday()) {
    finalTotal = Math.round(finalTotal * (1 - TUESDAY_EXTRA_DISCOUNT));
    discountRate = Math.max(discountRate, TUESDAY_EXTRA_DISCOUNT);
  }

  updateCartTotalTemplate(finalTotal, discountRate, cartTotalEl);
  updateStockStatusTemplate(stockStatusEl);
  updateLoyaltyPointsTemplate(cartTotalEl, finalTotal);
}

function getCartItems(cartItemList) {
  return Array.from(cartItemList.children).map((itemEl) => {
    const id = itemEl.id;
    const quantity = getQuantity(itemEl);
    return { id, quantity };
  });
}

function getItemDiscountRate(quantity, productId) {
  return quantity >= 10 ? discountRateMap[productId] || 0 : 0;
}

/** 대량 구매 할인 적용 */
function applyBulkDiscount(originalTotal, currentTotal, totalQuantity) {
  let discountedTotal = currentTotal;
  let discountRate =
    originalTotal > 0 ? (originalTotal - currentTotal) / originalTotal : 0;

  if (totalQuantity >= 30) {
    const maxBulkDiscount = originalTotal * BULK_DISCOUNT_RATE;
    if (maxBulkDiscount > originalTotal - currentTotal) {
      discountedTotal = originalTotal * (1 - BULK_DISCOUNT_RATE);
      discountRate = BULK_DISCOUNT_RATE;
    }
  }

  return { discountedTotal: Math.round(discountedTotal), discountRate };
}

function isTuesday() {
  return new Date().getDay() === 2;
}

function updateCartTotalTemplate(finalTotal, discountRate, cartTotalEl) {
  cartTotalEl.textContent = `총액: ${Math.round(finalTotal)}원`;
  if (discountRate > 0) {
    const span = document.createElement("span");
    span.className = "text-green-500 ml-2";
    span.textContent = `(${(discountRate * 100).toFixed(1)}% 할인 적용)`;
    cartTotalEl.appendChild(span);
  }
}

function updateLoyaltyPointsTemplate(cartTotalEl, finalTotal) {
  const points = Math.floor(finalTotal / 1000);
  let el = document.getElementById("loyalty-points");
  if (!el) {
    el = document.createElement("span");
    el.id = "loyalty-points";
    el.className = "text-blue-500 ml-2";
    cartTotalEl.appendChild(el);
  }
  el.textContent = `(포인트: ${points})`;
}

function updateStockStatusTemplate(stockStatusEl) {
  let statusText = "";
  for (const product of products) {
    if (product.units < STOCK_WARNING_THRESHOLD) {
      const msg =
        product.units > 0 ? `재고 부족 (${product.units}개 남음)` : "품절";
      statusText += `${product.name}: ${msg}\n`;
    }
  }
  stockStatusEl.textContent = statusText;
}
