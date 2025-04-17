import { CartItem, CartItemModel } from '@/entities/cart';
import { Product } from '@/entities/product';
import {
	applyBulkDiscount,
	calculateItemDiscount,
} from '../utils/calculate.utils';

export const CartService = (cartItems: CartItem[]) => ({
	// * 장바구니 아이템 찾기
	findItemById(productId: string): CartItem | undefined {
		return cartItems.find((item) => item.id === productId);
	},

	// * 장바구니에 상품 추가
	addToCart(
		product: Product,
		quantity: number,
		updateCartItems: (updater: (prevItems: CartItem[]) => CartItem[]) => void,
	): boolean {
		if (!product) return false;

		const existingItemIndex = cartItems.findIndex(
			(item) => item.id === product.id,
		);

		if (existingItemIndex !== -1) {
			const existingItem = cartItems[existingItemIndex];
			const cartItemModel = new CartItemModel(existingItem);
			const updatedModel = cartItemModel.increaseQuantity(quantity);

			updateCartItems((prevItems) => {
				const updatedItems = [...prevItems];
				updatedItems[existingItemIndex] = updatedModel.toJSON();
				return updatedItems;
			});
		} else {
			const newItem: CartItem = {
				id: product.id,
				name: product.name,
				price: product.price,
				quantity,
			};

			updateCartItems((prevItems) => [...prevItems, newItem]);
		}

		return true;
	},

	// * 장바구니 상품 수량 변경
	updateQuantity(
		productId: string,
		change: number,
		updateCartItems: (updater: (prevItems: CartItem[]) => CartItem[]) => void,
	): boolean {
		const itemIndex = cartItems.findIndex((item) => item.id === productId);
		if (itemIndex === -1) return false;

		const item = cartItems[itemIndex];
		const newQuantity = item.quantity + change;

		if (newQuantity <= 0) {
			this.removeItem(productId, updateCartItems);
			return true;
		}

		const cartItemModel = new CartItemModel(item);
		const updatedModel =
			change > 0
				? cartItemModel.increaseQuantity(change)
				: cartItemModel.decreaseQuantity(Math.abs(change));

		updateCartItems((prevItems) => {
			const updatedItems = [...prevItems];
			updatedItems[itemIndex] = updatedModel.toJSON();
			return updatedItems;
		});

		return true;
	},

	// * 장바구니에서 상품 제거
	removeItem(
		productId: string,
		updateCartItems: (updater: (prevItems: CartItem[]) => CartItem[]) => void,
	): void {
		updateCartItems((prevItems) =>
			prevItems.filter((item) => item.id !== productId),
		);
	},

	// * 장바구니 계산 (총액, 할인, 포인트)
	calculateCart() {
		if (cartItems.length === 0) {
			return { totalAmount: 0, discountRate: 0, bonusPoints: 0 };
		}

		const cartItemModels = cartItems.map((item) => new CartItemModel(item));

		const { itemCount, subTotal, discountedTotal } = cartItemModels.reduce(
			(acc, itemModel) => {
				const quantity = itemModel.quantity;
				const itemTotal = itemModel.getSubtotal();
				const discount = calculateItemDiscount(itemModel.toJSON(), quantity);

				return {
					itemCount: acc.itemCount + quantity,
					subTotal: acc.subTotal + itemTotal,
					discountedTotal: acc.discountedTotal + itemTotal * (1 - discount),
				};
			},
			{ itemCount: 0, subTotal: 0, discountedTotal: 0 },
		);

		const { discountedTotal: finalDiscountedTotal, totalDiscountRate } =
			applyBulkDiscount(itemCount, subTotal, discountedTotal);

		// * 포인트 계산 (1,000원 당 1포인트)
		const bonusPoints = Math.floor(finalDiscountedTotal * 0.01);

		return {
			totalAmount: Math.round(finalDiscountedTotal),
			discountRate: totalDiscountRate,
			bonusPoints,
		};
	},
});
