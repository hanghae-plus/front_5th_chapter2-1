import { Product } from '../types';
import { useState } from 'react';

export function useProducts(initialProducts: Product[]) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  // 상품 재고 감소
  function decreaseProductStock(productId: string) {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  function increaseProductStock(productId: string, amount: number) {
    setProducts(prev =>
      prev.map(p =>
        p.id === productId ? { ...p, quantity: p.quantity + amount } : p
      )
    );
  }

  return { products, decreaseProductStock, increaseProductStock, setProducts };
}