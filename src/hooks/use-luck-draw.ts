import {
  LUCKY_ITEM_DELAY_TIME,
  LUCKY_ITEM_DISCOUNT_RATE,
  LUCKY_ITEM_INTERVAL_TIME,
} from '@/constants/constants';
import { scheduleRepeatingAlert } from '@/utils/timer';

import products from '../data/products.json';

export default function useLuckDraw() {
  const getRandomLuckyItem = () =>
    products[Math.floor(Math.random() * products.length)];

  const luckyItemAlert = () => {
    scheduleRepeatingAlert({
      delayRange: LUCKY_ITEM_DELAY_TIME,
      interval: LUCKY_ITEM_INTERVAL_TIME,
      condition: () => Math.random() < 0.3,
      onTrigger: () => {
        const luckyItem = getRandomLuckyItem();
        if (luckyItem.quantity === 0) return;
        alert(
          `번개세일! ${luckyItem.name}이(가) ${Math.round(LUCKY_ITEM_DISCOUNT_RATE * 100)}% 할인 중입니다!`,
        );
      },
    });
  };

  return { luckyItemAlert };
}
