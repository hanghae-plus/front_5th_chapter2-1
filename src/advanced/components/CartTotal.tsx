import React, { useEffect, useState } from 'react';
import { getState, subscribe } from '../store';

const CartTotal = (): React.ReactElement => {
  const [totalAmount, setTotalAmount] = useState(getState().totalAmount || 0);
  const [discountRate, setDiscountRate] = useState(
    getState().discountRate || 0,
  );
  const [points, setPoints] = useState(
    getState().points || Math.floor(totalAmount / 1000),
  );

  useEffect(() => {
    const unsubscribeTotalAmount = subscribe('totalAmount', () => {
      setTotalAmount(getState().totalAmount);
    });

    const unsubscribeDiscountRate = subscribe('discountRate', () => {
      setDiscountRate(getState().discountRate);
    });

    const unsubscribePoints = subscribe('points', () => {
      setPoints(getState().points);
    });

    return () => {
      unsubscribeTotalAmount();
      unsubscribeDiscountRate();
      unsubscribePoints();
    };
  }, []);

  return (
    <div id="cart-total" className="text-xl font-bold my-4">
      총액: {totalAmount}원
      {discountRate > 0 && (
        <span className="text-green-500 ml-2">
          ({(discountRate * 100).toFixed(1)}% 할인 적용)
        </span>
      )}
      <span id="loyalty-points" className="text-blue-500 ml-2">
        (포인트: {points})
      </span>
    </div>
  );
};

export default CartTotal;
