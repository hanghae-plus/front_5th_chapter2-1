import { productStore } from '../../stores/product';

export const updateProductInformation = () => {
	const products = productStore.getAllProducts();
	const limitedProducts = products.filter((product) => product.quantity < 5);

	const informationMessage = limitedProducts
		.map((product) => {
			const productStatus =
				product.quantity > 0
					? `재고 부족 (${product.quantity}개 남음)`
					: '품절';
			return `${product.name}: ${productStatus}`;
		})
		.join('\n');

	return informationMessage;
};
