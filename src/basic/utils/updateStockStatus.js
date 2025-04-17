import { PRODUCT_LIST } from '../constant';

export const updateStockStatus = () => {
  let infoMsg = '';
  PRODUCT_LIST.forEach(function (item) {
    if (item.quantity < 5) {
      infoMsg +=
        item.name +
        ': ' +
        (item.quantity > 0 ? '재고 부족 (' + item.quantity + '개 남음)' : '품절') +
        '\n';
    }
  });
  document.getElementById('stock-status').textContent = infoMsg;
};
