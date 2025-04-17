import React from 'react';
import { useProductStore } from '../stores/useProductStore';

const STOCK_LIMIT = 5;

const StockInfoView: React.FC = () => {
  const listItems = useProductStore((state) => state.listItems);

  const STOCK_MESSAGE = (name: string, quantity: number) =>
    quantity > 0 ? `${name}: 재고 부족 (${quantity}개 남음)` : `${name}: 품절`;

  const messages = listItems
    .filter((item) => item.quantity < STOCK_LIMIT)
    .map((item) => STOCK_MESSAGE(item.name, item.quantity));

  return (
    <div id="stock-status" className="text-sm text-gray-500 mt-2 whitespace-pre-line">
      {messages.join('\n')}
    </div>
  );
};

export default StockInfoView;
