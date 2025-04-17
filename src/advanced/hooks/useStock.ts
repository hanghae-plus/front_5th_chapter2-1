import { useState } from 'react';
import { Item } from '../types';

export const useStock = (initialItems: Item[]) => {
  const [items, setItems] = useState<Item[]>(initialItems);

  const updateItemQuantity = (itemId: string, change: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === itemId ? { ...item, q: item.q - change } : item))
    );
  };

  const updateItemPrice = (itemId: string, newPrice: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === itemId ? { ...item, value: newPrice } : item))
    );
  };

  const applyDiscount = (itemId: string, discountPercent: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, value: Math.round(item.value * (1 - discountPercent)) }
          : item
      )
    );
  };

  return {
    items,
    setItems,
    updateItemQuantity,
    updateItemPrice,
    applyDiscount,
  };
};
