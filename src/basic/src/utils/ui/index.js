import { createDiscountText } from '../../components/discount-text/DiscountText';
import { createSelectOption } from '../../components/select-option';
import { productStore } from '../../stores/product';

export const updateTotalUI = (
	totalAmountElement,
	totalAmount,
	discountRate,
) => {
	totalAmountElement.textContent = `총액: ${Math.round(totalAmount)}원`;

	if (discountRate > 0) {
		const discountElement = createDiscountText({
			text: `(${(discountRate * 100).toFixed(1)}% 할인 적용)`,
			id: 'discount-text',
			className: 'text-green-500 ml-2',
		});
		totalAmountElement.appendChild(discountElement);
	}
};

export const updateProductSelectOptions = (selectElement) => {
	selectElement.innerHTML = '';

	const products = productStore.getAllProducts();
	products.forEach((product) => {
		const option = createSelectOption({
			id: product.id,
			text: `${product.name} - ${product.price}원`,
			disabled: product.quantity === 0,
		});
		selectElement.appendChild(option);
	});
};
