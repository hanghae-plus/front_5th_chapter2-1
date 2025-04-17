import { CartContainer } from '@/features/cart';
import {
	useRandomFlashDiscount,
	useSuggestiveDiscount,
} from '@/features/discount';
import { ProductsSelectContainer } from '@/features/products';
import React, { HTMLAttributes } from 'react';

export const MainContainer: React.FC<HTMLAttributes<HTMLDivElement>> = () => {
	useSuggestiveDiscount();
	useRandomFlashDiscount();

	return (
		<>
			<CartContainer />
			<ProductsSelectContainer />
		</>
	);
};
