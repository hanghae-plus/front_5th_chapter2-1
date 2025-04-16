import { PRODUCT_ITEM } from '../store/PRODUCT';

const stockInfo = () => {
  // 요소 생성
  const stockInfoElement = document.createElement('div');
  stockInfoElement.id = 'stock-status';
  stockInfoElement.className = 'text-sm text-gray-500 mt-2';

  // 재고 업데이트 함수
  const updateStockInfo = () => {
    let infoMsg = '';
    PRODUCT_ITEM.forEach(function (item) {
      if (item.stock < 5) {
        infoMsg += `${item.name}: ${item.stock > 0 ? `재고 부족 (${item.stock}개 남음)` : '품절'}\n`;
      }
    });
    stockInfoElement.textContent = infoMsg;
  };

  // 렌더링 함수
  const render = (targetEl) => {
    targetEl.appendChild(stockInfoElement);
  };

  return {
    element: stockInfoElement,
    render,
    updateStockInfo,
  };
};

export { stockInfo };
