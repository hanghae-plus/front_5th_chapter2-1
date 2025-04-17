import { useCallback } from 'react';
import { alertOutOfStock } from '@/advanced/utils/alert';
import type { Product, CartItem } from '@/advanced/types';

export const useCartActions = (
  productList: Product[],
  cartItems: CartItem[],
  setProductList: React.Dispatch<React.SetStateAction<Product[]>>,
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>,
) => {
  const addProductToCart = useCallback((productId: string) => {
    const product = productList.find((p) => p.id === productId);

    if (!product || product.quantity <= 0) {
      alertOutOfStock();
      return;
    }

    setProductList((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, quantity: p.quantity - 1 } : p,
      ),
    );

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing) {
        return prev.map((item) =>
          item.id === productId
            ? { 
                ...item, 
                quantity: item.quantity + 1,
                value: product.value // 현재 상품의 가격으로 업데이트
              }
            : item,
        );
      }
      return [...prev, { 
        ...product, 
        quantity: 1,
        value: product.value // 현재 상품의 가격으로 설정
      }];
    });
  }, [productList, setProductList, setCartItems]);

  const updateProductQuantity = useCallback((productId: string, change: number) => {
    const product = productList.find((p) => p.id === productId);
    const cartItem = cartItems.find((item) => item.id === productId);
    if (!product || !cartItem) return;

    const newQuantity = cartItem.quantity + change;
    const maxAllowed = product.quantity + cartItem.quantity;

    if (newQuantity <= 0) {
      removeProductFromCart(productId);
      return;
    }

    if (newQuantity > maxAllowed) {
      alertOutOfStock();
      return;
    }

    setProductList((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, quantity: p.quantity - change } : p,
      ),
    );

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  }, [productList, cartItems, setProductList, setCartItems]);

  const removeProductFromCart = useCallback((productId: string) => {
    const cartItem = cartItems.find((item) => item.id === productId);
    if (!cartItem) return;

    setProductList((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, quantity: p.quantity + cartItem.quantity } : p,
      ),
    );

    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  }, [cartItems, setProductList, setCartItems]);

  return {
    addProductToCart,
    updateProductQuantity,
    removeProductFromCart,
  };
};