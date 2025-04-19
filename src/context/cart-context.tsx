import { Product } from '@/types';
import React, {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

type CartContextType = {
  carts: Product[];
  selectedProductId: string;
  setCarts: React.Dispatch<React.SetStateAction<Product[]>>;
  setSelectedProductId: React.Dispatch<React.SetStateAction<string>>;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [carts, setCarts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>('p1');

  return (
    <CartContext.Provider
      value={useMemo(
        () => ({
          carts,
          setCarts,
          selectedProductId,
          setSelectedProductId,
        }),
        [carts, selectedProductId],
      )}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
