import { FLASH_SALE } from '@/basic/consts';
import { calculateDiscountedPrice, alertFlashSale } from '@/advanced/utils';
import type { Product } from '@/advanced/types';

const getRandomProduct = (productList: Product[]): Product => {
  return productList[Math.floor(Math.random() * productList.length)];
};

const isEligibleForFlashSale = (item: Product): boolean => {
  return Math.random() < 0.3 && item.quantity > 0;
};

interface FlashSaleParams {
  productList: Product[];
  setProductList: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const flashSale = ({ productList, setProductList }: FlashSaleParams): void => {
  console.log('flashSale');
  const luckyItem = getRandomProduct(productList);
  if (!isEligibleForFlashSale(luckyItem)) return;

  const discountedValue = calculateDiscountedPrice(luckyItem.value, FLASH_SALE.DISCOUNT_RATE);
  
  setProductList(currentProductList => 
    currentProductList.map(product => 
      product.id === luckyItem.id 
        ? { ...product, value: discountedValue }
        : product
    )
  );

  alertFlashSale(luckyItem);
};