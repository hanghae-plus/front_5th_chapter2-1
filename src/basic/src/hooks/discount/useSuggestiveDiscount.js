import { productSelectionTracker, productStore } from '../../stores/product';
import { updateProductSelectOptions } from '../../utils/ui';

export const useSuggestiveDiscount = (sel) => {
	setTimeout(function () {
		setInterval(function () {
			const lastSelectedId = productSelectionTracker.getLastSelectedProductId();

			if (lastSelectedId) {
				const products = productStore.getAllProducts();
				const suggestProduct = products.find(
					(product) => product.id !== lastSelectedId && product.quantity > 0,
				);

				if (suggestProduct) {
					alert(
						suggestProduct.name +
							'은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!',
					);

					const discountRate = 0.05; // 5% 할인
					productStore.applyDiscount(suggestProduct.id, discountRate);
					updateProductSelectOptions(sel);
				}
			}
		}, 60000);
	}, Math.random() * 20000);
};
