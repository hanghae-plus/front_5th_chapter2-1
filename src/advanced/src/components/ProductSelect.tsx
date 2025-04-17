import React from 'react';
import { Product } from '../types';

interface ProductSelectProps {
    products: Product[];
    selectedProductId: string;
    onProductSelect: (productId: string) => void;
}

export const ProductSelect: React.FC<ProductSelectProps> = React.memo(
    ({ products, selectedProductId, onProductSelect }) => {
        return (
            <select
                value={selectedProductId}
                onChange={(e) => onProductSelect(e.target.value)}
                className="border rounded p-2 mr-2"
            >
                {products.map((product) => (
                    <option key={product.id} value={product.id} disabled={product.quantity === 0}>
                        {product.name} - {product.price.toLocaleString()}원
                    </option>
                ))}
            </select>
        );
    }
);
