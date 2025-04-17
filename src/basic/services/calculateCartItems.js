import { DISCOUNT } from '../constants';
import { getDiscountedPrice, isTuesday } from '../utils';

export const calculateCartItem = (cartItems) => {
  let subtotal = 0; // 상품 금액 총합
  let total = 0; // 최종 총액 (할인 적용)
  let totalQuantity = 0; // 상품 개수 총합

  // 장바구니 내 각 상품 합산
  cartItems.forEach((item) => {
    const { price, quantity, bulkDiscountRate } = item;
    const itemTotal = price * quantity;

    subtotal += itemTotal;
    totalQuantity += quantity;

    total += quantity >= DISCOUNT.BULK.ITEM.LOWER_LIMIT ? getDiscountedPrice(itemTotal, bulkDiscountRate) : itemTotal;
  });

  // 상품 기준 할인율 계산
  let discountRate = (subtotal - total) / subtotal || 0;

  // 장바구니 대량 할인 가능한 경우, 상품 기준 할인과 비교 후 할인율 높은 방식으로 적용
  if (totalQuantity >= DISCOUNT.BULK.CART.LOWER_LIMIT) {
    const discountedByCart = getDiscountedPrice(subtotal, DISCOUNT.BULK.CART.RATE);

    if (discountedByCart < total) {
      total = discountedByCart;
      discountRate = DISCOUNT.BULK.CART.RATE;
    }
  }

  // 화요일인 경우, 추가 할인 적용
  if (isTuesday()) {
    total = getDiscountedPrice(total, DISCOUNT.TUESDAY.RATE);
    discountRate = Math.max(discountRate, DISCOUNT.TUESDAY.RATE);
  }

  return {
    total: Math.round(total),
    discountRate,
    bonusPoint: Math.floor(total / 1000),
  };
};
