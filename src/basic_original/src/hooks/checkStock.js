import { store } from "../store/store"

// 재고확인
export function checkStock () {
    const products = store.products;
    let infoMsg = '';

    products.forEach((product) => {
        if(product.q < 5) {
            infoMsg += product.name + ': ' + (product.q > 0 ? '재고 부족 ('+product.q+'개 남음)' : '품절') + '\n';
        }
    });

    store.element.stockInfo.textContent = infoMsg;
}