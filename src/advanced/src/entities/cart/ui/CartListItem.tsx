import React from 'react';
import { CartItem } from '../types/cart.types';

interface CartListItemProps {
	cartItem: CartItem;
	handleDecreaseQuantity: (cartItemId: CartItem['id']) => void;
	handleIncreaseQuantity: (cartItemId: CartItem['id']) => void;
	handleRemoveItem: (cartItemId: CartItem['id']) => void;
}

export const CartListItem: React.FC<CartListItemProps> = ({
	cartItem,
	handleIncreaseQuantity,
	handleDecreaseQuantity,
	handleRemoveItem,
}) => {
	const { id, name, price, quantity } = cartItem;

	return (
		<div className="flex justify-between items-center mb-2">
			<span>
				{name} - {price}원 x {quantity}
			</span>
			<div>
				<button
					className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
					onClick={() => handleDecreaseQuantity(id)}
				>
					-
				</button>
				<button
					className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
					onClick={() => handleIncreaseQuantity(id)}
				>
					+
				</button>
				<button
					className="remove-item bg-red-500 text-white px-2 py-1 rounded"
					onClick={() => handleRemoveItem(id)}
				>
					삭제
				</button>
			</div>
		</div>
	);
};
