import { updateSelectOptions } from '../../components/itemSelect/updateSelectOptions';
import { setSaleTimeout } from './setSaleTimeout.js';
import { CONSTANTS } from '../../constants/index.js';
import { textUtils } from '../textUtils.js';

export function setSuggestSale(items, lastSelectedItem) {
  setSaleTimeout(
    () => suggestSale(items, lastSelectedItem),
    CONSTANTS.SUGGEST_SALE_INTERVAL,
    CONSTANTS.SUGGEST_SALE_DELAY,
  );
}

function suggestSale(items, lastSelectedItem) {
  if (!lastSelectedItem) return;

  const suggestItem = items.find(
    (item) => item.id !== lastSelectedItem && item.quantity > 0,
  );

  if (suggestItem) {
    alert(textUtils.getSuggestItemMessage(suggestItem.name));
    suggestItem.price = Math.round(
      suggestItem.price * CONSTANTS.SUGGEST_ITEM_DISCOUNT_RATE,
    );
    updateSelectOptions(items);
  }
}
