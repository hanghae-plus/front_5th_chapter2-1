import { getStore } from "../store/store";

export const CartTotal = () => {
  return `<div id="cart-total" class="text-xl font-bold my-4">총액: 0원</div>`;
};

export const calculateCart = () => {
  const { cartItems, products, lastSelected } = getStore();
  let totalAmount = 0;
  let itemCount = 0;
  let subtotal = 0;

  // 각 상품별 합계 및 할인 계산
  Object.entries(cartItems).forEach(([productId, quantity]) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const itemTotal = product.val * quantity;
    itemCount += quantity;
    subtotal += itemTotal;

    let discount = 0;
    if (quantity >= 10) {
      switch (productId) {
        case "p1":
          discount = 0.1;
          break;
        case "p2":
          discount = 0.15;
          break;
        case "p3":
          discount = 0.2;
          break;
        case "p4":
          discount = 0.05;
          break;
        case "p5":
          discount = 0.25;
          break;
      }
    }

    totalAmount += itemTotal * (1 - discount);
  });

  // 대량 구매 할인 계산
  let discountRate = 0;
  if (itemCount >= 30) {
    const bulkDiscount = totalAmount * 0.25;
    const itemDiscount = subtotal - totalAmount;

    if (bulkDiscount > itemDiscount) {
      totalAmount = subtotal * (1 - 0.25);
      discountRate = 0.25;
    } else {
      discountRate = (subtotal - totalAmount) / subtotal;
    }
  } else {
    discountRate = (subtotal - totalAmount) / subtotal;
  }

  // 화요일 할인 적용
  if (new Date().getDay() === 2) {
    totalAmount *= 0.9;
    discountRate = Math.max(discountRate, 0.1);
  }

  // 포인트 계산
  const bonusPoints = Math.floor(totalAmount / 1000);

  // 화면 업데이트
  updateTotalDisplay(Math.round(totalAmount), discountRate, bonusPoints);

  return {
    totalAmount,
    itemCount,
    bonusPoints,
    discountRate
  };
};

const updateTotalDisplay = (totalAmount, discountRate, bonusPoints) => {
  const totalElement = document.getElementById("cart-total");
  if (!totalElement) return;

  totalElement.innerHTML = `총액: ${totalAmount}원`;

  if (discountRate > 0) {
    const discountSpan = document.createElement("span");
    discountSpan.className = "text-green-500 ml-2";
    discountSpan.textContent = `(${(discountRate * 100).toFixed(1)}% 할인 적용)`;
    totalElement.appendChild(discountSpan);
  }

  const pointsSpan = document.createElement("span");
  pointsSpan.id = "loyalty-points";
  pointsSpan.className = "text-blue-500 ml-2";
  pointsSpan.textContent = `(포인트: ${bonusPoints})`;
  totalElement.appendChild(pointsSpan);
};
