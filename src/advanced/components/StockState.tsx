import React from 'react';
import { Item } from '../types';

interface StockInfoProps {
  items: Item[];
}

const StockState: React.FC<StockInfoProps> = ({ items }) => {
  const getStockInfo = () => {
    return items
      .filter((item) => item.q < 5)
      .map((item) => `${item.name}: ${item.q > 0 ? `재고 부족 (${item.q}개 남음)` : '품절'}`)
      .join('\n');
  };

  return (
    <div id="stock-status" className="text-sm text-gray-500 mt-2">
      {getStockInfo()}
    </div>
  );
};

export default StockState;
