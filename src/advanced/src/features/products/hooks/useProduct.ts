import { Product, ProductContextStore } from '@/entities/product';
import { ProductsService } from '@/features/products';
import { useCallback, useContext, useMemo } from 'react';

export const useProduct = () => {
	const context = useContext(ProductContextStore);

	if (context === undefined) {
		throw new Error('useProduct must be used within a ProductProvider');
	}

	const { products, selectedProductId, setSelectedProductId, updateProducts } =
		context;

	const productService = useMemo(() => ProductsService(products), [products]);

	const addProduct = useCallback(
		(product: Product): void => {
			productService.addProduct(product, updateProducts);
		},
		[productService, updateProducts],
	);

	return {
		products,
		selectedProductId,
		setSelectedProductId,
		updateProducts,
		addProduct,
	};
};
