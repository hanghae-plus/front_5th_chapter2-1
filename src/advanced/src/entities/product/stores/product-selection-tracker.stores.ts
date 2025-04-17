import { ProductSelectionTracker as ProductSelectionTrackerInterface } from '../types/product.types';
export class ProductSelectionTracker
	implements ProductSelectionTrackerInterface
{
	private static instance: ProductSelectionTrackerInterface | null = null;
	public lastSelectedProductId: string = '';

	constructor() {
		if (ProductSelectionTracker.instance) {
			return ProductSelectionTracker.instance;
		}
		ProductSelectionTracker.instance = this;
	}

	static getInstance(): ProductSelectionTracker {
		if (!ProductSelectionTracker.instance) {
			ProductSelectionTracker.instance = new ProductSelectionTracker();
		}
		return ProductSelectionTracker.instance;
	}

	setLastSelectedProductId(productId: string): ProductSelectionTracker {
		this.lastSelectedProductId = productId;
		return this;
	}

	getLastSelectedProductId(): string {
		return this.lastSelectedProductId;
	}
}

export const productSelectionTracker = ProductSelectionTracker.getInstance();
