import { LOW_PRODUCT_THRESHOLD } from '../constants/product.constants';
import { Product } from '../types/product.types';
import {
	MAX_DISCOUNT_RATE,
	MIN_DISCOUNT_RATE,
} from './../constants/product.constants';

export class ProductModel {
	private _id: string;
	private _name: string;
	private _price: number;
	private _quantity: number;
	private _originalPrice?: number;

	constructor(product: Product) {
		this._id = product.id;
		this._name = product.name;
		this._price = product.price;
		this._quantity = product.quantity;
		this._originalPrice = product.originalPrice;
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

	get isAvailable(): boolean {
		return this._quantity > 0;
	}

	get isLowProduct(): boolean {
		return this._quantity > 0 && this._quantity < LOW_PRODUCT_THRESHOLD;
	}

	get productStatus(): string {
		return this.isAvailable ? `재고 부족 (${this._quantity}개 남음)` : '품절';
	}

	get isDiscounted(): boolean {
		return !!this._originalPrice && this._price < this._originalPrice;
	}

	get discountRate(): number {
		if (!this.isDiscounted || !this._originalPrice) return 0;
		return Math.round((1 - this._price / this._originalPrice) * 100) / 100;
	}

	decreaseQuantity(amount: number): ProductModel | null {
		if (amount <= 0 || this._quantity < amount) return null;

		const updatedProduct = { ...this.toJSON() };
		updatedProduct.quantity -= amount;

		return new ProductModel(updatedProduct);
	}

	increaseQuantity(amount: number): ProductModel {
		if (amount <= 0) return this;

		const updatedProduct = { ...this.toJSON() };
		updatedProduct.quantity += amount;

		return new ProductModel(updatedProduct);
	}

	applyDiscount(discountRate: number): ProductModel {
		if (discountRate <= MIN_DISCOUNT_RATE || discountRate >= MAX_DISCOUNT_RATE)
			return this;

		const updatedProduct = { ...this.toJSON() };

		// * 원래 가격이 없으면 현재 가격을 원래 가격으로 저장
		if (!updatedProduct.originalPrice) {
			updatedProduct.originalPrice = this._price;
		}

		updatedProduct.price = Math.round(
			this._price * (MAX_DISCOUNT_RATE - discountRate),
		);

		return new ProductModel(updatedProduct);
	}

	toJSON(): Product {
		return {
			id: this._id,
			name: this._name,
			price: this._price,
			quantity: this._quantity,
			originalPrice: this._originalPrice,
		};
	}
}
