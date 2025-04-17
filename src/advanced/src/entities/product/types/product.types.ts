export interface Product {
	id: string;
	name: string;
	price: number;
	quantity: number;
	originalPrice?: number;
}

export interface ProductStore {
	products: Product[];
	getAllProducts(): Product[];
	findProductById(productId: string): Product | null;
	getAvailableProducts(): Product[];
	applyDiscount(productId: string, discountRate: number): boolean;
	decreaseQuantity(productId: string, amount?: number): boolean;
	increaseQuantity(productId: string, amount?: number): boolean;
}

export interface ProductSelectionTracker {
	setLastSelectedProductId(productId: string): ProductSelectionTracker;
	getLastSelectedProductId(): string;
	readonly lastSelectedProductId: string;
}
