import { state } from '../../../core/state';

/**
 * 재고 상태 메시지 생성
 * @param  {Array<{id: string, name: string, price: number, stock: number}>} products 상품 목록
 * @returns {string} 재고 상태 메시지
 */
const createStockStatusMessage = (products) => {
  let message = '';

  for (const product of products) {
    if (product.stock < 5) {
      message += `${product.name}: ${product.stock > 0 ? '재고 부족 (' + product.stock + '개 남음)' : '품절\n'}`;
    }
  }
  return message;
};

const updateStockStatus = () => {
  const stockStatus = document.getElementById('stock-status');
  stockStatus.textContent = createStockStatusMessage(state.products);
};

export { updateStockStatus };
