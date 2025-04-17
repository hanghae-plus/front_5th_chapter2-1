import { state, domRefs } from '../store/state';

/**
 * 각 상품의 재고 상태를 화면 하단에 표시합니다.
 * 재고가 5개 미만인 경우 메시지를 보여줍니다.
 */
export default function updateStockStatus() {
    const { productList } = state;
    const { stockStatusElement } = domRefs;

    let stockMessage = '';

    productList.forEach((item) => {
        if (item.q < 5) {
            stockMessage += `${item.name}: ${item.q > 0 ? `재고 부족 (${item.q}개 남음)` : '품절'}\n`;
        }
    });

    stockStatusElement.textContent = stockMessage;
}
