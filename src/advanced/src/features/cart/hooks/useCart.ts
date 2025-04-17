import { CartContextStore } from '@/entities/cart';
import { Product } from '@/entities/product';
import { useContext, useEffect, useMemo } from 'react';
import { CartService } from '../services/cart.service';

export const useCart = () => {
	const context = useContext(CartContextStore);

	if (!context) {
		throw new Error('useCart must be used within a CartProvider');
	}

	const {
		cartItems,
		totalAmount,
		discountRate,
		bonusPoints,
		updateCartItems,
		setTotalAmount,
		setDiscountRate,
		setBonusPoints,
	} = context;

	const cartService = useMemo(() => CartService(cartItems), [cartItems]);

	const addToCart = (product: Product, quantity: number = 1): boolean => {
		return cartService.addToCart(product, quantity, updateCartItems);
	};

	const updateQuantity = (productId: string, change: number): boolean => {
		return cartService.updateQuantity(productId, change, updateCartItems);
	};

	const removeItem = (productId: string): void => {
		cartService.removeItem(productId, updateCartItems);
	};

	const calculateCart = (): void => {
		const { totalAmount, discountRate, bonusPoints } =
			cartService.calculateCart();
		setTotalAmount(totalAmount);
		setDiscountRate(discountRate);
		setBonusPoints(bonusPoints);
	};

	useEffect(() => {
		calculateCart();
	}, [cartItems]);

	return {
		cartItems,
		totalAmount,
		discountRate,
		bonusPoints,
		addToCart,
		updateQuantity,
		removeItem,
	};
};
