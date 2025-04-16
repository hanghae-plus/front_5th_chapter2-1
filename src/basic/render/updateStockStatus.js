import { PRODUCT_LIST } from '../consts';
import { StockStatusContainerDOM } from '../ui';
import { formatStockStatusMessage } from '../utils';

export const updateStockStatus = () => {
  const stockStatusContainer = StockStatusContainerDOM.get();

  const infoMessage = PRODUCT_LIST.reduce((acc, item) => {
    return acc + formatStockStatusMessage(item);
  }, '');

  stockStatusContainer.textContent = infoMessage;
};
