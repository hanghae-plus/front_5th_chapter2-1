import useCarts from '@/hooks/useCarts';
import React from 'react';

export default function AddToCartButton() {
  const { addToCart } = useCarts();

  return (
    <button
      id="add-to-cart"
      className="bg-blue-500 text-white px-4 py-2 rounded"
      onClick={() => addToCart()}
    >
      추가
    </button>
  );
}
