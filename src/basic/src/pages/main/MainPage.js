import { createButton } from '../../components/button';
import { createCartList } from '../../components/cart-list';
import { createContainer } from '../../components/container';
import { createHeader } from '../../components/header';
import { createProductStateText } from '../../components/product-state';
import { createSelect } from '../../components/select';
import { createTotalAmountText } from '../../components/total-amount';
import { createWrapper } from '../../components/wrapper';
import {
	useRandomFlashDiscount,
	useSuggestiveDiscount,
} from '../../hooks/discount';
import { CartService } from '../../services/cart';
import { productSelectionTracker } from '../../stores/product';

import { updateLoyaltyPoints } from '../../utils/points';
import { updateProductInformation } from '../../utils/product';
import { updateProductSelectOptions, updateTotalUI } from '../../utils/ui';
export const createMainPage = ({ cart }) => {
	const container = createContainer();
	const wrapper = createWrapper();
	const productStateText = createProductStateText({
		id: 'stock-status',
		className: 'text-sm text-gray-500 mt-2',
	});
	const header = createHeader({ text: '장바구니' });

	const totalAmountText = createTotalAmountText({
		id: 'cart-total',
		className: 'text-xl font-bold my-4',
	});

	const select = createSelect({
		id: 'product-select',
		className: 'border rounded p-2 mr-2',
	});

	const updateCartUI = () => {
		const { totalAmount, discountRate } = CartService().calculate(
			cartList,
			totalAmountText,
			productStateText,
		);
		updateTotalUI(totalAmountText, totalAmount, discountRate);
		updateLoyaltyPoints(totalAmountText, totalAmount);
		productStateText.textContent = updateProductInformation();
	};

	const cartList = createCartList({
		onChangeCart: () => {
			updateCartUI();
		},
	});

	const button = createButton({
		text: '추가',
		id: 'add-to-cart',
		className: 'bg-blue-500 text-white px-4 py-2 rounded',
		onClick: () => {
			const result = CartService().handleAddToCart(
				select.value,
				cartList,
				updateCartUI,
				productSelectionTracker.setLastSelectedProductId.bind(
					productSelectionTracker,
				),
			);
			if (!result) {
				alert('재고가 부족합니다.');
			} else {
				cart.addItem(result);
			}
		},
	});

	updateProductSelectOptions(select);
	wrapper.appendChild(header);
	wrapper.appendChild(cartList);
	wrapper.appendChild(totalAmountText);
	wrapper.appendChild(select);
	wrapper.appendChild(button);
	wrapper.appendChild(productStateText);
	container.appendChild(wrapper);

	updateCartUI();

	useRandomFlashDiscount(select);
	useSuggestiveDiscount(select);
	return container;
};
