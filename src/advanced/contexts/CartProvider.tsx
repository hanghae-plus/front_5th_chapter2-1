import { useMemo, useState } from 'react';
import { ICartItem } from '../types';
import { CartContext } from './CartContext';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  const value = useMemo(() => ({ cartItems, setCartItems }), [cartItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
