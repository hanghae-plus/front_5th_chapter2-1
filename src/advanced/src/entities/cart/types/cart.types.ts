import { Product } from '../../product';

export interface Cart {
	items: CartItem[];
}

export type CartItem = Product;

export interface CartContextStoreProps {
	// * State
	cartItems: CartItem[];
	totalAmount: number;
	discountRate: number;
	bonusPoints: number;

	// * State 업데이트 메서드
	setCartItems: (cartItems: CartItem[]) => void;
	updateCartItems: (updater: (prevItems: CartItem[]) => CartItem[]) => void;
	setTotalAmount: (amount: number) => void;
	setDiscountRate: (rate: number) => void;
	setBonusPoints: (points: number) => void;
}
