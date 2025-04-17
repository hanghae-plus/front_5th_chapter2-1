import { CartItem } from '@/entities/cart/types/cart.types';
import { createContext } from 'react';

export interface CartContextProps {
	cartItems: CartItem[];
	totalAmount: number;
	discountRate: number;
	bonusPoints: number;

	setCartItems: (cartItems: CartItem[]) => void;
	updateCartItems: (updater: (prevItems: CartItem[]) => CartItem[]) => void;
	setTotalAmount: (amount: number) => void;
	setDiscountRate: (rate: number) => void;
	setBonusPoints: (points: number) => void;
}

export const CartContextStore = createContext<CartContextProps | undefined>(
	undefined,
);
