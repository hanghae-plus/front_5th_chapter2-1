import { useCallback } from 'react';
import { CartItem, Product } from '../types';

export const useCart = (
  products: Product[],
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  cartItems: CartItem[],
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>
) => {
  // 장바구니에 상품을 추가하는 함수
  const addToCart = useCallback(
    (productId: string) => {
      const product = products.find(p => p.id === productId);

      if (!product || product.quantity < 1) {
        alert('재고가 부족합니다.');
        return;
      }

      setCartItems(prev => {
        const existing = prev.find(item => item.productId === productId);

        return existing
          ? prev.map(item =>
              item.productId === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...prev, { productId, quantity: 1 }];
      });

      setProducts(prev =>
        prev.map(p =>
          p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
        )
      );
    },
    [products, setCartItems, setProducts]
  );
  /// 장바구니에 담긴 상품의 수량을 변경하는 함수
  const changeQuantity = useCallback(
    (productId: string, delta: number) => {
      const product = products.find(p => p.id === productId);
      const cartItem = cartItems.find(item => item.productId === productId);

      if (!product || !cartItem) return;

      const newQuantity = cartItem.quantity + delta;

      // 재고가 부족한 경우
      if (delta > 0 && product.quantity < 1) {
        alert('재고가 부족합니다.');
        return;
      }

      if (newQuantity <= 0) {
        removeItem(productId);
        return;
      }

      setCartItems(prev =>
        prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );

      setProducts(prev =>
        prev.map(p =>
          p.id === productId ? { ...p, quantity: p.quantity - delta } : p
        )
      );
    },
    [products, cartItems, setCartItems, setProducts]
  );

  // 장바구니에서 상품을 삭제하는 함수
  const removeItem = useCallback(
    (productId: string) => {
      const cartItem = cartItems.find(item => item.productId === productId);
      if (!cartItem) return;

      setCartItems(prev => prev.filter(item => item.productId !== productId));

      setProducts(prev =>
        prev.map(p =>
          p.id === productId
            ? { ...p, quantity: p.quantity + cartItem.quantity }
            : p
        )
      );
    },
    [cartItems, setCartItems, setProducts]
  );

  return {
    addToCart,
    changeQuantity,
    removeItem,
  };
};
