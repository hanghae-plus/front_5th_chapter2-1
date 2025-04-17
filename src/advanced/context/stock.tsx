import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, INITIAL_PRODUCT_LIST } from '../data/products';
import { DISCOUNT_RATE } from '../config/constants';

interface StockContextType {
  stockList: Product[];
  setProductList: React.Dispatch<React.SetStateAction<Product[]>>;
  cartList: Product[];
  total: {
    count: number;
    amountWithDiscount: number;
    amountWithoutDiscount: number;
  };

  avgDiscountRate: number;
  totalAmount: number;
  lastAddedProductId: string | undefined;
  setLastAddedProductId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
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

  const total = cartList.reduce(
    (prev, product) => {
      return {
        count: prev.count + product.cartQuantity,
        amountWithDiscount:
          prev.amountWithDiscount +
          product.price *
            product.cartQuantity *
            (1 - (product.cartQuantity >= 10 ? product.discountRate : 0)),
        amountWithoutDiscount:
          prev.amountWithoutDiscount + product.price * product.cartQuantity,
      };
    },
    {
      count: 0,
      amountWithDiscount: 0,
      amountWithoutDiscount: 0,
    },
  );

  const totalItemDiscountRate =
    total.amountWithoutDiscount === 0
      ? 0
      : (total.amountWithoutDiscount - total.amountWithDiscount) /
        total.amountWithoutDiscount;
  const avgDiscountRate =
    total.count > 30
      ? Math.max(totalItemDiscountRate, DISCOUNT_RATE.bulk)
      : totalItemDiscountRate;

  const bulkDiscountAmount =
    total.amountWithoutDiscount * (1 - DISCOUNT_RATE.bulk);
  const totalAmount =
    total.count > 30 ? bulkDiscountAmount : total.amountWithDiscount;

  return (
    <StockContext.Provider
      value={{
        stockList,
        setProductList,
        total,
        lastAddedProductId,
        setLastAddedProductId,
        cartList,
        avgDiscountRate,
        totalAmount,
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
