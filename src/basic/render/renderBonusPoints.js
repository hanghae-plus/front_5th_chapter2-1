import { CartStore } from '../store';
import { TotalAmountContainerDOM } from '../ui';
import { DOM_IDS, STYLES } from '../consts';
import { createElement, calculateBonusPoints } from '../utils';

const getBonusPointsTag = (container) => {
  let pointsTag = document.getElementById(DOM_IDS.CART.POINTS);
  if (!pointsTag) {
    pointsTag = createElement('span', {
      id: DOM_IDS.CART.POINTS,
      className: STYLES.TEXT.BONUS,
    });
    container.appendChild(pointsTag);
  }
  return pointsTag;
};

export const renderBonusPoints = () => {
  const totalAmountContainer = TotalAmountContainerDOM.get();
  const totalAmount = CartStore.get('totalAmount');
  const bonusPoints = calculateBonusPoints(totalAmount);
  const bonusPointsTag = getBonusPointsTag(totalAmountContainer);

  bonusPointsTag.textContent = `(포인트: ${bonusPoints})`;
};
