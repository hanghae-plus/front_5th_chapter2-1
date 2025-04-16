import { products, discountRateMap } from "../constants.js";

let originalTotal = 0;
let finalTotal = 0;
let totalItemsInCart = 0;
let bonusPoints = 0;

export function calculateCart({ cartItemList, cartTotal, stockStatus }) {
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

  updateCartTotal(finalTotal, discountRate, cartTotal);
  updateStockStatus(stockStatus);
  updateLoyaltyPoints(cartTotal);
}

function updateCartTotal(finalTotal, discountRate, cartTotal) {
  cartTotal.textContent = `총액: ${Math.round(finalTotal)}원`;
  if (discountRate > 0) {
    const discountText = document.createElement("span");
    discountText.className = "text-green-500 ml-2";
    discountText.textContent = `(${(discountRate * 100).toFixed(1)}% 할인 적용)`;
    cartTotal.appendChild(discountText);
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

function getProductById(id) {
  return products.find((p) => p.id === id);
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

function updateLoyaltyPoints(cartTotal) {
  bonusPoints = Math.floor(finalTotal / 1000);
  let points = document.getElementById("loyalty-points");

  if (!points) {
    points = document.createElement("span");
    points.id = "loyalty-points";
    points.className = "text-blue-500 ml-2";
    cartTotal.appendChild(points);
  }
  points.textContent = "(포인트: " + bonusPoints + ")";
}

function updateStockStatus(stockStatus) {
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
  stockStatus.textContent = statusMessage;
}
