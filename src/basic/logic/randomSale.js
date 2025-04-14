import { FlashSale, AdditionalDiscount } from './index';

export const RandomSale = () => {
  setTimeout(() => {
    setInterval(() => FlashSale(), 30000);
  }, Math.random() * 10000);

  setTimeout(() => {
    setInterval(() => AdditionalDiscount(), 60000);
  }, Math.random() * 20000);
};
