import { Product } from '../types/product';
import { useState } from 'react';

interface CartItemCreatorProps {
  product: Product;
  onQuantityChange: (productId: string, change: number) => void;
  onRemove: (productId: string) => void;
}

export const CartItemCreator = ({ product, onQuantityChange, onRemove }: CartItemCreatorProps) => {
  const { id, name, price } = product;
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
    onQuantityChange(id, change);
  };

  return (
    <div className="flex justify-between items-center mb-2">
      <span>
        {name} - {price}원 x {quantity}
      </span>
      <div>
        <button
          className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
          onClick={() => handleQuantityChange(-1)}
        >
          -
        </button>
        <button
          className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
          onClick={() => handleQuantityChange(1)}
        >
          +
        </button>
        <button
          className="remove-item bg-red-500 text-white px-2 py-1 rounded"
          onClick={() => onRemove(id)}
        >
          삭제
        </button>
      </div>
    </div>
  );
};
