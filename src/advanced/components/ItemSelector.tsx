import React from 'react';
import { Item } from '../types';

interface ItemSelectorProps {
  items: Item[];
  selectedId: string;
  onItemChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onAddToCart: () => void;
}

const ItemSelector: React.FC<ItemSelectorProps> = ({
  items,
  selectedId,
  onItemChange: onProductChange,
  onAddToCart,
}) => {
  return (
    <>
      <select
        id="product-select"
        className="border rounded p-2 mr-2"
        value={selectedId}
        onChange={onProductChange}
      >
        {items.map((item) => (
          <option key={item.id} value={item.id} disabled={item.q === 0}>
            {item.name} - {item.value}원
          </option>
        ))}
      </select>
      <button
        id="add-to-cart"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={onAddToCart}
      >
        추가
      </button>
    </>
  );
};

export default ItemSelector;
