import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
} from 'react';
import { Product, productList as INITIAL_PRODUCT_LIST } from '../data/products';
import { DISCOUNT_RATE } from '../config/constants';

interface ProductContextType {
  productList: Product[];
  setProductList: React.Dispatch<React.SetStateAction<Product[]>>;
  cartList: Product[];
  total: {
    count: number;
    amountWithDiscount: number;
    amountWithoutDiscount: number;
  };
  lastSelectedOption: React.RefObject<Product | null>;
  avgDiscountRate: number;
  totalAmount: number;
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

  console.log(total);
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
    <ProductContext.Provider
      value={{
        productList,
        setProductList,
        total,
        lastSelectedOption,
        cartList,
        avgDiscountRate,
        totalAmount,
      }}
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
