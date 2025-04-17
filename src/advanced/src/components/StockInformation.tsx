import React from 'react';
import { Product } from '../types';

interface StockInformationProps {
    products: Product[];
}

export const StockInformation: React.FC<StockInformationProps> = React.memo(({ products }) => {
    return (
        <div className="text-sm text-gray-500 mt-2">
            {products.map(
                (product) =>
                    product.quantity < 5 && (
                        <div key={product.id}>
                            {product.name}: {product.quantity > 0 ? `재고 부족 (${product.quantity}개 남음)` : '품절'}
                        </div>
                    )
            )}
        </div>
    );
});
