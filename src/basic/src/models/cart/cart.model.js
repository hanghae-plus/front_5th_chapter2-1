export class Cart {
	constructor() {
		this.items = [];
	}

	// * 카트에 상품 추가
	addItem(product, quantity = 1) {
		const existingItem = this.findItem(product.id);

		if (existingItem) {
			existingItem.quantity += quantity;
		} else {
			const newItem = {
				productId: product.id,
				name: product.name,
				price: product.price,
				quantity: quantity,
			};

			this.items.push(newItem);
		}

		return true;
	}

	// * 상품 ID로 카트 아이템 찾기
	findItem(productId) {
		return this.items.find((item) => item.productId === productId);
	}

	// * 카트에서 상품 제거
	removeItem(productId) {
		const itemIndex = this.items.findIndex(
			(item) => item.productId === productId,
		);

		if (itemIndex === -1) {
			return null;
		}

		const removedItem = this.items[itemIndex];
		this.items.splice(itemIndex, 1);
		return removedItem;
	}

	// * 카트에서 상품 수량 변경
	updateItemQuantity(productId, newQuantity) {
		const item = this.findItem(productId);

		if (!item) {
			return false;
		}

		if (newQuantity <= 0) {
			return this.removeItem(productId) !== null;
		}

		item.quantity = newQuantity;
		return true;
	}

	// * 카트 데이터 가져오기
	getCartData() {
		return [...this.items];
	}

	// * 카트 비우기
	clearCart() {
		this.items = [];
		return true;
	}
}
