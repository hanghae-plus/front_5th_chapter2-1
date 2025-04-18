import React from 'react';
import { CartItem } from '../hooks/useCart';

interface CartItemProps {
  cartItem: CartItem;
  handleQuantityChange: (productId: string, change: number) => void;
  onRemove: (id: string) => void;
}

const CartItem = ({
  cartItem,
  onRemove,
  handleQuantityChange,
}: CartItemProps) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <span>
        {cartItem.name} - {cartItem.price}원 x {cartItem.quantity}
      </span>
      <div>
        <button
          className={`quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1`}
          data-product-id={`${cartItem.id}`}
          data-change="-1"
          onClick={() => {
            handleQuantityChange(cartItem.id, -1);
          }}
        >
          -
        </button>
        <button
          className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
          data-product-id={`${cartItem.id}`}
          data-change="1"
          onClick={() => {
            // 수량 증가 로직
            handleQuantityChange(cartItem.id, 1);
          }}
        >
          +
        </button>
        <button
          className="remove-item bg-red-500 text-white px-2 py-1 rounded"
          data-product-id={`${cartItem.id}`}
          onClick={() => {
            // 삭제 로직
            onRemove(cartItem.id);
          }}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default CartItem;
