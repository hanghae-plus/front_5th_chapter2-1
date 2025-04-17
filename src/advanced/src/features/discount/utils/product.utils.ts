import { Product } from '@/entities/product';

export const getAvailableProducts = (products: Product[]): Product[] => {
	return products.filter((product) => product.quantity > 0);
};

export const selectRandomProduct = (products: Product[]): Product | null => {
	if (products.length === 0) return null;
	const randomIndex = Math.floor(Math.random() * products.length);
	return products[randomIndex];
};

export const applyDiscount = (
	product: Product,
	discountRate: number,
): Product => {
	return {
		...product,
		price: Math.round(product.price * (1 - discountRate)),
	};
};
