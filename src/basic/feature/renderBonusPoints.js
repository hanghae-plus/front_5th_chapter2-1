import { state, domRefs } from '../store/state';

import { BONUS_POINT_UNIT } from '../constants';

export default function renderBonusPoints() {
    const { totalAmount } = state;
    const { totalAmountElement } = domRefs;

    state.bonusPoints = Math.floor(totalAmount / BONUS_POINT_UNIT);

    let pointsElement = document.getElementById('loyalty-points');

    if (!pointsElement) {
        pointsElement = document.createElement('span');
        pointsElement.id = 'loyalty-points';
        pointsElement.className = 'text-blue-500 ml-2';
        totalAmountElement.appendChild(pointsElement);
    }

    pointsElement.textContent = `(포인트: ${state.bonusPoints})`;
}
