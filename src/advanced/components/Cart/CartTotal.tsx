import React from 'react';

interface CartTotalProps {
  totalAmount: number;
  discountRate: number;
  bonusPoints: number;
}

export const CartTotal: React.FC<CartTotalProps> = ({ totalAmount, discountRate, bonusPoints }) => {
  return (
    <div id="cart-total" className="text-xl font-bold my-4">
      총액: {Math.round(totalAmount)}원
      {discountRate > 0 && (
        <span className="text-green-500 ml-2">({(discountRate * 100).toFixed(1)}% 할인 적용)</span>
      )}
      {bonusPoints > 0 && (
        <span id="loyalty-points" className="text-blue-500 ml-2">
          (포인트: {bonusPoints})
        </span>
      )}
    </div>
  );
};

export default CartTotal;
