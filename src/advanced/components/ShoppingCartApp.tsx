import React, { useCallback } from 'react';

import { CartItemList } from './CartItemList';
import { CartTotal } from './CartTotal';
import { ProductSelector } from './ProductSelector';
import { StockStatus } from './StockStatus';

import useProduct from '../hooks/useProduct';
import useCart from '../hooks/useCart';
import useDiscount from '../hooks/useDiscount';
import usePromotion from '../hooks/usePromotion';

import { bulkPurchaseDiscount, quantityDiscount } from '../helpers/discount';

export const ShoppingCartApp: React.FC = () => {
  const { products } = useProduct();

  const { cartItems, addCartItem, updateCartItem, removeCartItem } = useCart();
  const { setLastSelectedProductId } = usePromotion();

  const handleAddToCart = useCallback(
    (productId: string) => {
      addCartItem(productId);
      setLastSelectedProductId(productId);
    },
    [addCartItem, setLastSelectedProductId]
  );

  const handleChangeQuantity = useCallback(
    (productId: string, change: number) => {
      updateCartItem(productId, change);
    },
    [updateCartItem]
  );

  const handleRemoveItem = useCallback(
    (productId: string) => {
      removeCartItem(productId);
    },
    [removeCartItem]
  );

  const { discountRate, totalAmount, bonusPoints } = useDiscount({
    cartItems,
    strategies: [bulkPurchaseDiscount, quantityDiscount],
  });

  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 className="text-2xl font-bold mb-4">장바구니</h1>

        <CartItemList
          cartItems={cartItems}
          onChangeQuantity={handleChangeQuantity}
          onRemoveItem={handleRemoveItem}
        />

        <CartTotal
          totalAmount={totalAmount}
          discountRate={discountRate}
          bonusPoints={bonusPoints}
        />

        <ProductSelector products={products} onAddToCart={handleAddToCart} />

        <StockStatus products={products} />
      </div>
    </div>
  );
};
