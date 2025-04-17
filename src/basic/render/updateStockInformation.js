/**
 * 재고 정보 업데이트 함수
 */
export const updateStockInformation = (products) => {
    const $stockInformation = document.getElementById('stock-status');
    let informationMessage = '';
    products.forEach(function (item) {
        // 재고 부족 시 재고 정보 추가
        if (item.quantity < 5) {
            // 재고 정보 추가
            informationMessage +=
                item.name + ': ' + (item.quantity > 0 ? '재고 부족 (' + item.quantity + '개 남음)' : '품절') + '\n';
        }
    });
    // 재고 정보 업데이트
    $stockInformation.textContent = informationMessage;
};
