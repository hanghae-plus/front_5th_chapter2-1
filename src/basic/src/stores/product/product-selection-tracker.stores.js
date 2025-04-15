class ProductSelectionTracker {
	constructor() {
		this.lastSelectedProductId = 0;
	}

	setLastSelectedProductId(productId) {
		this.lastSelectedProductId = productId;
		return this;
	}

	getLastSelectedProductId() {
		return this.lastSelectedProductId;
	}
}

export const productSelectionTracker = new ProductSelectionTracker();
