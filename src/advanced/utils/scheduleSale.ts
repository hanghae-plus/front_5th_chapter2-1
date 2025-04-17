import { defaultProducts } from '../constants/product';

const FLASH = {
  MAX_DELAY: 10_000,
  INTERVAL: 30_000,
  PROBABILITY: 0.3,
  DISCOUNT_RATE: 0.2,
};

const RECOMMEND = {
  MAX_DELAY: 20_000,
  INTERVAL: 60_000,
  DISCOUNT_RATE: 0.05,
};

export function scheduleFlashSale(onSale: () => void): () => void {
  const timeoutId = window.setTimeout(() => {
    const intervalId = window.setInterval(() => {
      const item = defaultProducts[Math.floor(Math.random() * defaultProducts.length)];
      
      if (Math.random() < FLASH.PROBABILITY && item.units > 0) {
        item.price = Math.round(item.price * (1 - FLASH.DISCOUNT_RATE));
        alert(`번개세일! ${item.name} ${FLASH.DISCOUNT_RATE * 100}% 할인 중!`);
        onSale();
      }
    }, FLASH.INTERVAL);

    return () => clearInterval(intervalId);
  }, Math.random() * FLASH.MAX_DELAY);

  return () => clearTimeout(timeoutId);
}

export function scheduleRecommendationSale(
  getLastId: () => string | null,
  onSale: () => void
): () => void {
  const timeoutId = window.setTimeout(() => {
    const intervalId = window.setInterval(() => {
      const lastId = getLastId();
      const suggestion = defaultProducts.find(
        (product) => product.id !== lastId && product.units > 0
      );
      if (suggestion) {
        suggestion.price = Math.round(suggestion.price * (1 - RECOMMEND.DISCOUNT_RATE));
        alert(`${suggestion.name} 추천세일! ${RECOMMEND.DISCOUNT_RATE * 100}% 할인중!`);
        onSale();
      }
    }, RECOMMEND.INTERVAL);

    return () => clearInterval(intervalId);
  }, Math.random() * RECOMMEND.MAX_DELAY);

  return () => clearTimeout(timeoutId);
}
