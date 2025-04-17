import { useState, useCallback } from 'react';
import type { CartItem, Product } from '../types';

export function useCart(initial: CartItem[] = []) {
  const [cart, setCart] = useState<CartItem[]>(initial);

  const addItem = useCallback((product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { id: product.id, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0);
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }, []);

  return { cart, addItem, updateQuantity, removeItem };
}
