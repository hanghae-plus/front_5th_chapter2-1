import { createDOM } from '../utils';

/**
 * 보너스 포인트 렌더링 함수
 */
export const renderBonusPoints = ($sum, totalPrice) => {
    // 보너스 포인트 계산
    const bonusPoints = Math.floor(totalPrice / 1000);
    // 보너스 포인트 텍스트 설정
    let $bonusPointsTag = document.getElementById('loyalty-points');
    // 보너스 포인트 텍스트 존재 시
    if (!$bonusPointsTag) {
        $bonusPointsTag = createDOM('span', {
            id: 'loyalty-points',
            className: 'text-blue-500 ml-2',
            parent: $sum,
        });
    }
    // 보너스 포인트 텍스트 설정
    $bonusPointsTag.textContent = '(포인트: ' + bonusPoints + ')';
};
