import React from 'react';
import { AddProduct } from './components/AddProduct';
import { CartDisplay } from './components/CartDisplay';
import { useCart } from './logic';
import { ElementIds } from '../../../shared/app/constants';

export const Cart: React.FC = () => {
  const { 
    cart,
    totalAmount,
    discountRate,
    bonusPoints,
    handleAddToCart,
    handleQuantityChange,
    handleRemoveItem,
    stockStatus
  } = useCart();

  return (
    <div className= 'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8'>

      <h1 className="text-2xl font-bold mb-4">장바구니</h1>
      <div id={ElementIds.CART_DISP} className="mt-4">
        <CartDisplay 
          cart={cart}
          onQuantityChange={handleQuantityChange}
          onRemoveItem={handleRemoveItem}
        />
      </div>
      <div id={ElementIds.SUM} className="text-xl font-bold my-4">
        총액: {Math.round(totalAmount)}원
        {discountRate > 0 && (
          <span className="text-green-500 ml-2">
            ({(discountRate * 100).toFixed(1)}% 할인 적용)
          </span>
        )}
        <span id={ElementIds.LOYALTY_POINTS}>(포인트: {bonusPoints})</span>
      </div>
      <AddProduct onAddToCart={handleAddToCart} />
      
     
      <div id={ElementIds.STOCK_STATUS} className="text-gray-600">
        {stockStatus.map((status, index) => (
          <div key={status+index}>{status}</div>
        ))}
      </div>
    </div>
  );
}; 