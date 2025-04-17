import { useCallback } from 'react';
import { useCart, useProduct } from '@/advanced/context';
import { alertOutOfStock } from '@/advanced/utils/alert';
import { getCartCalculation } from '@/advanced/logic';
import type { Product } from '@/advanced/types/product';

interface UseCartItemReturn {
  changeQuantity: (change: number) => void;
  removeItem: () => void;
}

export const useCartItem = (item: Product): UseCartItemReturn => {
  const { cartItems, setCartItems, setCart } = useCart();
  const { productList, setProductList } = useProduct();

  const changeQuantity = useCallback((change: number) => {
    const currentQuantity = item.quantity;
    const newQuantity = currentQuantity + change;
    const product = productList.find(p => p.id === item.id);

    if (!product) return;
    
    const maxAllowed = product.quantity + currentQuantity;

    if (newQuantity <= 0) {
      const newCartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
      setCartItems(newCartItems);
      setProductList(productList.map(product => 
        product.id === item.id 
          ? { ...product, quantity: product.quantity + currentQuantity }
          : product
      ));
      getCartCalculation(newCartItems, setCart);
      return;
    }

    if (newQuantity > maxAllowed) {
      alertOutOfStock();
      return;
    }

    const newCartItems = cartItems.map(cartItem => 
      cartItem.id === item.id 
        ? { ...cartItem, quantity: newQuantity }
        : cartItem
    );

    setCartItems(newCartItems);
    getCartCalculation(newCartItems, setCart);

    setProductList(productList.map(product => 
      product.id === item.id 
        ? { ...product, quantity: product.quantity - change }
        : product
    ));
  }, [cartItems, item, productList, setCart, setCartItems, setProductList]);

  const removeItem = useCallback(() => {
    const newCartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
    setCartItems(newCartItems);
    setProductList(productList.map(product => 
      product.id === item.id 
        ? { ...product, quantity: product.quantity + item.quantity }
        : product
    ));
    getCartCalculation(newCartItems, setCart);
  }, [cartItems, item, productList, setCart, setCartItems, setProductList]);

  return { changeQuantity, removeItem };
};