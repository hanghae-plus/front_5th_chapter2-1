import { PRODUCTS } from './productList.constant.js';
import renderProductSelectOptions from './renderProductSelectOptions.js';
import { getLastSelectState } from './utils/lastSelectState.js';

const ADDITIONAL_DISCOUNT_RATE = 0.05;

export default function startRecommendationTimer({
  interval = 60000,
  delay = Math.random() * 20000,
}) {
  setTimeout(() => {
    setInterval(() => {
      let lastSel = getLastSelectState();
      if (lastSel) {
        let suggestedItem = PRODUCTS.find(
          (product) => product.id !== lastSel && product.quantity > 0
        );

        if (suggestedItem) {
          alert(
            `${suggestedItem.name}은(는) 어떠세요? 지금 구매하시면 ${ADDITIONAL_DISCOUNT_RATE * 100}% 추가 할인!`
          );

          suggestedItem.val = Math.round(
            suggestedItem.val * (1 - ADDITIONAL_DISCOUNT_RATE)
          );
          renderProductSelectOptions();
        }
      }
    }, interval);
  }, delay);
}
