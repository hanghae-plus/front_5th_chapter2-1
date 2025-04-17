import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ProductContextType {
  products: Product[];
  lastSelectedProductId: string | undefined;
  getProductById: (id: string) => Product | undefined;
  updateProduct: (product: Product) => void;
  increaseStock: (id: string, increaseCount?: number) => void;
  decreaseStock: (id: string) => void;
  setLastSelectedProductId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([
    { id: 'p1', name: '상품1', price: 10000, stock: 50, bulkDiscountRate: 0.1 },
    { id: 'p2', name: '상품2', price: 20000, stock: 30, bulkDiscountRate: 0.15 },
    { id: 'p3', name: '상품3', price: 30000, stock: 20, bulkDiscountRate: 0.2 },
    { id: 'p4', name: '상품4', price: 15000, stock: 0, bulkDiscountRate: 0.05 },
    { id: 'p5', name: '상품5', price: 25000, stock: 10, bulkDiscountRate: 0.25 },
  ]);

  const [lastSelectedProductId, setLastSelectedProductId] = useState<string>();

  const getProductById = (id: string) => products.find((product) => product.id === id);

  const updateProduct = (product: Product) => {
    setProducts((prevProducts) => prevProducts.map((p) => (p.id === product.id ? product : p)));
  };

  const increaseStock = (id: string, increaseCount = 1) => {
    setProducts((prev) =>
      prev.map((product) => (product.id === id ? { ...product, stock: product.stock + increaseCount } : product)),
    );
  };

  const decreaseStock = (id: string) => {
    setProducts((prev) =>
      prev.map((product) => (product.id === id ? { ...product, stock: product.stock - 1 } : product)),
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        lastSelectedProductId,
        setLastSelectedProductId,
        getProductById,
        updateProduct,
        increaseStock,
        decreaseStock,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
