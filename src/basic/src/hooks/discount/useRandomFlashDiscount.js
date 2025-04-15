import { productStore } from '../../stores/product';
import { updateProductSelectOptions } from '../../utils/ui';

// * useRapidDiscount vs useRandomFlashDiscount
export const useRandomFlashDiscount = (sel) => {
	setTimeout(function () {
		setInterval(function () {
			const products = productStore.getAllProducts();
			const randomIndex = Math.floor(Math.random() * products.length);
			const discountProduct = products[randomIndex];

			if (Math.random() < 0.3 && discountProduct.quantity > 0) {
				const discountRate = 0.2; // 20% 할인
				productStore.applyDiscount(discountProduct.id, discountRate);

				alert(
					'번개세일! ' + discountProduct.name + '이(가) 20% 할인 중입니다!',
				);
				updateProductSelectOptions(sel);
			}
		}, 30000);
	}, Math.random() * 10000);
};
