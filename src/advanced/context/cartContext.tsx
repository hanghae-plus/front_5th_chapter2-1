import type React from "react";
import { createContext, useContext, useState } from "react";
import type { CartState } from "./types";
import type { Product } from "@/advanced/types";

interface CartContextType {
  cart: CartState;
  setCart: React.Dispatch<React.SetStateAction<CartState>>;
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export interface CartItem extends Product {
  quantity: number;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartState>({
    itemCount: 0,
    subTotal: 0,
    totalAmount: 0,
  });
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  return (
    <CartContext.Provider value={{ cart, setCart, cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};