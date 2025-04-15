import { createHeader } from '../components/header';
import { createProductStateText } from '../components/product-state/ProductStateText';
import { createSelect } from '../components/select/Select';
import { createTotalAmountText } from '../components/total-amount/TotalAmountText';
import { Cart } from '../entities/cart/model/cart.model';
import { CartService } from '../features/cart/services/cart.service';
import {
	useRandomFlashDiscount,
	useSuggestiveDiscount,
} from '../features/discounts';
import { ProductService } from '../features/product/services/product.service';
import { updateSelOpts } from '../shared/utils';
import { createAddButton } from '../widgets/add-button';
import { createCartList } from '../widgets/cart-list';
import { createContainer } from '../widgets/container';
import { createWrapper } from '../widgets/wrapper';

export const createMainPage = () => {
	const cart = new Cart();

	let lastSel = 0;
	const container = createContainer();
	const wrapper = createWrapper();
	const productStateText = createProductStateText({ id: 'stock-status' });
	const header = createHeader({ text: '장바구니' });

	const totalAmountText = createTotalAmountText({ id: 'cart-total' });
	const select = createSelect({ id: 'product-select' });

	// 카트 UI 업데이트 함수
	const updateCartUI = () => {
		CartService().calculate(cartList, totalAmountText, productStateText);
	};

	const cartList = createCartList({
		onCartChanged: () => {
			updateCartUI();
		},
	});

	const addBtn = createAddButton({
		select,
		cartList,
		onItemAdded: (selectedItemId) => {
			lastSel = selectedItemId;

			// ProductService를 통해 상품 정보 가져오기
			const product = ProductService().findProductById(selectedItemId);

			// 카트 모델에 상품 추가
			if (product) {
				cart.addItem(product);

				// 카트 UI 업데이트
				updateCartUI();
			}
		},
	});

	updateSelOpts(select);
	wrapper.appendChild(header);
	wrapper.appendChild(cartList);
	wrapper.appendChild(totalAmountText);
	wrapper.appendChild(select);
	wrapper.appendChild(addBtn);
	wrapper.appendChild(productStateText);
	container.appendChild(wrapper);

	// 초기 UI 업데이트
	updateCartUI();

	useRandomFlashDiscount(select);
	useSuggestiveDiscount(select, lastSel);

	return container;
};
