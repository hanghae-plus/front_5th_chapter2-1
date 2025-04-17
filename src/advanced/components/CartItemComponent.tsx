import React from 'react';
import { Item } from '../types';

interface CartItemProps {
  ItemId: string;
  quantity: number;
  item: Item;
  onQuantityChange: (itemId: string, change: number) => void;
  onRemoveItem: (productId: string) => void;
}

const CartItemComponent: React.FC<CartItemProps> = ({
  ItemId: itemId,
  quantity,
  item: item,
  onQuantityChange,
  onRemoveItem,
}) => {
  return (
    <div id={itemId} className="flex justify-between items-center mb-2">
      <span>
        {item.name} - {item.value}원 x {quantity}
      </span>
      <div>
        <button
          className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
          onClick={() => onQuantityChange(itemId, -1)}
          data-product-id={itemId}
          data-change="-1"
        >
          -
        </button>
        <button
          className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
          onClick={() => onQuantityChange(itemId, 1)}
          data-product-id={itemId}
          data-change="1"
        >
          +
        </button>
        <button
          className="remove-item bg-red-500 text-white px-2 py-1 rounded"
          onClick={() => onRemoveItem(itemId)}
          data-product-id={itemId}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default CartItemComponent;
