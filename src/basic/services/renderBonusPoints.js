import { createElement } from '../utils/createElement';

/** 포인트 계산 및 출력 */
export const renderBonusPoints = (totalAmount) => {
    let $pointsTag = document.getElementById('loyalty-points');
    const $cartTotal = document.getElementById('cart-total');
    const bonusPoint = Math.floor(totalAmount / 1000);

    if (!$pointsTag) {
        const PointsTag = createElement('span', {
            id: 'loyalty-points',
            className: 'text-blue-500 ml-2',
        });

        $cartTotal.appendChild(PointsTag);
        $pointsTag = PointsTag;
    }

    $pointsTag.textContent = '(포인트: ' + bonusPoint + ')';
};
