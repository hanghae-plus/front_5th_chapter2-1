import { products } from "../../constants.js";

const FLASH_SALE_DELAY_MAX = 10000;
const FLASH_SALE_INTERVAL = 30000;
const RECOMMENDATION_DELAY_MAX = 20000;
const RECOMMENDATION_INTERVAL = 60000;

const FLASH_SALE_PROBABILITY = 0.3;
const FLASH_SALE_DISCOUNT = 0.2;
const RECOMMENDATION_DISCOUNT = 0.05;

export function scheduleFlashSale({ onSale }) {
  const initialDelay = Math.random() * FLASH_SALE_DELAY_MAX;
  let intervalId;

  const timeoutId = setTimeout(() => {
    intervalId = setInterval(() => {
      triggerFlashSale(onSale);
    }, FLASH_SALE_INTERVAL);
  }, initialDelay);

  return () => {
    if (timeoutId) clearTimeout(timeoutId);
    if (intervalId) clearInterval(intervalId);
  };
}

export function scheduleRecommendationSale({ productId, onSale }) {
  const initialDelay = Math.random() * RECOMMENDATION_DELAY_MAX;
  let intervalId;

  const timeoutId = setTimeout(() => {
    intervalId = setInterval(() => {
      triggerRecommendationSale(productId(), onSale);
    }, RECOMMENDATION_INTERVAL);
  }, initialDelay);

  return () => {
    if (timeoutId) clearTimeout(timeoutId);
    if (intervalId) clearInterval(intervalId);
  };
}

function triggerFlashSale(onSale) {
  const item = getRandomProduct();
  if (Math.random() < FLASH_SALE_PROBABILITY && item.units > 0) {
    const newPrice = item.price * (1 - FLASH_SALE_DISCOUNT);
    item.price = Math.round(newPrice);

    alert(
      `번개세일! ${item.name}이(가) ${FLASH_SALE_DISCOUNT * 100}% 할인 중입니다!`,
    );
    onSale();
  }
}

function triggerRecommendationSale(lastSelectedId, onSale) {
  if (!lastSelectedId) return;

  const suggestion = products.find(
    (product) => product.id !== lastSelectedId && product.units > 0,
  );
  if (suggestion) {
    const newPrice = suggestion.price * (1 - RECOMMENDATION_DISCOUNT);
    suggestion.price = Math.round(newPrice);

    alert(
      `${suggestion.name}은(는) 어떠세요? 지금 구매하시면 ${RECOMMENDATION_DISCOUNT * 100}% 추가 할인!`,
    );
    onSale();
  }
}

function getRandomProduct() {
  const idx = Math.floor(Math.random() * products.length);
  return products[idx];
}
