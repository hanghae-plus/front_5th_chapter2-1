import { CartStore } from '../store';
import { TotalAmountContainerDOM } from '../ui';

const calculateBonusPoints = (amount) => Math.floor(amount / 1000);

const getBonusPointsTag = (parentEl) => {
  const existing = document.getElementById('loyalty-points');
  if (existing) return existing;

  const element = document.createElement('span');

  element.id = 'loyalty-points';
  element.className = 'text-blue-500 ml-2';
  parentEl.appendChild(element);

  return element;
};

export const renderBonusPoints = () => {
  const totalAmountContainer = TotalAmountContainerDOM.get();
  const totalAmount = CartStore.get('totalAmount');
  const bonusPoints = calculateBonusPoints(totalAmount);
  const bonusPointsTag = getBonusPointsTag(totalAmountContainer);

  bonusPointsTag.textContent = `(포인트: ${bonusPoints})`;
};
