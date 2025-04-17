import { useCallback } from "react";
import { useCart, useProduct } from "@/advanced/context";
import { getCartCalculation, removeCartItem, updateCartItemQuantity, updateProductStock, canChangeQuantity } from "@/advanced/logic";
import type { Product } from "@/advanced/types";

interface UseCartItemReturn {
  changeQuantity: (change: number) => void;
  removeItem: () => void;
}

export const useCartItem = (item: Product): UseCartItemReturn => {
  const { cartItems, setCartItems, setCart } = useCart();
  const { productList, setProductList } = useProduct();

  const updateCartAndRecalculate = useCallback((newCartItems: Product[]) => {
    setCartItems(newCartItems);
    getCartCalculation(newCartItems, setCart);
  }, [setCartItems, setCart]);

  const changeQuantity = useCallback((change: number) => {
    const product = productList.find(p => p.id === item.id);
    if (!product) return;

    if (item.quantity + change <= 0) {
      const newCartItems = removeCartItem(cartItems, item.id);
      updateCartAndRecalculate(newCartItems);
      setProductList(updateProductStock(productList, item.id, item.quantity));
      return;
    }

    if (!canChangeQuantity(item.quantity, change, product.quantity)) {
      return;
    }

    const newCartItems = updateCartItemQuantity(cartItems, item.id, change);
    updateCartAndRecalculate(newCartItems);
    setProductList(updateProductStock(productList, item.id, -change));
  }, [cartItems, item, productList, setProductList, updateCartAndRecalculate]);

  const removeItem = useCallback(() => {
    const newCartItems = removeCartItem(cartItems, item.id);
    updateCartAndRecalculate(newCartItems);
    setProductList(updateProductStock(productList, item.id, item.quantity));
  }, [cartItems, item, productList, setProductList, updateCartAndRecalculate]);

  return { changeQuantity, removeItem };
};