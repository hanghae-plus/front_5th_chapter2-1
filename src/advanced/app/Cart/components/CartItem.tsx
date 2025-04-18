import React from 'react';
import { CartItemProps } from '../../../../shared/app/Cart/types';
import { getCartItemText } from '../../../../shared/app/Cart/calculation.ts';

export const CartItem: React.FC<CartItemProps> = ({
  product,
  quantity,
  onQuantityChange,
  onRemove,
}) => {
  const { name, val: value } = product;
  return (
    <div className='flex justify-between items-center mb-2'>
      <span>{getCartItemText({ name, value, quantity })}</span>
      <div>
        <button
          className='quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1'
          onClick={() => onQuantityChange(product.id, -1)}
        >
          -
        </button>
        <button
          className='quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1'
          onClick={() => onQuantityChange(product.id, 1)}
        >
          +
        </button>
        <button
          className='remove-item bg-red-500 text-white px-2 py-1 rounded'
          onClick={() => onRemove(product.id)}
        >
          삭제
        </button>
      </div>
    </div>
  );
};
