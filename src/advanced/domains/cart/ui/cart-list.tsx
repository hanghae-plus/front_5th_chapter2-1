import React from 'react';

import { useAppContext } from '../../../app/app-context';
import CartItem from './cart-item';

const CartList = () => {
  const {
    state: { cartItems },
  } = useAppContext();

  return (
    <div id="cart-items" data-testid="cart-items" className="my-4 space-y-2">
      {cartItems.map((cartItem) => (
        <CartItem key={cartItem.id} cartItem={cartItem} />
      ))}
    </div>
  );
};

export default CartList;
