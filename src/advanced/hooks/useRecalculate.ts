import { useCartStore } from '../stores/useCartStore.ts';
import { useSumStore } from '../stores/useSumStore.ts';
import { useEffect } from 'react';

export function UseRecalculate() {
  const cartItems = useCartStore((state) => state.cartItems);
  const updateCart = useSumStore((state) => state.updateCart);

  useEffect(() => {
    updateCart(cartItems); // 장바구니가 바뀌면  재 계산
  }, [cartItems]);
}
