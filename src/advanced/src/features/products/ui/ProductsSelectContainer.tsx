import {
	ProductSelect,
	ProductSelectOption,
	ProductStateText,
} from '@/entities/product';
import { useCart } from '@/features/cart';
import { ProductsService, useProduct } from '@/features/products';
import React, { useMemo } from 'react';

export const ProductsSelectContainer: React.FC = () => {
	const { products, selectedProductId, setSelectedProductId, updateProducts } =
		useProduct();

	const productService = useMemo(() => ProductsService(products), [products]);

	const { addToCart } = useCart();

	React.useEffect(() => {
		if (products.length > 0 && !selectedProductId) {
			const availableProduct = products.find((product) => product.quantity > 0);
			if (availableProduct) {
				setSelectedProductId(availableProduct.id);
			}
		}
	}, [products, selectedProductId, setSelectedProductId]);

	const handleProductSelect = (productId: string): void => {
		setSelectedProductId(productId);
	};

	const handleAddToCart = (): void => {
		if (!selectedProductId) return;

		const product = productService.findProductById(selectedProductId);

		if (!product || product.quantity <= 0) {
			alert('품절된 상품입니다.');
			return;
		}

		if (product.quantity <= 0) {
			alert('품절된 상품입니다.');
			return;
		}

		productService.decreaseQuantity(product.id, 1, updateProducts);

		const success = addToCart(product);

		if (!success) {
			productService.increaseQuantity(product.id, 1, updateProducts);
			alert('재고가 부족합니다.');
		}
	};
	const getProductStatus = () => {
		return productService.getProductStatus();
	};

	return (
		<div>
			<div className="flex items-center">
				<ProductSelect
					onChange={(e) => handleProductSelect(e.target.value)}
					value={selectedProductId}
				>
					{products.map((product) => (
						<ProductSelectOption
							key={product.id}
							value={product.id}
							disabled={product.quantity === 0}
						>
							{product.name} - {product.price}원
						</ProductSelectOption>
					))}
				</ProductSelect>

				<button
					id="add-to-cart"
					onClick={handleAddToCart}
					className="bg-blue-500 text-white px-4 py-2 rounded"
					disabled={
						!selectedProductId ||
						!products.find((p) => p.id === selectedProductId)?.quantity
					}
				>
					추가
				</button>
			</div>
			<ProductStateText>
				{getProductStatus()
					.split('\n')
					.map((line, index) => (line ? <div key={index}>{line}</div> : null))}
			</ProductStateText>
		</div>
	);
};
