import { CartStore } from '../store';
import { TotalAmountContainerDOM } from '../ui';

export const renderBonusPoints = () => {
  const totalAmountContainer = TotalAmountContainerDOM.get();
  const bonusPoints = Math.floor(CartStore.get('totalAmount') / 1000);

  const bonusPointsTag =
    document.getElementById('loyalty-points')
    ?? (() => {
      const el = document.createElement('span');
      el.id = 'loyalty-points';
      el.className = 'text-blue-500 ml-2';
      totalAmountContainer.appendChild(el);
      return el;
    })();

  bonusPointsTag.textContent = `(포인트: ${bonusPoints})`;
};
