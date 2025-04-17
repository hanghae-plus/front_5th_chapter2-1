/** 재고 현황 출력 */
export function updateStockInfo(products) {
    const $stockInfo = document.getElementById('stock-status');
    let infoMessage = '';

    products.forEach(function (item) {
        if (item.quantity < 5) {
            infoMessage +=
                item.name + ': ' + (item.quantity > 0 ? '재고 부족 (' + item.quantity + '개 남음)' : '품절') + '\n';
        }
    });

    $stockInfo.textContent = infoMessage;
}
