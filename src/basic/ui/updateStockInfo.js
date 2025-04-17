import { globalStore } from '../store/globalStore';

const setStockInfoText = (quantity) => {
  return quantity > 0 ? `재고 부족 ( ${quantity} 개 남음)` : '품절';
};

export function updateStockInfo() {
  const { prodList } = globalStore.getState();

  const soldOutInfo = document.getElementById('stock-status');
  if (!soldOutInfo) return;

  let infoMsg = '';
  prodList.forEach((item) => {
    if (item.quantity >= 5) return;
    infoMsg += `${item.name}: ${setStockInfoText(item.quantity)} \n`;
  });
  soldOutInfo.textContent = infoMsg;
}
