import React from 'react';
import { ICartItem } from '../types';
import CartItem from './CartItem';

interface CartItemListProps {
  cartItems: ICartItem[];
  onChangeQuantity: (productId: string, change: number) => void;
  onRemoveItem: (productId: string) => void;
}

export const CartItemList: React.FC<CartItemListProps> = ({
  cartItems,
  onChangeQuantity,
  onRemoveItem,
}) => {
  return (
    <div id="cart-items">
      {!cartItems.length
        ? '장바구니가 비어 있습니다.'
        : cartItems.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onChangeQuantity={onChangeQuantity}
              onRemoveItem={onRemoveItem}
            />
          ))}
    </div>
  );
};
