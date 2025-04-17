import React from 'react';
import { ICartProduct } from '../type/product';
import { calculateCartTotals } from '../util/calculateCartTotals';
import { applyDiscount } from '../util/applyDiscount';

interface IProps {
  products: ICartProduct[];
}

function CartTotal({ products }: IProps) {
  const { totalBeforeDiscount, totalAfterItemDiscount, productCount } =
    calculateCartTotals(products);
  const { finalTotal, appliedDiscountRate } = applyDiscount(
    totalBeforeDiscount,
    totalAfterItemDiscount,
    productCount,
  );

  const point = Math.floor(finalTotal / 1000);

  return (
    <div id='cart-total' className='text-xl font-bold my-4'>
      총액: {Math.round(finalTotal)}원
      {appliedDiscountRate > 0 ? (
        <span className='text-green-500 ml-2'>
          {(appliedDiscountRate * 100).toFixed(1)}% 할인 적용
        </span>
      ) : (
        ''
      )}
      <span className='text-blue-500 ml-2'>(포인트: {point})</span>
    </div>
  );
}

export { CartTotal };
