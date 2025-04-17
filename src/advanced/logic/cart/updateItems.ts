import type { Product } from '@/advanced/types';

export const updateCartItemQuantity = (
  cartItems: Product[],
  itemId: string,
  change: number
): Product[] => {
  return cartItems.map(cartItem => 
    cartItem.id === itemId 
      ? { ...cartItem, quantity: cartItem.quantity + change }
      : cartItem
  );
};

export const removeCartItem = (
  cartItems: Product[],
  itemId: string
): Product[] => {
  return cartItems.filter(cartItem => cartItem.id !== itemId);
};