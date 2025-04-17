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
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const flashSale = ({ products, setProducts }: FlashSaleParams): void => {
  const luckyItem = getRandomProduct(products);
  if (!isEligibleForFlashSale(luckyItem)) return;

  const discountedValue = calculateDiscountedPrice(luckyItem.value, FLASH_SALE.DISCOUNT_RATE);
  
  setProducts(currentProducts => 
    currentProducts.map(product => 
      product.id === luckyItem.id 
        ? { ...product, value: discountedValue }
        : product
    )
  );

  alertFlashSale(luckyItem);
};