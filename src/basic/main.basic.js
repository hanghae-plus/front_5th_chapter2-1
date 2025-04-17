import { DOM } from './elements';

import {
  handleAddProduct,
  handleCartItem,
  updateSelectOptions,
  calculateCart,
  flashSaleTimer,
  productSuggestionTimer,
} from './handlers';

function main() {
  const root = document.getElementById('app');

  DOM.initializeElements();

  updateSelectOptions();

  root.appendChild(DOM.buildDOMStructure());

  calculateCart();

  flashSaleTimer();
  productSuggestionTimer();
}

main();

DOM.getElement('addProductButton').addEventListener('click', handleAddProduct);
DOM.getElement('cartItemContainer').addEventListener('click', handleCartItem);
