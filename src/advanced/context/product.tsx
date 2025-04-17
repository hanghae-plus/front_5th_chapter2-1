import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Product } from '../types';

const initialProducts: Product[] = [
  { id: 'p1', name: '상품1', price: 10000, quantity: 50 },
  { id: 'p2', name: '상품2', price: 20000, quantity: 30 },
  { id: 'p3', name: '상품3', price: 30000, quantity: 20 },
  { id: 'p4', name: '상품4', price: 15000, quantity: 0 },
  { id: 'p5', name: '상품5', price: 25000, quantity: 10 },
];

interface ProductContextType {
  products: Product[];

  getProductById: (id: string) => Product | undefined;
  getRandomProduct: () => Product;
  getSuggestedProduct: (excludeId: string) => Product | undefined;
  getDiscountRate: (productId: string) => number;

  updateQuantity: (id: string, change: number) => void;
  applyDiscount: (id: string, discountRate: number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const getProductById = useCallback((id: string) => products.find((product) => product.id === id), [products]);

  const getRandomProduct = useCallback(() => products[Math.floor(Math.random() * products.length)], [products]);

  const getSuggestedProduct = useCallback(
    (excludeId: string) => products.find((item) => item.id !== excludeId && item.quantity > 0),
    [products],
  );

  const getDiscountRate = useCallback((productId: string) => {
    switch (productId) {
      case 'p1':
        return 0.1;

      case 'p2':
        return 0.15;

      case 'p3':
        return 0.2;

      case 'p4':
        return 0.05;

      case 'p5':
        return 0.25;

      default:
        return 0;
    }
  }, []);

  const updateQuantity = useCallback((id: string, change: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === id && product.quantity + change >= 0) {
          return { ...product, quantity: product.quantity + change };
        }

        return product;
      }),
    );
  }, []);

  const applyDiscount = useCallback((id: string, discountRate: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            price: Math.round(product.price * (1 - discountRate)),
          };
        }

        return product;
      }),
    );
  }, []);

  const contextValue = useMemo(
    () => ({
      products,
      getProductById,
      getRandomProduct,
      getSuggestedProduct,
      getDiscountRate,
      updateQuantity,
      applyDiscount,
    }),
    [products, getProductById, getRandomProduct, getSuggestedProduct, getDiscountRate, updateQuantity, applyDiscount],
  );

  return <ProductContext.Provider value={contextValue}>{children}</ProductContext.Provider>;
};

export const useProducts = () => {
  const context = useContext(ProductContext);

  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }

  return context;
};
