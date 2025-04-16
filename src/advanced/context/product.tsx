import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
} from 'react';
import { Product, productList as INITIAL_PRODUCT_LIST } from '../data/products';

interface ProductContextType {
  productList: Product[];
  setProductList: React.Dispatch<React.SetStateAction<Product[]>>;
  total: {
    count: number;
    amountWithDiscount: number;
    amountWitoutDiscount: number;
  };
  lastSelectedOption: React.RefObject<Product | null>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [productList, setProductList] =
    useState<Product[]>(INITIAL_PRODUCT_LIST);

  const lastSelectedOption = useRef<Product | null>(null);

  const cartList = productList.filter((product) => product.cartQuantity > 0);

  const total = cartList.reduce(
    (prev, product) => {
      return {
        count: prev.count + product.cartQuantity,
        amountWithDiscount:
          prev.amountWithDiscount +
          product.price * product.cartQuantity * (1 - product.discountRate),
        amountWitoutDiscount:
          prev.amountWitoutDiscount + product.price * product.cartQuantity,
      };
    },
    {
      count: 0,
      amountWithDiscount: 0,
      amountWitoutDiscount: 0,
    },
  );

  return (
    <ProductContext.Provider
      value={{ productList, setProductList, total, lastSelectedOption }}
    >
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
