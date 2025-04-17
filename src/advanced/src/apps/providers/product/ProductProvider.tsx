import { Product, PRODUCT_LIST } from '@/entities/product';
import { ProductContextStore } from '@/entities/product/stores/product.stores';
import React, { ReactNode, useMemo, useState } from 'react';

interface ProductProviderProps {
	children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({
	children,
}) => {
	const [products, setProducts] = useState<Product[]>(PRODUCT_LIST);
	const [selectedProductId, setSelectedProductId] = useState<string>('');

	const updateProducts = (updater: (prevProducts: Product[]) => Product[]) => {
		setProducts(updater);
	};

	const productContextValue = useMemo(
		() => ({
			products,
			selectedProductId,
			setSelectedProductId,
			updateProducts,
		}),
		[products, selectedProductId],
	);

	return (
		<ProductContextStore.Provider value={productContextValue}>
			{children}
		</ProductContextStore.Provider>
	);
};
