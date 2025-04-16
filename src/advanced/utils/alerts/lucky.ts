import ITEMS from '../../constants/items';
import { LUCKY_DISCONT_RATE, LUCKY_PROBABILITY } from './alertConstants';

let luckyItem = ITEMS[Math.floor(Math.random() * ITEMS.length)];

const isLucky = () => {
  return Math.random() < LUCKY_PROBABILITY && luckyItem.stock > 0;
};

const calculateItemDiscount = () => {
  return Math.round(luckyItem.price * LUCKY_DISCONT_RATE);
};

export const lucky = () => {
  if (isLucky()) {
    luckyItem.price = calculateItemDiscount();
    alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
    // updateSelectOptions(); TODO:
  }
};
