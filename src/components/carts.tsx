import { Product } from '@/types';
import React from 'react';

import useCarts from '../hooks/useCarts';

export default function Carts({ carts }: { carts: Product[] }) {
  const { increase, decrease, remove } = useCarts();

  if (carts.length === 0) return null;
  return carts.map((item) => (
    <div id="cart-items" key={item.id}>
      <div className="flex justify-between items-center mb-2">
        <span>{`${item.name} - ${item.price}원 x ${item.currentQuantity ?? 0}`}</span>
        <div>
          <button
            className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
            onClick={() => decrease(item.id)}
          >
            -
          </button>
          <button
            className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
            onClick={() => increase(item.id)}
          >
            +
          </button>
          <button
            className="remove-item bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => remove(item.id)}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  ));
}
