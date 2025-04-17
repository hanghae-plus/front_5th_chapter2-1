import { useState } from 'react';
import { PRODUCT_LIST } from '@/basic/consts';
import type { Product } from '@/advanced/types';

export const useProductState = () => {
  const [productList, setProductList] = useState<Product[]>(PRODUCT_LIST);
  return { productList, setProductList };
};