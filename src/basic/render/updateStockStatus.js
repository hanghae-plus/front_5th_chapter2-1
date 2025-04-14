import { PRODUCT_LIST } from '../consts';
import { StockStatusContainerDOM } from '../ui';
export const updateStockStatus = () => {
  const stockStatusContainer = StockStatusContainerDOM.get();

  const infoMessage = PRODUCT_LIST.reduce((acc, item) => {
    if (item.quantity < 5) {
      const status =
        item.quantity > 0 ? `재고 부족 (${item.quantity}개 남음)` : '품절';
      return `${acc}${item.name}: ${status}\n`;
    }
    return acc;
  }, '');

  stockStatusContainer.textContent = infoMessage;
};
