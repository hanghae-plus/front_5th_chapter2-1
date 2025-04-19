import { calculateCartTotal } from "../services/caculationService";

/**
 * 장바구니 아이템 목록 렌더링
 * @param {Object} state 현재 상태
 */
export const renderCartItems = (state) => {
  const { cartItems, products } = state;
  const cartElement = document.getElementById("cart-items");
  if (!cartElement) return;

  // 장바구니가 비어있는 경우
  if (Object.keys(cartItems).length === 0) {
    cartElement.innerHTML = `<div class="text-center text-gray-500 py-4">장바구니가 비어있습니다.</div>`;
    return;
  }

  let cartHTML = "";

  // 장바구니 아이템 목록 생성
  Object.entries(cartItems).forEach(([productId, quantity]) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const itemTotal = product.val * quantity;

    cartHTML += `
      <div class="py-4 flex justify-between items-center" data-product-id="${productId}">
        <div>
          <div class="font-medium">${product.name}</div>
          <div class="text-sm text-gray-500">${product.val}원 x ${quantity} = ${itemTotal}원</div>
        </div>
        <div class="flex items-center">
          <button class="cart-decrease px-2 py-1 bg-gray-200 rounded-l">-</button>
          <span class="px-2">${quantity}</span>
          <button class="cart-increase px-2 py-1 bg-gray-200 rounded-r">+</button>
          <button class="cart-remove ml-2 px-2 py-1 bg-red-500 text-white rounded">X</button>
        </div>
      </div>
    `;
  });

  cartElement.innerHTML = cartHTML;
};

/**
 * 장바구니 총액 정보 렌더링
 * @param {Object} state 현재 상태
 */
export const renderCartTotal = (state) => {
  const totalElement = document.getElementById("cart-total");
  if (!totalElement) return;

  const { totalAmount, discountRate, bonusPoints } = calculateCartTotal(state);

  totalElement.innerHTML = `총액: ${Math.round(totalAmount)}원`;

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
