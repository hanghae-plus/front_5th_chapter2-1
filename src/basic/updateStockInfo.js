import { PRODUCTS } from './productList.constant.js';

export default function updateStockInfo() {
  let infoMsg = '';

  PRODUCTS.forEach((product) => {
    const { quantity, name } = product;
    if (product.quantity < 5) {
      infoMsg += `${name}: ${quantity > 0 ? `재고 부족 (${quantity}개 남음)` : '품절'}\n`;
    }
  });

  const stockInfo = document.getElementById('stock-status');
  stockInfo.textContent = infoMsg;
}
