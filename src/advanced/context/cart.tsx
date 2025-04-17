import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { CartState, CartItem } from '../types';

interface CartContextType {
  cart: CartState;

  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartItem: (productId: string, quantity: number) => void;
  setLastSelectedProductId: (id: string | null) => void;
  resetCart: () => void;
}

const initialCartState: CartState = {
  lastSelectedProductId: null,
  totalAmount: 0,
  itemCount: 0,
  items: [],
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartState>(initialCartState);

  const addToCart = useCallback((productId: string, quantity: number) => {
    setCart((prev) => {
      const existingItemIndex = prev.items.findIndex((item) => item.productId === productId);

      let updatedItems: CartItem[] = [];

      if (existingItemIndex >= 0) {
        updatedItems = prev.items.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + quantity } : item,
        );
      } else {
        updatedItems = [...prev.items, { productId, quantity }];
      }

      return {
        ...prev,
        lastSelectedProductId: productId,
        items: updatedItems,
      };
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.productId !== productId),
    }));
  }, []);

  const updateCartItem = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId);

        return;
      }

      setCart((prev) => ({
        ...prev,
        items: prev.items.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
      }));
    },
    [removeFromCart],
  );

  const resetCart = useCallback(() => {
    setCart(initialCartState);
  }, []);

  const setLastSelectedProductId = useCallback((id: string | null) => {
    setCart((prev) => ({
      ...prev,
      lastSelectedProductId: id,
    }));
  }, []);

  const contextValue = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      updateCartItem,
      setLastSelectedProductId,
      resetCart,
    }),
    [cart, addToCart, removeFromCart, updateCartItem, setLastSelectedProductId, resetCart],
  );

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
