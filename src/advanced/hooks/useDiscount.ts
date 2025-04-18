import { useEffect, useMemo, useState } from 'react';
import { ICartItem, IDiscountStrategy } from '../types';
import { tuesdayDiscount } from '../helpers/discount';
import { POINTS_RATIO } from '../constants';

interface Props {
  cartItems: ICartItem[];
  strategies: IDiscountStrategy[];
}

interface Returns {
  discountRate: number;
  totalAmount: number;
  bonusPoints: number;
}

const useDiscount = ({ cartItems, strategies }: Props): Returns => {
  const [discountResult, setDiscountResult] = useState({
    discountRate: 0,
    totalAmount: 0,
    totalDiscountAmount: 0,
  });

  const memoizedStrategies = useMemo(() => strategies, []);

  const applyDiscount = (
    currentAmount: number,
    rate: number
  ): { newAmount: number; discountAmount: number } => {
    const discountAmount = currentAmount * rate;
    return {
      newAmount: currentAmount - discountAmount,
      discountAmount,
    };
  };

  useEffect(() => {
    let beforeDiscountAmount = 0;
    let itemCount = 0;

    cartItems.forEach(item => {
      beforeDiscountAmount += item.price * item.quantity;
      itemCount += item.quantity;
    });

    let currentAmount = beforeDiscountAmount;
    let totalDiscountAmount = 0;

    const bestStrategy = { name: '', rate: 0 };

    memoizedStrategies.forEach(strategy => {
      const params = { cartItems, amount: beforeDiscountAmount, itemCount };
      const rate = strategy.calculate(params);

      if (rate > bestStrategy.rate) {
        bestStrategy.name = strategy.name;
        bestStrategy.rate = rate;
      }
    });

    if (bestStrategy.rate > 0) {
      const { newAmount, discountAmount } = applyDiscount(currentAmount, bestStrategy.rate);
      currentAmount = newAmount;
      totalDiscountAmount += discountAmount;
    }

    if (new Date().getDay() === 2) {
      const params = { cartItems, amount: beforeDiscountAmount, itemCount };
      const rate = tuesdayDiscount.calculate(params);
      const { newAmount, discountAmount } = applyDiscount(currentAmount, rate);
      currentAmount = newAmount;
      totalDiscountAmount += discountAmount;
    }

    const totalRate = totalDiscountAmount / beforeDiscountAmount;
    setDiscountResult({
      discountRate: totalRate,
      totalAmount: currentAmount,
      totalDiscountAmount,
    });
  }, [cartItems, memoizedStrategies]);

  const bonusPoints = useMemo(
    () => Math.floor(discountResult.totalAmount / POINTS_RATIO),
    [discountResult.totalAmount]
  );

  return {
    discountRate: discountResult.discountRate,
    totalAmount: discountResult.totalAmount,
    bonusPoints,
  };
};

export default useDiscount;
