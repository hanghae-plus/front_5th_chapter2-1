import { ProductStore } from '../store/productState';

const stockInfo = () => {
  // 요소 생성
  const stockInfoElement = document.createElement('div');
  stockInfoElement.id = 'stock-status';
  stockInfoElement.className = 'text-sm text-gray-500 mt-2';

  // 재고 업데이트에 대한 text 변경 함수
  const updateStockInfo = () => {
    let infoMsg = '';

    // ProductStore를 사용하여 모든 상품 정보 가져오기
    const allProducts = ProductStore.getAllProducts();

    // 재고가 적은 상품 필터링 및 메시지 생성
    allProducts.forEach(function (item) {
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
