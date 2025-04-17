import { Product, ProductModel } from '@/entities/product';

export const ProductsService = (products: Product[]) => ({
	getAvailableProducts(): Product[] {
		return products.filter((product) => product.quantity > 0);
	},

	findProductById(productId: string): Product | undefined {
		return products.find((product) => product.id === productId);
	},

	addProduct(
		product: Product,
		updateProducts: (updater: (prevProducts: Product[]) => Product[]) => void,
	): void {
		updateProducts((prevProducts) => [...prevProducts, product]);
	},

	decreaseQuantity(
		productId: string,
		amount: number,
		updateProducts: (updater: (prevProducts: Product[]) => Product[]) => void,
	): boolean {
		const productIndex = products.findIndex((p) => p.id === productId);
		if (productIndex === -1) return false;

		const productModel = new ProductModel(products[productIndex]);
		const updatedModel = productModel.decreaseQuantity(amount);

		if (!updatedModel) return false;

		updateProducts((prevProducts) => {
			const newProducts = [...prevProducts];
			newProducts[productIndex] = updatedModel.toJSON();
			return newProducts;
		});

		return true;
	},

	increaseQuantity(
		productId: string,
		amount: number,
		updateProducts: (updater: (prevProducts: Product[]) => Product[]) => void,
	): boolean {
		const productIndex = products.findIndex((p) => p.id === productId);
		if (productIndex === -1) return false;

		const productModel = new ProductModel(products[productIndex]);
		const updatedModel = productModel.increaseQuantity(amount);

		if (!updatedModel) return false;

		updateProducts((prevProducts) => {
			const newProducts = [...prevProducts];
			newProducts[productIndex] = updatedModel.toJSON();
			return newProducts;
		});

		return true;
	},

	getProductStatus(): string {
		return products
			.filter((product) => product.quantity < 5)
			.map((product) => {
				const productModel = new ProductModel(product);
				return `${productModel.name}: ${productModel.productStatus}`;
			})
			.join('\n');
	},
});
