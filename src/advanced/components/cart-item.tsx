import React from "react";

type CartItemProps = {
  id: string;
  name: string;
  val: number;
  quantity: number;
  onChangeQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
};

function CartItem({ id, name, val, quantity, onChangeQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex justify-between items-center mb-2" id={id}>
      <span>
        {name} - {val}원 x {quantity}
      </span>
      <div>
        <button
          className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
          onClick={() => onChangeQuantity(id, -1)}
        >
          -
        </button>
        <button
          className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
          onClick={() => onChangeQuantity(id, 1)}
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
}

export default CartItem;
