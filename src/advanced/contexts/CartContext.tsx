import { createContext, useContext } from 'react';
import { ICartItem } from '../types';

export interface CartContextType {
  cartItems: ICartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<ICartItem[]>>;
}

const defaultContext: CartContextType = {
  cartItems: [],
  setCartItems: () => {},
};

export const CartContext = createContext<CartContextType>(defaultContext);

export const useCartContext = () => useContext(CartContext);
