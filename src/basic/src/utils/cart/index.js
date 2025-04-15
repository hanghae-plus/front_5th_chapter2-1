import { productStore } from '../../stores/product';

export const parseCartItemElement = (cartItemElement) => {
	const productId = cartItemElement.id;
	const product = productStore.findProductById(productId);

	if (!product) return null;

	const quantity = parseInt(
		cartItemElement.querySelector('span').textContent.split('x ')[1],
	);

	return { productId, product, quantity };
};
