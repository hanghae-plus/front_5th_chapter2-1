import { PRODUCT_LIST } from '../consts';
import { StockStatusContainerDOM } from '../ui';

const getStockStatusMessage = (item) => {
  if (item.quantity >= 5) return '';
  const status =
    item.quantity > 0 ? `재고 부족 (${item.quantity}개 남음)` : '품절';
  return `${item.name}: ${status}\n`;
};

export const updateStockStatus = () => {
  const stockStatusContainer = StockStatusContainerDOM.get();

  const infoMessage = PRODUCT_LIST.reduce((acc, item) => {
    return acc + getStockStatusMessage(item);
  }, '');

  stockStatusContainer.textContent = infoMessage;
};
