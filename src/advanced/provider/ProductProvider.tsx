import { createContext, useCallback, useContext, useState } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface IProductsContext {
  products: Array<Product>;
  getFindProduct: (productId: string) => Product | undefined;
  stockDecrease: (productId: string) => void;
  stockIncrease: (productId: string) => void;
  stockRecovery: (productId: string, recoveryQuantity: number) => void;
}

const ProductsContext = createContext<IProductsContext | undefined>(undefined);

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([
    { id: 'p1', name: '상품1', price: 10000, quantity: 50 },
    { id: 'p2', name: '상품2', price: 20000, quantity: 30 },
    { id: 'p3', name: '상품3', price: 30000, quantity: 20 },
    { id: 'p4', name: '상품4', price: 15000, quantity: 0 },
    { id: 'p5', name: '상품5', price: 25000, quantity: 10 },
  ]);

  const getFindProduct = useCallback(
    (productId: string) => {
      return products.find((product) => product.id === productId);
    },
    [products],
  );

  const stockDecrease = useCallback((productId: string) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity - 1 }
          : product,
      ),
    );
  }, []);

  const stockIncrease = useCallback((productId: string) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product,
      ),
    );
  }, []);

  const stockRecovery = useCallback(
    (productId: string, recoveryQuantity: number) => {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === productId
            ? { ...product, quantity: product.quantity + recoveryQuantity }
            : product,
        ),
      );
    },
    [],
  );

  return (
    <ProductsContext.Provider
      value={{
        products,
        getFindProduct,
        stockDecrease,
        stockIncrease,
        stockRecovery,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductsProvider');
  }
  return context;
};
