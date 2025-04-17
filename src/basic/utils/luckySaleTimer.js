import { PRODUCT_LIST } from '../components/product/ProductList.constant.js';

const SALE_PROBABILITY = 0.3; // 30% 확률
const DISCOUNT_RATE = 0.2; // 20% 할인

function applyLuckySaleDiscount(item) {
  item.price = Math.round(item.price * (1 - DISCOUNT_RATE));
}

export default function luckySaleTimer({
  interval = 30000,
  delay = Math.random() * 10000,
}) {
  const randomIndex = Math.floor(Math.random() * PRODUCT_LIST.length);
  const luckyItem = PRODUCT_LIST[randomIndex];
  const isLuckySale = Math.random() < SALE_PROBABILITY;

  setTimeout(() => {
    setInterval(() => {
      if (isLuckySale && luckyItem.quantity > 0) {
        alert(
          `번개세일! ${luckyItem.name}이(가) ${DISCOUNT_RATE * 100}% 할인 중입니다!`
        );

        // 선정된 상품에 할인가 적용
        applyLuckySaleDiscount(luckyItem);
      }
    }, interval);
  }, delay);
}
