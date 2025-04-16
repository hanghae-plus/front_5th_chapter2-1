import { DOM } from './elements';
import { MINUTE, SECOND } from './lib';
import { PRODUCT, CART } from './store';

import { handleAddProduct, handleCartItem, updateSelectOptions, calculateCart } from './handlers';

function main() {
  const root = document.getElementById('app');

  DOM.initializeElements();

  updateSelectOptions();

  root.appendChild(DOM.buildDOMStructure());

  calculateCart();

  setTimeout(() => {
    setInterval(() => {
      const luckyItem = PRODUCT.getRandomItem();

      if (Math.random() < 0.3 && luckyItem.quantity > 0) {
        PRODUCT.applyDiscount(luckyItem.id, 0.2);

        alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);

        updateSelectOptions();
      }
    }, 30 * SECOND);
  }, 10 * SECOND);

  setTimeout(() => {
    setInterval(() => {
      const lastSelectedProductId = CART.getLastSelectedProductId();

      if (lastSelectedProductId) {
        const suggest = PRODUCT.getSuggestedProduct(lastSelectedProductId);
        const { name, id } = suggest;

        if (suggest) {
          alert(`${name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);

          PRODUCT.applyDiscount(id, 0.05);

          updateSelectOptions();
        }
      }
    }, 1 * MINUTE);
  }, 20 * SECOND);
}

main();

DOM.getElement('addProductButton').addEventListener('click', handleAddProduct);
DOM.getElement('cartItemContainer').addEventListener('click', handleCartItem);
