import React, { createContext, useCallback, useContext, useState } from 'react';
import { Product, useProduct } from './ProductProvider';
import { getDiscountRate, getBulkDiscountRate } from '../utils/discountUtils';

interface Cart {
  discountRate: number;
  cartItemTotalQuantity: number;
  cartTotalPrice: number;
  subTotalPrice: number;
  selectedCartItems: Product[];
}

interface ICartContext {
  cartState: Cart;
  isSelectedCartItem: (productId: string) => boolean;
  createCartItem: (addItem: Product) => void;
  addCartItem: (productId: string) => void;
  decreaseCartItem: (productId: string) => void;
  removeCartItem: (targetProduct: Product) => void;
  selectedItemId: string;
  setSelectedItemId: (productId: string) => void;
}

const CartContext = createContext<ICartContext | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartState, setCartState] = useState<Cart>({
    discountRate: 0,
    cartItemTotalQuantity: 0,
    cartTotalPrice: 0,
    subTotalPrice: 0,
    selectedCartItems: [],
  });
  const [selectedItemId, setSelectedItemId] = useState<string>('p1');

  const { stockDecrease, getFindProduct, stockIncrease } = useProduct();

  const createCartItem = useCallback(
    (addItem: Product) => {
      setCartState((prev) => {
        const newQuantity = prev.cartItemTotalQuantity + 1;
        const newSubTotalPrice = prev.subTotalPrice + addItem.price;
        const newTotalPrice = prev.cartTotalPrice + addItem.price;
        const newDiscountRate = getDiscountRate(1, addItem.id);

        return {
          ...prev,
          discountRate: newDiscountRate,
          cartItemTotalQuantity: newQuantity,
          cartTotalPrice: newTotalPrice,
          subTotalPrice: newSubTotalPrice,
          selectedCartItems: [...prev.selectedCartItems, addItem],
        };
      });

      stockDecrease(addItem.id);
    },
    [stockDecrease],
  );

  const addCartItem = useCallback(
    (productId: string) => {
      const targetProduct = getFindProduct(productId);
      const isAvailableQuantity = (targetProduct?.quantity ?? 0) > 0;

      const targetCartItem = cartState.selectedCartItems.find(
        (item) => item.id === productId,
      );

      if (!isAvailableQuantity) {
        alert('재고가 부족합니다.');
        return;
      }

      setCartState((prev) => {
        const updatedItems = prev.selectedCartItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );

        const newQuantity = prev.cartItemTotalQuantity + 1;
        const newSubTotalPrice = prev.subTotalPrice + targetCartItem!.price;

        // Calculate new total price with discounts
        const newTotalPrice = updatedItems.reduce((total, item) => {
          const itemDiscountRate = getDiscountRate(item.quantity, item.id);
          return total + item.price * item.quantity * (1 - itemDiscountRate);
        }, 0);

        // Calculate bulk discount if applicable
        const bulkDiscountRate = getBulkDiscountRate(
          newQuantity,
          newTotalPrice,
          newSubTotalPrice,
        );

        // Apply the higher discount rate
        const finalDiscountRate = Math.max(
          getDiscountRate(targetCartItem!.quantity + 1, targetCartItem!.id),
          bulkDiscountRate,
        );

        return {
          ...prev,
          discountRate: finalDiscountRate,
          cartItemTotalQuantity: newQuantity,
          cartTotalPrice: newTotalPrice,
          subTotalPrice: newSubTotalPrice,
          selectedCartItems: updatedItems,
        };
      });

      stockDecrease(productId);
    },
    [getFindProduct, stockDecrease, cartState.selectedCartItems],
  );

  const decreaseCartItem = useCallback(
    (productId: string) => {
      const targetCartItem = cartState.selectedCartItems.find(
        (product) => product.id === productId,
      );

      if (targetCartItem!.quantity <= 1) {
        removeCartItem(targetCartItem!);
        return;
      }

      setCartState((prev) => {
        const updatedItems = prev.selectedCartItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );

        const newQuantity = prev.cartItemTotalQuantity - 1;
        const newSubTotalPrice = prev.subTotalPrice - targetCartItem!.price;

        // Calculate new total price with discounts
        const newTotalPrice = updatedItems.reduce((total, item) => {
          const itemDiscountRate = getDiscountRate(item.quantity, item.id);
          return total + item.price * item.quantity * (1 - itemDiscountRate);
        }, 0);

        // Calculate bulk discount if applicable
        const bulkDiscountRate = getBulkDiscountRate(
          newQuantity,
          newTotalPrice,
          newSubTotalPrice,
        );

        // Apply the higher discount rate
        const finalDiscountRate = Math.max(
          getDiscountRate(targetCartItem!.quantity - 1, targetCartItem!.id),
          bulkDiscountRate,
        );

        return {
          ...prev,
          discountRate: finalDiscountRate,
          cartItemTotalQuantity: newQuantity,
          cartTotalPrice: newTotalPrice,
          subTotalPrice: newSubTotalPrice,
          selectedCartItems: updatedItems,
        };
      });

      stockIncrease(productId);
    },
    [getFindProduct, stockIncrease, cartState.selectedCartItems],
  );

  const removeCartItem = useCallback(
    (targetProduct: Product) => {
      setCartState((prev) => {
        const updatedItems = prev.selectedCartItems.filter(
          (item) => item.id !== targetProduct.id,
        );

        const newQuantity = prev.cartItemTotalQuantity - targetProduct.quantity;
        const newSubTotalPrice =
          prev.subTotalPrice - targetProduct.price * targetProduct.quantity;

        // Calculate new total price with discounts
        const newTotalPrice = updatedItems.reduce((total, item) => {
          const itemDiscountRate = getDiscountRate(item.quantity, item.id);
          return total + item.price * item.quantity * (1 - itemDiscountRate);
        }, 0);

        // Calculate bulk discount if applicable
        const bulkDiscountRate = getBulkDiscountRate(
          newQuantity,
          newTotalPrice,
          newSubTotalPrice,
        );

        return {
          ...prev,
          discountRate: bulkDiscountRate,
          cartItemTotalQuantity: newQuantity,
          cartTotalPrice: newTotalPrice,
          subTotalPrice: newSubTotalPrice,
          selectedCartItems: updatedItems,
        };
      });
    },
    [cartState.selectedCartItems],
  );

  const isSelectedCartItem = useCallback(
    (productId: string) => {
      return cartState.selectedCartItems.some(
        (product) => product.id === productId,
      );
    },
    [cartState.selectedCartItems],
  );

  return (
    <CartContext.Provider
      value={{
        cartState,
        isSelectedCartItem,
        createCartItem,
        addCartItem,
        decreaseCartItem,
        removeCartItem,
        selectedItemId,
        setSelectedItemId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
