import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, INITIAL_PRODUCT_LIST } from '../data/products';
import { CartSummary, getCartSummary } from '../utils/product';

interface StockContextType {
  stockList: Product[];
  setProductList: React.Dispatch<React.SetStateAction<Product[]>>;
  cartList: Product[];
  lastAddedProductId: string | undefined;
  setLastAddedProductId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  summary: CartSummary;
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export const StockProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [stockList, setProductList] = useState<Product[]>(INITIAL_PRODUCT_LIST);
  const [lastAddedProductId, setLastAddedProductId] = useState<
    string | undefined
  >();

  const cartList = stockList.filter((product) => product.cartQuantity > 0);
  const summary = getCartSummary(cartList);

  return (
    <StockContext.Provider
      value={{
        stockList,
        setProductList,
        lastAddedProductId,
        setLastAddedProductId,
        cartList,
        summary,
      }}
    >
      {children}
    </StockContext.Provider>
  );
};

export const useStock = (): StockContextType => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error('useStock must be used within a StockProvider');
  }
  return context;
};
