import { CartItem, CartListItem, CartTotalAmountText } from '@/entities/cart';
import { useCart } from '@/features/cart';
import { ProductsService, useProduct } from '@/features/products';
import React, { useMemo } from 'react';

export const CartContainer: React.FC = () => {
	const { products, updateProducts } = useProduct();

	// ProductService 팩토리 함수를 통해 서비스 인스턴스 생성
	const productService = useMemo(() => ProductsService(products), [products]);

	const {
		cartItems,
		totalAmount,
		discountRate,
		bonusPoints,
		updateQuantity,
		removeItem,
	} = useCart();

	const handleIncreaseQuantity = (productId: string): void => {
		const product = productService.findProductById(productId);
		if (!product) return;

		if (product.quantity <= 0) {
			alert('품절된 상품입니다.');
			return;
		}

		productService.decreaseQuantity(productId, 1, updateProducts);

		updateQuantity(productId, 1);
	};

	const handleDecreaseQuantity = (productId: string): void => {
		const product = productService.findProductById(productId);
		if (!product) return;

		productService.increaseQuantity(productId, 1, updateProducts);

		updateQuantity(productId, -1);
	};

	const handleRemoveItem = (productId: string): void => {
		const item = cartItems.find((item: CartItem) => item.id === productId);
		if (!item) return;

		productService.increaseQuantity(productId, item.quantity, updateProducts);

		removeItem(productId);
	};
	return (
		<>
			<div id="cart-items">
				{cartItems.map((item: CartItem) => (
					<CartListItem
						key={item.id}
						cartItem={item}
						handleDecreaseQuantity={() => handleDecreaseQuantity(item.id)}
						handleIncreaseQuantity={() => handleIncreaseQuantity(item.id)}
						handleRemoveItem={() => handleRemoveItem(item.id)}
					/>
				))}
			</div>
			<CartTotalAmountText
				totalAmount={totalAmount}
				loyaltyPoints={bonusPoints}
				discountRate={discountRate}
			/>
		</>
	);
};
