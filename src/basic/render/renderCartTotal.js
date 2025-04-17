import { createDOM } from '../utils';
import { updateStockInformation, renderBonusPoints } from '../render';

/**
 * 장바구니 총액 렌더링 함수
 * @param {number} totalPrice - 총액
 * @param {number} discountRate - 할인율
 * @param {Array} products - 상품 목록
 */
export const renderCartTotal = (totalPrice, discountRate, products) => {
    const $sum = document.getElementById('cart-total');
    // 총액 텍스트 설정
    $sum.textContent = '총액: ' + Math.round(totalPrice) + '원';
    // 할인 적용 시 할인 텍스트 설정
    if (discountRate > 0) {
        const $totalPrice = createDOM('span', {
            className: 'text-green-500 ml-2',
            textContent: '(' + (discountRate * 100).toFixed(1) + '% 할인 적용)',
        });
        $sum.appendChild($totalPrice);
    }
    // 재고 정보 업데이트
    updateStockInformation(products);
    // 보너스 포인트 업데이트
    renderBonusPoints($sum, totalPrice);
};
