import React, { createContext, useState, useContext, ReactNode } from 'react';

interface CartContextType {
  cartItems: CartItem[];
  getCartItemById: (id: string) => CartItem | undefined;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  changeCartItemQuantity: (id: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const getCartItemById = (id: string) => cartItems.find((cartItem) => cartItem.id === id);

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const changeCartItemQuantity = (id: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)).filter((item) => item.quantity > 0),
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, getCartItemById, addToCart, removeFromCart, changeCartItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
