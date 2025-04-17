import { useCartContext } from '../context/CartContext';
import { getDiscountedPrice, isTuesday } from '../utils';
import { DISCOUNT } from '../constants';
import { useMemo } from 'react';

const CartTotal = () => {
  const { cartItems } = useCartContext();
  const total = useMemo(() => {
    let subtotalAmount = 0; // 상품 금액 총합
    let totalAmount = 0; // 최종 총액 (할인 적용)
    let totalQuantity = 0; // 상품 개수 총합

    // 장바구니 내 각 상품 합산
    cartItems.forEach((item) => {
      const { price, quantity, bulkDiscountRate } = item;
      const itemTotal = price * quantity;

      subtotalAmount += itemTotal;
      totalQuantity += quantity;

      totalAmount +=
        quantity >= DISCOUNT.BULK.ITEM.LOWER_LIMIT ? getDiscountedPrice(itemTotal, bulkDiscountRate) : itemTotal;
    });

    // 상품 기준 할인율 계산
    let discountRate = (subtotalAmount - totalAmount) / subtotalAmount || 0;

    // 장바구니 대량 할인 가능한 경우, 상품 기준 할인과 비교 후 할인율 높은 방식으로 적용
    if (totalQuantity >= DISCOUNT.BULK.CART.LOWER_LIMIT) {
      const discountedByCart = getDiscountedPrice(subtotalAmount, DISCOUNT.BULK.CART.RATE);

      if (discountedByCart < totalAmount) {
        totalAmount = discountedByCart;
        discountRate = DISCOUNT.BULK.CART.RATE;
      }
    }

    // 화요일인 경우, 추가 할인 적용
    if (isTuesday()) {
      totalAmount = getDiscountedPrice(totalAmount, DISCOUNT.TUESDAY.RATE);
      discountRate = Math.max(discountRate, DISCOUNT.TUESDAY.RATE);
    }

    return {
      amount: Math.round(totalAmount),
      discountRate,
      bonusPoint: Math.floor(totalAmount / 1000),
    };
  }, [cartItems]);

  return (
    <div className="text-xl font-bold my-4">
      <div className="text-xl font-bold my-4">
        총액: {total.amount}원
        {total.discountRate > 0 && (
          <span className="text-green-500 ml-2">({(total.discountRate * 100).toFixed(1)}% 할인 적용)</span>
        )}
        <span className="text-blue-500 ml-2">(포인트: {total.bonusPoint})</span>
      </div>
    </div>
  );
};

export default CartTotal;
