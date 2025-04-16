import App from './app';

import { ItemStore } from './store/itemStore';
import { updateSelectOptions } from './components/itemSelect/updateSelectOptions';
import { renderCalcCart } from './components/cartTotal/renderCalcCart';
import { setBungaeSale } from './utils/sale/bungaeSale';
import { setSuggestSale } from './utils/sale/suggestSale';

function main() {
  const $root = document.getElementById('app');
  $root.appendChild(App());

  const { items, lastSelectedItem } = ItemStore.getInstance().getState();

  updateSelectOptions(items);
  renderCalcCart(items);

  setBungaeSale(items);
  setSuggestSale(items, lastSelectedItem);
}

main();
