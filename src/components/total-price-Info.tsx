import { LOYALTY_POINT_RATE } from '@/constants/constants';
import useCalcPrice from '@/hooks/useCalcPrice';
import React from 'react';

export default function TotalPriceInfo() {
  const { totalAmount, totalDiscountRate } = useCalcPrice();

  return (
    <div id="cart-total" className="text-xl font-bold my-4">
      {`총액: ${totalAmount}원`}
      {totalDiscountRate > 0 && (
        <span className="text-green-500 ml-2">{`(${totalDiscountRate.toFixed(1)}% 할인 적용)`}</span>
      )}
      <span id="loyalty-points" className="text-blue-500 ml-2">
        {`(포인트: ${totalAmount * LOYALTY_POINT_RATE})`}
      </span>
    </div>
  );
}
