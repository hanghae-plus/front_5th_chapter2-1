import ITEMS from '../../constants/items';
import updateSelectOptions from '../updateSelectOptions';
import { LUCKY_DISCONT_RATE, LUCKY_PROBABILITY } from './constants';

export const lucky = () => {
  let luckyItem = ITEMS[Math.floor(Math.random() * ITEMS.length)];

  if (Math.random() < LUCKY_PROBABILITY && luckyItem.stock > 0) {
    luckyItem.price = Math.round(luckyItem.price * LUCKY_DISCONT_RATE);
    alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
    updateSelectOptions();
  }
};
