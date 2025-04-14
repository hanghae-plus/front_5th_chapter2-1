import { CONSTNANTS } from '../../constants';
import { textUtils } from '../../utils/textUtils';

export function updateStockInfoText(items) {
  const infoMessage = items.reduce((message, item) => {
    if (item.quantity < CONSTNANTS.STOCK_WARNING_LIMIT) {
      return message + textUtils.getStockWarningText(item.name, item.quantity);
    }
    return message;
  });

  return infoMessage;
}
