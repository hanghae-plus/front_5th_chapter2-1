import { CartItem } from '../types/cart.types';

export class CartItemModel {
	private readonly _id: string;
	private readonly _name: string;
	private readonly _price: number;
	private readonly _quantity: number;
	private readonly _originalPrice?: number;

	constructor(cartItem: CartItem) {
		this._id = cartItem.id;
		this._name = cartItem.name;
		this._price = cartItem.price;
		this._quantity = cartItem.quantity;
		this._originalPrice = cartItem.originalPrice;
	}

	get id(): string {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	get price(): number {
		return this._price;
	}

	get quantity(): number {
		return this._quantity;
	}

	get originalPrice(): number | undefined {
		return this._originalPrice;
	}

	increaseQuantity(amount: number): CartItemModel {
		if (amount <= 0) return this;

		return new CartItemModel({
			...this.toJSON(),
			quantity: this._quantity + amount,
		});
	}

	decreaseQuantity(amount: number): CartItemModel {
		if (amount <= 0 || this._quantity <= amount) return this;

		return new CartItemModel({
			...this.toJSON(),
			quantity: this._quantity - amount,
		});
	}

	applyDiscount(discountRate: number): CartItemModel {
		if (discountRate <= 0 || discountRate >= 1) return this;

		const updatedItem = { ...this.toJSON() };

		if (!updatedItem.originalPrice) {
			updatedItem.originalPrice = this._price;
		}

		updatedItem.price = Math.round(this._price * (1 - discountRate));

		return new CartItemModel(updatedItem);
	}

	toJSON(): CartItem {
		return {
			id: this._id,
			name: this._name,
			price: this._price,
			quantity: this._quantity,
			originalPrice: this._originalPrice,
		};
	}
	getSubtotal(): number {
		return this._price * this._quantity;
	}
}
