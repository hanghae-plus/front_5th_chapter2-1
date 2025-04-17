import { PointTag } from '../components';

export const updateBonusPointsDisplay = (totalAmount) => {
  const bonusPts = Math.floor(totalAmount / 1000);
  const pointTag = PointTag();
  const isPointTag = document.getElementById('loyalty-points');
  if (!isPointTag) {
    document.getElementById('cart-total').appendChild(pointTag);
  }
  pointTag.textContent = '(포인트: ' + bonusPts + ')';
};
