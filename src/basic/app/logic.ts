import { getLastSelValue } from '../store/lastSel.js';
import {
  findProductWithCondition,
  getProductList,
  Product,
} from '../../shared/store/productList.js';

function getRandomProduct() {
  const prodList = getProductList();
  const index = Math.floor(Math.random() * prodList.length);

  return { ...prodList[index] };
}

export function setSaleAlert() {
  const INTERVAL_TIME = 30000;
  const TIME_OUT = Math.random() * 10000;

  setTimeout(() => {
    setInterval(() => {
      const luckyItem = getRandomProduct();
      if (Math.random() < 0.3 && luckyItem.q > 0) {
        luckyItem.val = Math.round(luckyItem.val * 0.8);
        alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
      }
    }, INTERVAL_TIME);
  }, TIME_OUT);
}

export function setSuggestionAlert() {
  const INTERVAL_TIME = 60000;
  const TIME_OUT = Math.random() * 20000;
  setTimeout(() => {
    setInterval(() => {
      const lastSel = getLastSelValue();

      if (!lastSel) {
        return;
      }

      const prodList = getProductList();
      const suggest: Product | undefined = findProductWithCondition(
        prodList,
        (item) => {
          return item.id !== lastSel && item.q > 0;
        },
      );

      if (suggest) {
        alert(suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');
        suggest.val = Math.round(suggest.val * 0.95);
      }
    }, INTERVAL_TIME);
  }, TIME_OUT);
}
