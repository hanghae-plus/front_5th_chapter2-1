import { PRODUCTS } from './productList.constant.js';

export default function updateStockInfo() {
  let infoMsg = '';
  PRODUCTS.forEach(function (item) {
    if (item.quantity < 5) {
      infoMsg +=
        item.name +
        ': ' +
        (item.quantity > 0
          ? '재고 부족 (' + item.quantity + '개 남음)'
          : '품절') +
        '\n';
    }
  });
  const stockInfo = document.getElementById('stock-status');
  stockInfo.textContent = infoMsg;
}
