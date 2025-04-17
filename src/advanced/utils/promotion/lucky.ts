import ITEMS from '../../constants/items';
import { LUCKY_DISCONT_RATE, LUCKY_PROBABILITY } from './constants';

let luckyItem = ITEMS[Math.floor(Math.random() * ITEMS.length)];

const isLucky = () => {
  return Math.random() < LUCKY_PROBABILITY && luckyItem.stock > 0;
};

const calculateItemDiscount = () => {
  return Math.round(luckyItem.price * LUCKY_DISCONT_RATE);
};

const lucky = () => {
  if (isLucky()) {
    luckyItem.price = calculateItemDiscount();
    console.log(...ITEMS);
    console.log('번개 세일, ITEMS 변경');
    console.log(...ITEMS);
    alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
  }
};

export default lucky;
