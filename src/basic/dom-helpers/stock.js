import { LOW_STOCK_THRESHOLD, STOCK_STATUS_ID } from '../constants';

function updateStockStatusElement(products) {
  const wrapper = document.querySelector(`#${STOCK_STATUS_ID}`);
  let message = '';
  products.forEach(item => {
    if (item.quantity < LOW_STOCK_THRESHOLD) {
      message += `${item.name}: ${item.quantity > 0 ? `재고 부족 (${item.quantity}개 남음)\n` : '품절\n'}`;
    }
  });
  wrapper.innerHTML = message;
}

export { updateStockStatusElement };
