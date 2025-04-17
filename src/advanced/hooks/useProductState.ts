import { useState } from 'react';
import { PRODUCT_LIST } from '@/basic/consts';
import type { Product } from '@/advanced/types';

export const useProductState = () => {
  const [products, setProducts] = useState<Product[]>(PRODUCT_LIST);
  return { products, setProducts };
};