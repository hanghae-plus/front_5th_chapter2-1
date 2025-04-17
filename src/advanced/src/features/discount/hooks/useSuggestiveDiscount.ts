import { Product, productSelectionTracker } from '@/entities/product';
import { useProduct } from '@/features/products';
import { useCallback, useEffect } from 'react';
import {
	applyDiscount,
	getAvailableProducts,
	selectRandomProduct,
} from '../utils/product.utils';

const SUGGESTIVE_DISCOUNT_RATE = 0.05;

export const useSuggestiveDiscount = (): void => {
	const { products, selectedProductId, updateProducts } = useProduct();

	const applySuggestiveDiscount = useCallback(
		(excludeProductId: string): Product | null => {
			// * 구매 가능한 상품 필터링
			const availableProducts = getAvailableProducts(products);

			// * 현재 선택된 상품 제외
			const filteredProducts = availableProducts.filter(
				(product) => product.id !== excludeProductId,
			);

			if (filteredProducts.length === 0) return null;

			// * 랜덤 상품 선택
			const suggestedProduct = selectRandomProduct(filteredProducts);
			if (!suggestedProduct) return null;

			// * 할인 적용
			updateProducts((prevProducts) =>
				prevProducts.map((product) =>
					product.id === suggestedProduct.id
						? applyDiscount(product, SUGGESTIVE_DISCOUNT_RATE)
						: product,
				),
			);

			return suggestedProduct;
		},
		[products, updateProducts],
	);

	useEffect(() => {
		const suggestiveDiscount = setTimeout(() => {
			const suggestiveDiscountInterval = setInterval(() => {
				const lastSelectedId =
					productSelectionTracker.getLastSelectedProductId();
				const idToUse = lastSelectedId || selectedProductId;

				if (idToUse && idToUse.trim() !== '') {
					const suggestedProduct = applySuggestiveDiscount(idToUse);

					if (suggestedProduct) {
						alert(
							`${suggestedProduct.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`,
						);
					}
				}
			}, 60000);

			return () => clearInterval(suggestiveDiscountInterval);
		}, Math.random() * 20000);

		return () => clearTimeout(suggestiveDiscount);
	}, [applySuggestiveDiscount, selectedProductId]);
};
