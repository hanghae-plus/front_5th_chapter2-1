import { store } from '../lib/store';
import { createElement } from '../lib/utils';

// 포인트 표시 업데이트. 없으면 새로 추가
export const updateBonusPoints = () => {
  const totalLabel = document.getElementById('cart-total');
  store.bonusPts = Math.floor(store.totalAmt / 1000);
  let loyaltyPointTag = document.getElementById('loyalty-points');
  if (!loyaltyPointTag) {
    loyaltyPointTag = createElement('span', {
      className: 'text-blue-500 ml-2',
      id: 'loyalty-points',
    });
    totalLabel.appendChild(loyaltyPointTag);
  }
  loyaltyPointTag.textContent = `(포인트: ${store.bonusPts})`;
};
