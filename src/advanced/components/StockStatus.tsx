import React from 'react';
import { Product } from '../hooks/useProduct';
import { CONSTANTS } from '../constants/constants';

interface StockStatusProps {
  products: Product[];
}

const StockStatus: React.FC<StockStatusProps> = ({ products }) => {
  const lowStockProducts = products.filter(
    (product) => product.quantity < CONSTANTS.INVENTORY.LOW_STOCK_THRESHOLD,
  );

  if (lowStockProducts.length === 0) {
    return null;
  }

  return (
    <div id="stock-status" className="text-sm text-gray-500 mt-2">
      {lowStockProducts.map((product) => (
        <div key={product.id}>
          {product.name}:{' '}
          {product.quantity > 0
            ? `재고 부족 (${product.quantity}개 남음)`
            : '품절'}
        </div>
      ))}
    </div>
  );
};

export default StockStatus;
