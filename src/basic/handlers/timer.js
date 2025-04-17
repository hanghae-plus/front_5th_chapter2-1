import { MINUTE, SECOND } from '../lib';
import { CART, PRODUCT } from '../store';
import { updateSelectOptions } from './calculation';

const flashSaleInterval = () => {
  const luckyItem = PRODUCT.getRandomItem();
  const { name, id, quantity } = luckyItem;

  if (Math.random() < 0.3 && quantity > 0) {
    PRODUCT.applyDiscount(id, 0.2);

    alert(`번개세일! ${name}이(가) 20% 할인 중입니다!`);

    updateSelectOptions();
  }
};

const productSuggestionInterval = () => {
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
};

export const flashSaleTimer = () => setTimeout(() => setInterval(flashSaleInterval, 30 * SECOND), 10 * SECOND);

export const productSuggestionTimer = () =>
  setTimeout(() => setInterval(productSuggestionInterval, 1 * MINUTE), 20 * SECOND);
