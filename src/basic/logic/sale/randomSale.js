import { flashSale } from './flashSale';
import { additionalDiscount } from './additionalDiscount';
import { FLASH_SALE, SUGGESTED_PRODUCT } from '../../consts';

const scheduleRandomInterval = (fn, interval, maxInitialDelay) => {
  const delay = Math.random() * maxInitialDelay;
  setTimeout(() => {
    setInterval(fn, interval);
  }, delay);
};

export const RandomSale = () => {
  scheduleRandomInterval(
    flashSale,
    FLASH_SALE.INTERVAL,
    FLASH_SALE.MAX_INITIAL_DELAY,
  );
  scheduleRandomInterval(
    additionalDiscount,
    SUGGESTED_PRODUCT.INTERVAL,
    SUGGESTED_PRODUCT.MAX_INITIAL_DELAY,
  );
};
