import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';

import type { Product } from '../types';

import { defaultProducts } from '../constants/product';
import { scheduleFlashSale, scheduleRecommendationSale } from '../utils/scheduleSale';

interface ProductsContextType {
  products: Product[];
  updateUnits: (id: string, delta: number) => void;
  lastSelectedRef: React.RefObject<string | null>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function useProducts(): ProductsContextType {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts must be inside ProductsProvider');
  return ctx;
}

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const lastSelectedRef = useRef<string | null>(null);

  const updateUnits = (id: string, delta: number) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, units: p.units + delta } : p)));
  };

  useEffect(() => {
    const cleanupFlash = scheduleFlashSale(() => setProducts((p) => [...p]));
    const cleanupRecommend = scheduleRecommendationSale(
      () => lastSelectedRef.current,
      () => setProducts((p) => [...p])
    );
    return () => {
      cleanupFlash();
      cleanupRecommend();
    };
  }, []);

  return (
    <ProductsContext.Provider value={{ products, updateUnits, lastSelectedRef }}>
      {children}
    </ProductsContext.Provider>
  );
}
