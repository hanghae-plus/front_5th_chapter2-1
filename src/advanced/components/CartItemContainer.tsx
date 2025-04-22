import React, { ReactNode } from 'react';

interface CartItemContainerProps {
  children: ReactNode;
}

const CartItemContainer = ({ children }: CartItemContainerProps) => {
  return <div id="cart-items">{children}</div>;
};

export default CartItemContainer;
