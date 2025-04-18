import { useMemo, useState } from 'react';
import { ProductContext, ProductContextType } from './ProductContext';
import { PRODUCTS } from '../constants';

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);

  const value = useMemo<ProductContextType>(() => ({ products, setProducts }), [products]);

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
