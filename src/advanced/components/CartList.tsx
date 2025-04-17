// src/components/CartList.tsx
import React from 'react';
import { Item, CartItem } from '../types';
import CartItemComponent from './CartItemComponent';

interface CartListProps {
  cartItems: CartItem[];
  items: Item[];
  onQuantityChange: (itemId: string, change: number) => void;
  onRemoveItem: (itemId: string) => void;
}

const CartList: React.FC<CartListProps> = ({
  cartItems,
  items,
  onQuantityChange,
  onRemoveItem,
}) => {
  return (
    <div id="cart-items">
      {cartItems.map((item) => {
        const currentItem = items.find((p) => p.id === item.itemId);
        if (!currentItem) return null;

        return (
          <CartItemComponent
            key={item.itemId}
            ItemId={item.itemId}
            quantity={item.quantity}
            item={currentItem}
            onQuantityChange={onQuantityChange}
            onRemoveItem={onRemoveItem}
          />
        );
      })}
    </div>
  );
};

export default CartList;
