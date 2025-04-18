import React, { useMemo } from 'react';
import { IProduct } from '../types';
import { LOW_STOCK_THRESHOLD } from '../constants';

interface StockStatusProps {
  products: IProduct[];
}

export const StockStatus: React.FC<StockStatusProps> = ({ products }) => {
  const lowStockProducts = useMemo(
    () => products.filter(product => product.quantity < LOW_STOCK_THRESHOLD),
    [products]
  );

  return (
    <div id="stock-status" className="text-sm text-gray-500 mt-2">
      {lowStockProducts.map(product => (
        <div key={product.id}>
          {product.name}: {product.quantity > 0 ? `재고 부족 (${product.quantity}개 남음)` : '품절'}
        </div>
      ))}
    </div>
  );
};
