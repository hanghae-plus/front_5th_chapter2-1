import React from 'react';

interface CartAddButtonProps {
  onClick: () => void;
}

const CartAddButton: React.FC<CartAddButtonProps> = ({ onClick }) => {
  return (
    <button
      id="add-to-cart"
      className="bg-blue-500 text-white px-4 py-2 rounded"
      onClick={onClick}
    >
      추가
    </button>
  );
};

export default CartAddButton;
