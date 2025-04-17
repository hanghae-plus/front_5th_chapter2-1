import { useState } from 'react';
import { CartItem, Product } from '../types';

interface UseCartOptions {
  decreaseProductStock: (productId: string) => void;
  increaseProductStock: (productId: string, amount: number) => void;
}

export function useCart({ decreaseProductStock, increaseProductStock }: UseCartOptions) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [lastSelectedProduct, setLastSelectedProduct] = useState<string | null>(null);

  // 카트에 추가 or 수량 증가
  function addToCart(product: Product) {
    if (product.quantity <= 0) {
      alert('선택할 수 없는 상품입니다.');
      return;
    }

    setCartItems(prev => {
      const exist = prev.find(item => item.product.id === product.id);
      if (exist) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    decreaseProductStock(product.id);
    setLastSelectedProduct(product.id);
  }

  // 수량 변경 (+1 또는 -1)
  function changeQuantity(productId: string, amount: number) {
    const existingCartItem = cartItems.find(
      (item) => item.product.id === productId
    );
    if (!existingCartItem) return;
    setCartItems(prev =>
      prev
        .map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );

    // 재고도 반영
    if (amount > 0) {
      decreaseProductStock(productId);
    } else {
      increaseProductStock(productId, -1);
    }
  }


    // 아이템 완전 제거
    function removeFromCart(productId: string) {
      const toRemove = cartItems.find(item => item.product.id === productId);
      if (!toRemove) return;

      // 제거 수량만큼 재고 복구
      increaseProductStock(productId, toRemove.quantity);

      setCartItems(prev =>
        prev.filter(item => item.product.id !== productId)
      );
    }

  return {
    cartItems,
    lastSelectedProduct,
    addToCart,
    changeQuantity,
    removeFromCart,
  };
}