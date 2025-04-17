import {state} from "../store/state.js";

export const updateStockInfo = () => {

    const stockInfoEl = state.elements.stockInfo;

    if (!stockInfoEl) {
        console.log('stockInfo 렌더링 전');
        return;
    }

    const lowStockProducts = state.products
        .filter(p => p.q < 5)
        .map(p => `${p.name}: ${p.q > 0 ? `재고 부족 (${p.q}개 남음)` : '품절'}`)
        .join('\n');

    stockInfoEl.textContent = lowStockProducts;
}