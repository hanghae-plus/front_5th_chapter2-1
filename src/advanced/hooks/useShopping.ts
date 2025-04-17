import { useState } from 'react';
import { useCartActions } from './useCartActions';
import { useProductState } from './useProductState';
import { useSelectedProduct } from './useSelectedProduct';
import { useCartCalculations } from './useCartCalculation';
import type { CartItem } from '@/advanced/types';

export const useShopping = () => {
  const { products, setProducts } = useProductState();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  const { selectedProductId, setSelectedProductId } = useSelectedProduct();
  const {
    itemCount,
    subTotal,
    totalAmount,
    discountRate,
  } = useCartCalculations(cartItems);
  const { addProductToCart, updateProductQuantity, removeProductFromCart } =
    useCartActions(products, cartItems, setProducts, setCartItems);

  return {
    products,
    cartItems,
    selectedProductId,
    itemCount,
    subTotal,
    totalAmount,
    discountRate,
    setSelectedProductId,
    addProductToCart,
    updateProductQuantity,
    removeProductFromCart,
  };
};