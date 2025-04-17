export const renderCartTotal = (cartTotalEl, totalAmount, discountRate) => {
    cartTotalEl.textContent = '총액: ' + Math.round(totalAmount) + '원';
    if (discountRate > 0) {
        const span = document.createElement('span');
        span.className = 'text-green-500 ml-2';
        span.textContent = '(' + (discountRate * 100).toFixed(1) + '% 할인 적용)';
        cartTotalEl.appendChild(span);
    }
}

/* 포인트 계산 */
export const renderBonusPoints = (cartTotalEl, bonusPoints, totalAmount) => {
    bonusPoints = Math.floor(totalAmount / 1000);
    let ptsTag = document.getElementById('loyalty-points');
    if (!ptsTag) {
        ptsTag = document.createElement('span');
        ptsTag.id = 'loyalty-points';
        ptsTag.className = 'text-blue-500 ml-2';
        cartTotalEl.appendChild(ptsTag);
    }
    ptsTag.textContent = '(포인트: ' + bonusPoints + ')';


}


/* 재고 상태 업데이트 */
export const updateStockInfo = (productList, stockStatusEl) => {
    let infoMsg = '';
    productList.forEach(function (item) {
        if (item.quantity < 5) {
            infoMsg += item.name + ': ' + (item.quantity > 0 ? '재고 부족 (' + item.quantity + '개 남음)' : '품절') + '\n';
        }
    });
    stockStatusEl.textContent = infoMsg;
}