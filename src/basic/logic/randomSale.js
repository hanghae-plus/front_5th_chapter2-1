import { FlashSale, AdditionalDiscount } from './index';

const scheduleRandomInterval = (fn, interval, maxInitialDelay) => {
  const delay = Math.random() * maxInitialDelay;
  setTimeout(() => {
    setInterval(fn, interval);
  }, delay);
};

export const RandomSale = () => {
  scheduleRandomInterval(FlashSale, 30000, 10000);
  scheduleRandomInterval(AdditionalDiscount, 60000, 20000);
};
