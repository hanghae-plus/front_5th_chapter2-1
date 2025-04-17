import { state } from '../store/index.js';
import { createElementFromHTML } from '../utils/dom-utils.js';

/**
 * 포인트 계산
 * @returns {number} 포인트
 */
const calculateLoyaltyPoints = () => {
  return Math.floor(state.totalAmount / 1000);
};

/**
 * 포인트 렌더링
 */
const renderLoyaltyPoints = () => {
  const loyaltyPoints = calculateLoyaltyPoints();
  const cartTotal = document.getElementById('cart-total');
  const pointsTag = () => {
    return createElementFromHTML(
      /* html */
      `<span id="loyalty-points" class="text-blue-500 ml-2">(포인트: ${loyaltyPoints})</span>`,
    );
  };
  cartTotal.append(pointsTag());
};

export { renderLoyaltyPoints };
