import React from 'react';

interface CartSummaryProps {
  totalPrice: number;
  discountRate: number;
  points: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ totalPrice, discountRate, points }) => {
  return (
    <div id="cart-total" className="text-xl font-bold my-4">
      총액: {totalPrice}원
      {discountRate > 0 && (
        <span className="text-green-500 ml-2">({(discountRate * 100).toFixed(1)}% 할인 적용)</span>
      )}
      <span id="loyalty-points" className="text-blue-500 ml-2">
        (포인트: {points})
      </span>
    </div>
  );
};

export default CartSummary;
