import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, productList as INITIAL_PRODUCT_LIST } from '../data/products';

interface ProductContextType {
  productList: Product[];
  setProductList: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [productList, setProductList] =
    useState<Product[]>(INITIAL_PRODUCT_LIST);

  return (
    <ProductContext.Provider value={{ productList, setProductList }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductList = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
