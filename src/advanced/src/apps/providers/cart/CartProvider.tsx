import { CartContextStore, CartItem } from '@/entities/cart';
import React, { ReactNode, useMemo, useState } from 'react';

interface CartProviderProps {
	children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [totalAmount, setTotalAmount] = useState<number>(0);
	const [discountRate, setDiscountRate] = useState<number>(0);
	const [bonusPoints, setBonusPoints] = useState<number>(0);

	const updateCartItems = (updater: (prevItems: CartItem[]) => CartItem[]) => {
		setCartItems((prevItems) => updater(prevItems));
	};

	const cartContextValue = useMemo(
		() => ({
			cartItems,
			totalAmount,
			discountRate,
			bonusPoints,
			setCartItems,
			updateCartItems,
			setTotalAmount,
			setDiscountRate,
			setBonusPoints,
		}),
		[cartItems, totalAmount, discountRate, bonusPoints],
	);

	return (
		<CartContextStore.Provider value={cartContextValue}>
			{children}
		</CartContextStore.Provider>
	);
};
