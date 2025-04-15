import { CartService } from '../../services/cart/cart.service';
import { updateCartItem } from './helper';

export const createCartList = (options) => {
	const { onChangeCart } = options;
	const cartList = document.createElement('div');
	cartList.id = 'cart-items';

	cartList.addEventListener('click', (event) => {
		const target = event.target;
		const cartService = CartService();

		if (target.classList.contains('quantity-change')) {
			const changeValue = parseInt(target.dataset.change);
			const productId = target.dataset.productId;

			if (changeValue > 0) {
				const result = cartService.handleIncreaseQuantity(event, onChangeCart);
				if (!result) {
					alert('재고가 부족합니다.');
				} else {
					updateCartItem(productId, result);
				}
			} else if (changeValue < 0) {
				const result = cartService.handleDecreaseQuantity(event, onChangeCart);
				updateCartItem(productId, result);
			}
		} else if (target.classList.contains('remove-item')) {
			cartService.handleRemoveItem(event, onChangeCart);
		}
	});

	return cartList;
};
