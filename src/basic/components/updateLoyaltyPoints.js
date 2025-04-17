import { createElement } from '../utils/index.js';

// 포인트 적립 기능
export const applyLoyaltyPoints = (total, totalAmount) => {
  const bonusPoints = Math.floor(totalAmount / 1000);

  let pointsTag = document.querySelector('#loyalty-points');

  if (!pointsTag) {
    pointsTag = createElement('span', {
      id: 'loyalty-points',
      className: 'text-blue-500 ml-2',
    });

    total.appendChild(pointsTag);
  }

  pointsTag.textContent = `(포인트: ${bonusPoints})`;
};
