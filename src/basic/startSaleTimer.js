import { PRODUCTS } from './productList.constant.js';
import renderProductSelectOptions from './renderProductSelectOptions.js';

const SALE_PROBABILITY = 0.3; // 30% 확률
const DISCOUNT_RATE = 0.2; // 20% 할인

export default function startSaleTimer({
  interval = 30000,
  delay = Math.random() * 10000,
}) {
  setTimeout(() => {
    setInterval(() => {
      let luckyItem = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
      if (Math.random() < SALE_PROBABILITY && luckyItem.quantity > 0) {
        luckyItem.price = Math.round(luckyItem.price * (1 - DISCOUNT_RATE));
        alert(
          `번개세일! ${luckyItem.name}이(가) ${DISCOUNT_RATE * 100}% 할인 중입니다!`
        );

        renderProductSelectOptions();
      }
    }, interval);
  }, delay);
}
