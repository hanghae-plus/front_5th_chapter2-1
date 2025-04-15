import { createCartItem } from '../../components/cart-item/CartItem';
import { ProductService } from '../../services/product';
import { productStore } from '../../stores/product';
import { parseCartItemElement } from '../../utils/cart';
import {
	calculateItemDiscount,
	calculateQuantityDiscount,
} from '../../utils/discount';

export const CartService = () => ({
	calculate: (cartListElement) => {
		const cartItems = cartListElement.children;

		const { totalAmount, totalItemCount, subtotal } = Array.from(
			cartItems,
		).reduce(
			(acc, cartItemElement) => {
				const cartItem = parseCartItemElement(cartItemElement);
				if (!cartItem) return acc;

				const { productId, product, quantity } = cartItem;
				const itemTotal = product.price * quantity;
				const discountRate = calculateItemDiscount(productId, quantity);

				return {
					totalAmount: acc.totalAmount + itemTotal * (1 - discountRate),
					totalItemCount: acc.totalItemCount + quantity,
					subtotal: acc.subtotal + itemTotal,
				};
			},
			{ totalAmount: 0, totalItemCount: 0, subtotal: 0 },
		);

		const { totalAmount: finalAmount, discountRate } =
			calculateQuantityDiscount(totalAmount, subtotal, totalItemCount);

		return { totalAmount: finalAmount, discountRate };
	},

	// 상품 추가 이벤트 핸들러
	handleAddToCart: (
		selectedItemId,
		cartListElement,
		onChangeCart,
		setLastSelectedProductId,
	) => {
		if (setLastSelectedProductId) {
			setLastSelectedProductId(selectedItemId);
		}

		const productService = ProductService(productStore);
		const product = productService.findProductById(selectedItemId);

		if (!product || product.quantity <= 0) return;

		const cartItem = document.getElementById(product.id);

		if (cartItem) {
			const itemInfo = parseCartItemElement(cartItem);
			if (!itemInfo) return null;

			const { quantity } = itemInfo;
			const newQuantity = quantity + 1;

			if (newQuantity <= product.quantity) {
				cartItem.querySelector('span').textContent =
					`${product.name} - ${product.price}원 x ${newQuantity}`;

				productService.decreaseProduct(product.id, 1);
				onChangeCart?.();
				return cartItem;
			} else {
				onChangeCart?.();
				return null;
			}
		} else {
			const newCartItem = createCartItem(product);

			productService.decreaseProduct(product.id, 1);

			cartListElement.appendChild(newCartItem);
			onChangeCart?.();
			return newCartItem;
		}
	},

	// 수량 증가 버튼 이벤트 핸들러
	handleIncreaseQuantity: (event, onChangeCart) => {
		const productId = event.target.dataset.productId;
		const cartItemElement = document.getElementById(productId);
		if (!cartItemElement) return null;

		const productService = ProductService(productStore);
		const product = productService.findProductById(productId);
		if (!product) return null;

		const itemInfo = parseCartItemElement(cartItemElement);
		if (!itemInfo) return null;

		const { product: cartProduct, quantity } = itemInfo;
		const newQuantity = quantity + 1;

		if (product.quantity > 0) {
			productService.decreaseProduct(productId, 1);
			onChangeCart?.();
			return `${cartProduct.name} - ${cartProduct.price}원 x ${newQuantity}`;
		} else {
			onChangeCart?.();
			return null;
		}
	},

	// 수량 감소 버튼 이벤트 핸들러
	handleDecreaseQuantity: (event, onChangeCart) => {
		const productId = event.target.dataset.productId;
		const cartItemElement = document.getElementById(productId);
		if (!cartItemElement) return null;

		const productService = ProductService(productStore);
		const product = productService.findProductById(productId);
		if (!product) return null;

		const itemInfo = parseCartItemElement(cartItemElement);
		if (!itemInfo) return null;

		const { product: cartProduct, quantity } = itemInfo;
		const newQuantity = quantity - 1;

		productService.increaseProductQuantity(productId, 1);
		onChangeCart?.();

		if (newQuantity > 0) {
			return `${cartProduct.name} - ${cartProduct.price}원 x ${newQuantity}`;
		} else {
			return null;
		}
	},

	// 제거 버튼 이벤트 핸들러
	handleRemoveItem: (event, onChangeCart) => {
		const productId = event.target.dataset.productId;
		const cartItemElement = document.getElementById(productId);
		if (!cartItemElement) return null;

		const productService = ProductService(productStore);
		const product = productService.findProductById(productId);
		if (!product) return null;

		const itemInfo = parseCartItemElement(cartItemElement);
		if (!itemInfo) return null;

		const { quantity } = itemInfo;

		productService.increaseProductQuantity(productId, quantity);

		cartItemElement.remove();

		onChangeCart?.();
	},
});
