const PRODUCT_LIST = [
	{ id: 'p1', name: '상품1', price: 10000, quantity: 50 },
	{ id: 'p2', name: '상품2', price: 20000, quantity: 30 },
	{ id: 'p3', name: '상품3', price: 30000, quantity: 20 },
	{ id: 'p4', name: '상품4', price: 15000, quantity: 0 },
	{ id: 'p5', name: '상품5', price: 25000, quantity: 10 },
];

export class ProductStore {
	static instance = null;
	#products = [];

	constructor() {
		if (ProductStore.instance) {
			return ProductStore.instance;
		}

		this.#products = PRODUCT_LIST;

		ProductStore.instance = this;
	}

	static getInstance() {
		if (!ProductStore.instance) {
			ProductStore.instance = new ProductStore();
		}
		return ProductStore.instance;
	}

	getAllProducts() {
		return [...this.#products];
	}

	findProductById(productId) {
		const product = this.#products.find((p) => p.id === productId);
		if (!product) return null;

		return { ...product };
	}

	getAvailableProducts() {
		return this.#products
			.filter((product) => product.quantity > 0)
			.map((product) => ({ ...product }));
	}

	applyDiscount(productId, discountRate) {
		const product = this.#products.find((p) => p.id === productId);
		if (product) {
			product.price = Math.round(product.price * (1 - discountRate));
			return true;
		}
		return false;
	}

	decreaseQuantity(productId, amount = 1) {
		const product = this.#products.find((p) => p.id === productId);
		if (product && product.quantity >= amount) {
			product.quantity -= amount;
			return true;
		}
		return false;
	}

	increaseQuantity(productId, amount = 1) {
		const product = this.#products.find((p) => p.id === productId);
		if (product) {
			product.quantity += amount;
			return true;
		}
		return false;
	}
}

export const productStore = ProductStore.getInstance();
