import { PRODUCT_LIST } from './ProductList.constant.js';

export default function renderStock() {
  const stockInfo = document.createElement('div');
  stockInfo.id = 'renderStock-status';
  stockInfo.className = 'text-sm text-gray-500 mt-2';
  return stockInfo;
}

export function renderStockInfo() {
  const stockInfo = document.getElementById('renderStock-status');

  let infoMsg = '';

  PRODUCT_LIST.forEach((product) => {
    const { quantity, name } = product;
    if (product.quantity < 5) {
      infoMsg += `${name}: ${quantity > 0 ? `재고 부족 (${quantity}개 남음)` : '품절'}\n`;
    }
  });

  stockInfo.textContent = infoMsg;
}
