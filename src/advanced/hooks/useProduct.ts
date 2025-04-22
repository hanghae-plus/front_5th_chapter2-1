import { useState } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const useProduct = (initialProductList: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProductList);

  const updateProductQuantity = (id: string, quantityChange: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            quantity: product.quantity + quantityChange,
          };
        }
        return product;
      }),
    );
  };

  const applyDiscount = (productId: string, discountRate: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            price: Math.round(product.price * discountRate),
          };
        }
        return product;
      }),
    );
  };

  return {
    products,
    updateProductQuantity,
    applyDiscount,
  };
};
