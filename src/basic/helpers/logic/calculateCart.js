import { products, discountRateMap } from "../../constants.js";
import { getProductById } from "../utils.js";

let originalTotal = 0;
let finalTotal = 0;
let totalItemsInCart = 0;
let bonusPoints = 0;

export function calculateCart({ cartItemList, cartTotalEl, stockStatusEl }) {
  originalTotal = 0;
  finalTotal = 0;
  totalItemsInCart = 0;
  bonusPoints = 0;

  const cartItems = getCartItems(cartItemList);

  cartItems.forEach(({ id, units }) => {
    const product = getProductById(id);
    const amount = product.price * units;
    const discountRate = getItemDiscountRate(units, product.id);

    totalItemsInCart += units;
    originalTotal += amount;
    finalTotal += amount * (1 - discountRate);
  });

  const discountRate = getDiscountRate();

  updateCartTotal(finalTotal, discountRate, cartTotalEl);
  updateStockStatus(stockStatusEl);
  updateLoyaltyPoints(cartTotalEl);
}

function updateCartTotal(finalTotal, discountRate, cartTotalEl) {
  cartTotalEl.textContent = `총액: ${Math.round(finalTotal)}원`;
  if (discountRate > 0) {
    const discountText = document.createElement("span");
    discountText.className = "text-green-500 ml-2";
    discountText.textContent = `(${(discountRate * 100).toFixed(1)}% 할인 적용)`;
    cartTotalEl.appendChild(discountText);
  }
}

function getCartItems(cartItemList) {
  const cartItems = Array.from(cartItemList.children);

  return cartItems.map((el) => {
    const id = el.id;
    const units = parseInt(el.querySelector("span").textContent.split("x ")[1]);

    return { id, units };
  });
}

function getItemDiscountRate(units, productId) {
  if (units < 10) return 0;

  return discountRateMap[productId] ?? 0;
}

function getDiscountRate() {
  let rate = (originalTotal - finalTotal) / originalTotal;

  if (totalItemsInCart >= 30) {
    const maxBulkDiscountAmount = originalTotal * 0.25;
    if (maxBulkDiscountAmount > originalTotal - finalTotal) {
      finalTotal = originalTotal * (1 - 0.25);
      rate = 0.25;
    }
  }

  const isTuesday = new Date().getDay() === 2;
  if (isTuesday) {
    finalTotal *= 0.9;
    rate = Math.max(rate, 0.1);
  }
  return rate;
}

function updateLoyaltyPoints(cartTotalEl) {
  bonusPoints = Math.floor(finalTotal / 1000);
  let points = document.getElementById("loyalty-points");

  if (!points) {
    points = document.createElement("span");
    points.id = "loyalty-points";
    points.className = "text-blue-500 ml-2";
    cartTotalEl.appendChild(points);
  }
  points.textContent = "(포인트: " + bonusPoints + ")";
}

function updateStockStatus(stockStatusEl) {
  const limitUnits = 5;
  let statusMessage = "";

  const checkStockStatus = (item) => {
    if (item.units < limitUnits) {
      const stockMessage =
        item.units > 0 ? `재고 부족 (${item.units}개 남음)` : "품절";
      statusMessage += item.name + ": " + stockMessage + "\n";
    }
  };

  products.forEach(checkStockStatus);
  stockStatusEl.textContent = statusMessage;
}
