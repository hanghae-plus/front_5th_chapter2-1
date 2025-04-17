import React from 'react';
import { handleClickAdd } from '../utils/cart-service';

const CartAddButton = (): React.ReactElement => {
  return (
    <button
      id="add-to-cart"
      className="bg-blue-500 text-white px-4 py-2 rounded"
      onClick={handleClickAdd}
    >
      추가
    </button>
  );
};

export default CartAddButton;
