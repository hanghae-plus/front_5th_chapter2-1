import React from 'react';
import { useSumStore } from '../stores/useSumStore';
import { useUpdateDiscountRate } from '../hooks/useUpdateDiscountRate';

const SumView: React.FC = () => {
  const total = useSumStore((state) => state.total);
  const discountRate = useSumStore((state) => state.discountRate);
  const bonusPts = useSumStore((state) => state.bonusPts);

  const TOTAL_TEXT = (total) => `총액: ${Math.round(total)}원`;
  const POINT_TEXT = (pts) => `(포인트: ${pts})`;
  const DISCOUNT_TEXT = (rate) => `(${(rate * 100).toFixed(1)}% 할인 적용)`;

  useUpdateDiscountRate();

  return (
    <div id="cart-total" className="text-xl font-bold my-4">
      {TOTAL_TEXT(total)}
      {discountRate > 0 && (
        <span className="text-green-500 ml-2">{DISCOUNT_TEXT(discountRate)}</span>
      )}
      <span id="loyalty-points" className="text-blue-500 ml-2">
        {POINT_TEXT(bonusPts)}
      </span>
    </div>
  );
};

export default SumView;
