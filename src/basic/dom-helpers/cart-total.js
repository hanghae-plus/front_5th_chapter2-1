import { LOYALTY_POINTS_ID, POINTS_RATIO, CART_TOTAL_ID } from '../constants';

function updateCartTotalElement(totalAmount, discountRate) {
  const loyaltyPoints = Math.floor(totalAmount / POINTS_RATIO);

  const cartTotalElement = document.querySelector(`#${CART_TOTAL_ID}`);

  cartTotalElement.textContent = `총액: ${totalAmount}원`;

  if (discountRate > 0) {
    updateDiscountRateElement(cartTotalElement, discountRate);
  }
  updateLoyaltyPointsElement(cartTotalElement, loyaltyPoints);
}

function updateLoyaltyPointsElement(cartTotalElement, loyaltyPoints) {
  let loyaltyPointsElement = document.querySelector(`#${LOYALTY_POINTS_ID}`);

  if (!loyaltyPointsElement) {
    loyaltyPointsElement = document.createElement('span');
    loyaltyPointsElement.id = LOYALTY_POINTS_ID;
    loyaltyPointsElement.className = 'text-blue-500 ml-2';
    cartTotalElement.appendChild(loyaltyPointsElement);
  }

  loyaltyPointsElement.textContent = `(포인트: ${loyaltyPoints})`;
}

function updateDiscountRateElement(cartTotalElement, discountRate) {
  const discountSpan = document.createElement('span');
  discountSpan.className = 'text-green-500 ml-2';
  discountSpan.textContent = `(${(discountRate * 100).toFixed(1)}% 할인 적용)`;
  cartTotalElement.appendChild(discountSpan);
}

export { updateCartTotalElement };
