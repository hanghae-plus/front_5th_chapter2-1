import { createElement } from '../utils/createElement';
import { globalStore } from '../store/globalStore';

export const renderBonusPoints = () => {
  const { getState } = globalStore;
  const { totalAmount } = getState();

  const $paymentInfo = document.getElementById('cart-total');
  if (!$paymentInfo) return;

  const purchasePoints = Math.floor(totalAmount / 1000);

  let $pointTag = document.getElementById('loyalty-points');
  if (!$pointTag) {
    $pointTag = createElement('span', { id: 'loyalty-points', className: 'text-blue-500 ml-2' });
    $paymentInfo.appendChild($pointTag);
  }
  $pointTag.textContent = `(포인트: ${purchasePoints}) `;
};
