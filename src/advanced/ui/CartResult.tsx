import React, { useEffect, useState } from 'react';
import { CartListType } from '../App';

interface CartResultProps {
  cartList: CartListType[];
}
const CartResult = ({ cartList }: CartResultProps) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [discountRate, setDiscountRate] = useState(0);
  const [bonusPoint, setBonusPoint] = useState(0);

  useEffect(() => {
    // 장바구니 계산 함수
    const calculateCartTotal = () => {
      // 계산 값 초기화
      let itemCount = 0;
      let calculatedTotal = 0;
      let subtotal = 0;
      let calculatedDiscountRate = 0;

      // 장바구니에 아이템이 있는 경우에만 계산
      if (cartList && cartList.length > 0) {
        // 각 상품별 계산
        for (const item of cartList) {
          const quantity = item.quantity;
          const itemTotal = item.price * quantity;

          // 수량별 할인 계산
          let discount = 0;
          if (quantity >= 10) {
            // 상품별 할인율 적용
            if (item.id === 'p1') discount = 0.1;
            else if (item.id === 'p2') discount = 0.15;
            else if (item.id === 'p3') discount = 0.2;
            else if (item.id === 'p4') discount = 0.05;
            else if (item.id === 'p5') discount = 0.25;
          }

          itemCount += quantity;
          subtotal += itemTotal;
          calculatedTotal += itemTotal * (1 - discount);
        }

        // 대량 구매 할인 적용 (30개 이상 구매 시 25% 할인)
        if (itemCount >= 30) {
          const bulkDiscount = calculatedTotal * 0.25;
          const itemDiscount = subtotal - calculatedTotal;

          // 더 큰 할인을 적용
          if (bulkDiscount > itemDiscount) {
            calculatedTotal = subtotal * (1 - 0.25);
            calculatedDiscountRate = 0.25;
          } else {
            calculatedDiscountRate = (subtotal - calculatedTotal) / subtotal;
          }
        } else if (subtotal > 0) {
          calculatedDiscountRate = (subtotal - calculatedTotal) / subtotal;
        }

        // 화요일 할인 적용 (10% 추가 할인)
        if (new Date().getDay() === 2) {
          calculatedTotal *= 0.9; // 10% 할인
          calculatedDiscountRate = Math.max(calculatedDiscountRate, 0.1);
        }
      }

      // 보너스 포인트 계산 (1,000원당 1점)
      const points = Math.floor(calculatedTotal / 1000);

      // 상태 업데이트
      setTotalAmount(calculatedTotal);
      setDiscountRate(calculatedDiscountRate);
      setBonusPoint(points);
    };

    // 장바구니 계산 실행
    calculateCartTotal();
  }, [cartList]);

  return (
    <div id="cart-total" className="text-xl font-bold my-4">
      총액: {Math.round(totalAmount)}원
      {discountRate > 0 && (
        <span className="text-green-500 ml-2">({(discountRate * 100).toFixed(1)}% 할인 적용)</span>
      )}
      <span className="text-blue-500 ml-2" id="loyalty-points">
        (포인트: {bonusPoint})
      </span>
    </div>
  );
};

export default CartResult;
