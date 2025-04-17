import { useState } from 'react';
import { useCartActions } from './useCartActions';
import { useProductState } from './useProductState';
import { useSelectedProduct } from './useSelectedProduct';
import { useCartCalculations } from './useCartCalculation';
import type { CartItem } from '@/advanced/types';

export const useShopping = () => {
  const { productList, setProductList } = useProductState();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const { selectedProductId, setSelectedProductId } = useSelectedProduct(productList[0].id);
  const {
    itemCount,
    subTotal,
    totalAmount,
    discountRate,
  } = useCartCalculations(cartItems);
  const { addProductToCart, updateProductQuantity, removeProductFromCart } =
    useCartActions(productList, cartItems, setProductList, setCartItems);


  return {
    productList,
    cartItems,
    selectedProductId,
    itemCount,
    subTotal,
    totalAmount,
    discountRate,
    setProductList,
    setSelectedProductId,
    addProductToCart,
    updateProductQuantity,
    removeProductFromCart,
  };
};