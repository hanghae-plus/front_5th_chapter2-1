import {
  BULK_DISCOUNT_RATE,
  BULK_DISCOUNT_THRESHOLD,
  POINTS_RATIO,
  QUANTITY_DISCOUNT_RATES,
  TUESDAY_DISCOUNT_RATE,
} from '../constants';
import { ICartItem, IDiscountRequestParams, IDiscountStrategy } from '../types';

const bulkPurchaseDiscount: IDiscountStrategy = {
  name: 'bulkPurchaseDiscount',
  calculate: ({ itemCount }) => {
    return itemCount >= BULK_DISCOUNT_THRESHOLD ? BULK_DISCOUNT_RATE : 0;
  },
};

const quantityDiscount: IDiscountStrategy = {
  name: 'quantityDiscount',
  calculate: ({ cartItems }) => {
    let maxDiscountRate = 0;
    cartItems.forEach(item => {
      if (item.quantity >= 10) {
        const rate = QUANTITY_DISCOUNT_RATES[item.id as keyof typeof QUANTITY_DISCOUNT_RATES] || 0;
        maxDiscountRate = Math.max(maxDiscountRate, rate);
      }
    });

    return maxDiscountRate;
  },
};

const tuesdayDiscount: IDiscountStrategy = {
  name: 'tuesdayDiscount',
  calculate: () => {
    return new Date().getDay() === 2 ? TUESDAY_DISCOUNT_RATE : 0;
  },
};

const calculateDiscountRate = (
  params: IDiscountRequestParams,
  strategies: IDiscountStrategy[]
): { rate: number; appliedStrategy: IDiscountStrategy | null } => {
  if (strategies.length === 0) {
    return { rate: 0, appliedStrategy: null };
  }

  // 각 전략의 할인율 계산
  const strategyRates = strategies.map(strategy => ({
    strategy,
    rate: strategy.calculate(params),
  }));

  // 최대 할인율을 제공하는 전략 찾기
  const maxDiscountStrategy = strategyRates.reduce(
    (max, current) => (current.rate > max.rate ? current : max),
    strategyRates[0]
  );

  return {
    rate: maxDiscountStrategy.rate,
    appliedStrategy: maxDiscountStrategy.rate > 0 ? maxDiscountStrategy.strategy : null,
  };
};

function applyDiscount(
  cartItems: ICartItem[],
  strategies: IDiscountStrategy[] = [bulkPurchaseDiscount, quantityDiscount, tuesdayDiscount]
) {
  if (cartItems.length === 0) {
    return {
      subtotal: 0,
      totalAmount: 0,
      discountAmount: 0,
      discountRate: 0,
      appliedDiscount: null,
      bonusPoints: 0,
    };
  }

  let beforeDiscountAmount = 0;
  let itemCount = 0;

  cartItems.forEach(item => {
    beforeDiscountAmount += item.price * item.quantity;
    itemCount += item.quantity;
  });

  const { rate, appliedStrategy } = calculateDiscountRate(
    { cartItems, amount: beforeDiscountAmount, itemCount },
    strategies
  );

  const discountAmount = beforeDiscountAmount * rate;
  const totalAmount = beforeDiscountAmount - discountAmount;
  const bonusPoints = Math.floor(totalAmount / POINTS_RATIO);

  return {
    beforeDiscountAmount,
    totalAmount,
    discountAmount,
    discountRate: rate,
    appliedDiscount: appliedStrategy?.name || null,
    bonusPoints,
  };
}

export {
  bulkPurchaseDiscount,
  quantityDiscount,
  tuesdayDiscount,
  calculateDiscountRate,
  applyDiscount,
};
