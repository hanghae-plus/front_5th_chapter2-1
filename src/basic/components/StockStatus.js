import { STOCK_STATUS_ID } from '../constants';
import { updateStockStatusElement } from '../dom-helpers';

const StockStatus = {
  init: store => {
    updateStockStatusElement(store.products);
  },
  render: () => {
    return `<div id="${STOCK_STATUS_ID}" class="text-sm text-gray-500 mt-2"></div>`;
  },
};

export default StockStatus;
