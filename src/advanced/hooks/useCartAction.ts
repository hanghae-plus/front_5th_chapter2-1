import { useCallback } from 'react';
import { Item } from '../types';

export const useCartActions = (
  items: Item[],
  selectedId: string,
  cartItems: { itemId: string; quantity: number }[],
  addItemToCart: (itemId: string, quantity: number) => void,
  changeItemQuantity: (itemId: string, change: number) => void,
  removeItem: (itemId: string) => void,
  updateItemQuantity: (itemId: string, change: number) => void
) => {
  const handleAddToCart = useCallback(() => {
    const itemToAdd = items.find((p) => p.id === selectedId);

    if (!itemToAdd || itemToAdd.q <= 0) {
      alert('선택한 상품의 재고가 없습니다.');
      return null;
    }

    addItemToCart(selectedId, 1);
    updateItemQuantity(selectedId, 1);
    return selectedId;
  }, [selectedId, items, addItemToCart, updateItemQuantity]);

  const handleQuantityChange = useCallback(
    (itemId: string, change: number) => {
      const item = items.find((i) => i.id === itemId);
      const cartItem = cartItems.find((item) => item.itemId === itemId);

      if (!item || !cartItem) return;

      if (change > 0 && item.q < change) {
        alert('재고가 부족합니다.');
        return;
      }

      changeItemQuantity(itemId, change);
      updateItemQuantity(itemId, change);
    },
    [items, cartItems, changeItemQuantity, updateItemQuantity]
  );

  const handleRemoveItem = useCallback(
    (itemId: string) => {
      const cartItem = cartItems.find((item) => item.itemId === itemId);
      if (!cartItem) return;

      // 재고 복구
      updateItemQuantity(itemId, -cartItem.quantity);
      removeItem(itemId);
    },
    [cartItems, removeItem, updateItemQuantity]
  );

  return {
    handleAddToCart,
    handleQuantityChange,
    handleRemoveItem,
  };
};
