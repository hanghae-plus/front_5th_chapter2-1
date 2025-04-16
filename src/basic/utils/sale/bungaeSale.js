import { updateSelectOptions } from '../../components/itemSelect/updateSelectOptions';
import { setSaleTimeout } from './setSaleTimeout';
import { CONSTANTS } from '../../constants';
import { textUtils } from '../textUtils';

export function setBungaeSale(items) {
  setSaleTimeout(
    () => bungaeSale(items),
    CONSTANTS.BUNGAE_SALE_INTERVAL,
    CONSTANTS.BUNGAE_SALE_DELAY,
  );
}

function bungaeSale(items) {
  const saleItem = items[Math.floor(Math.random() * items.length)];

  if (
    Math.random() < CONSTANTS.RANDOM_BUNGAE_SALE_RATE &&
    saleItem.quantity > 0
  ) {
    saleItem.price = Math.round(
      saleItem.price * CONSTANTS.BUNGAE_SALE_DISCOUNT_RATE,
    );
    alert(textUtils.getBungaeSaleMessage(saleItem.name));
    updateSelectOptions(items);
  }
}
