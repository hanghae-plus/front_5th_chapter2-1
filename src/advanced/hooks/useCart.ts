import { useState } from 'react';
import { CartItem } from '../types';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addItemToCart = (itemId: string, quantity: number = 1) => {
    const existingCartItemIndex = cartItems.findIndex((item) => item.itemId === itemId);

    if (existingCartItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingCartItemIndex] = {
        ...updatedCartItems[existingCartItemIndex],
        quantity: updatedCartItems[existingCartItemIndex].quantity + quantity,
      };
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { itemId, quantity }]);
    }
  };

  const changeItemQuantity = (itemId: string, change: number) => {
    const existingCartItemIndex = cartItems.findIndex((item) => item.itemId === itemId);

    if (existingCartItemIndex === -1) return;

    const updatedCartItems = [...cartItems];
    const newQuantity = updatedCartItems[existingCartItemIndex].quantity + change;

    if (newQuantity <= 0) {
      // 수량이 0 이하면 아이템 제거
      setCartItems(cartItems.filter((item) => item.itemId !== itemId));
    } else {
      // 수량 업데이트
      updatedCartItems[existingCartItemIndex] = {
        ...updatedCartItems[existingCartItemIndex],
        quantity: newQuantity,
      };
      setCartItems(updatedCartItems);
    }
  };

  const removeItem = (itemId: string) => {
    setCartItems(cartItems.filter((item) => item.itemId !== itemId));
  };

  return {
    cartItems,
    addItemToCart,
    changeItemQuantity,
    removeItem,
    setCartItems,
  };
};
