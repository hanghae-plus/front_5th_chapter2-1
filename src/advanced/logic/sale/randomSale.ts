import { FLASH_SALE, SUGGESTED_PRODUCT } from '@/basic/consts';
import { flashSale } from './flashSale';
import { additionalDiscount } from './additionalDiscount';
import type { Product } from '@/advanced/types';

const scheduleRandomInterval = (
  fn: () => void,
  interval: number,
  maxInitialDelay: number
): void => {
  const delay = Math.random() * maxInitialDelay;
  setTimeout(() => {
    setInterval(fn, interval);
  }, delay);
};

interface RandomSaleParams {
  selectedProductId: string | null;
  productList: Product[];
  setProductList: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const RandomSale = (params: RandomSaleParams): void => {
  scheduleRandomInterval(
    () => flashSale(params),
    FLASH_SALE.INTERVAL,
    FLASH_SALE.MAX_INITIAL_DELAY
  );

  scheduleRandomInterval(
    () => additionalDiscount(params),
    SUGGESTED_PRODUCT.INTERVAL,
    SUGGESTED_PRODUCT.MAX_INITIAL_DELAY
  );
};