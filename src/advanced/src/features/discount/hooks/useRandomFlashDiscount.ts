import { Product } from '@/entities/product';
import { useProduct } from '@/features/products';
import { useCallback, useEffect } from 'react';
import {
	applyDiscount,
	getAvailableProducts,
	selectRandomProduct,
} from '../utils/product.utils';

export const useRandomFlashDiscount = (): void => {
	const { products, updateProducts } = useProduct();
	const FLASH_SALE_DISCOUNT_RATE = 0.2;

	const executeFlashSale = useCallback((): Product | null => {
		// * 구매 가능한 상품만 필터링
		const availableProducts = getAvailableProducts(products);

		// * 랜덤 상품 선택
		const selectedProduct = selectRandomProduct(availableProducts);
		if (!selectedProduct) return null;

		// * 할인 적용
		updateProducts((prevProducts) => {
			return prevProducts.map((product) =>
				product.id === selectedProduct.id
					? applyDiscount(product, FLASH_SALE_DISCOUNT_RATE)
					: product,
			);
		});

		return selectedProduct;
	}, [products, updateProducts]);

	useEffect(() => {
		const randomFlashDiscount = setTimeout(() => {
			const flashDiscountInterval = setInterval(() => {
				if (Math.random() < 0.3) {
					const discountedProduct = executeFlashSale();
					if (discountedProduct) {
						alert(
							`번개세일! ${discountedProduct.name}이(가) 20% 할인 중입니다!`,
						);
					}
				}
			}, 30000);

			return () => clearInterval(flashDiscountInterval);
		}, Math.random() * 10000);

		return () => clearTimeout(randomFlashDiscount);
	}, [executeFlashSale]);
};
