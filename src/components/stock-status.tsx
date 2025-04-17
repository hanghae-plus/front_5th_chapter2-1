import { Product } from '@/types';
import React from 'react';

import products from '../data/products.json';

export default function StockStatus({ carts }: { carts: Product[] }) {
  const getStockStatus = () => {
    const soldOut = products.filter(
      (product) => product.quantity === 0,
    ) as Product[];
    const stockStatusMessage = [...soldOut, ...carts].map((item) => {
      const remaining = item.quantity - (item.currentQuantity || 0);
      if (remaining === 0) {
        return `${item.name}: 품절 `;
      } else if (remaining < 5) {
        return `${item.name}: 재고 부족 (${remaining}개 남음) `;
      }
      return null;
    });
    if (stockStatusMessage.length === 0) return null;
    return stockStatusMessage;
  };

  return (
    <div id="stock-status" className="text-sm text-gray-500 mt-2">
      {getStockStatus()}
    </div>
  );
}
