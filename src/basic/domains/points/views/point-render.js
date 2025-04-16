import { calculateLoyaltyPoints } from '../utils';
import { createElement } from '../../../core/dom';
/**
 * 포인트 렌더링
 */
const renderLoyaltyPoints = () => {
  const loyaltyPoints = calculateLoyaltyPoints();
  const cartTotal = document.getElementById('cart-total');
  var pointsTag = createElement('span', {
    id: 'loyalty-points',
    className: 'text-blue-500 ml-2',
    textContent: '(포인트: ' + loyaltyPoints + ')',
  });

  cartTotal.appendChild(pointsTag);
};

export { renderLoyaltyPoints };
