import React, { useMemo } from "react";
import { DISCOUNTS } from "../../context/product";


const CartPrice = ({ cartItems, products }) => {
  const {
    totalBeforeDiscount,
    totalAfterDiscount,
    discountRate,
    itemCount,
  } = useMemo(() => {
    let totalBeforeDiscount = 0;
    let totalAfterDiscount = 0;
    let itemCount = 0;

    for (const cartItem of cartItems) {
      const product = products.find((p) => p.id === cartItem.id);
      if (!product) continue;

      const qty = cartItem.qty;
      const totalItem = product.price * qty;
      const itemDiscount = discountPrice(cartItem.id, qty);

      totalBeforeDiscount += totalItem;
      totalAfterDiscount += totalItem * (1 - itemDiscount);
      itemCount += qty;
    }

    let discountRate = (totalBeforeDiscount - totalAfterDiscount) / totalBeforeDiscount || 0;

    // 대량 구매 할인
    if (itemCount >= 30) {
      const bulkDiscount = totalAfterDiscount * 0.25;
      const itemDiscount = totalBeforeDiscount - totalAfterDiscount;

      if (bulkDiscount > itemDiscount) {
        totalAfterDiscount = totalBeforeDiscount * 0.75;
        discountRate = 0.25;
      }
    }

    // 화요일 특별 할인
    if (new Date().getDay() === 2) {
      totalAfterDiscount *= 0.9;
      discountRate = Math.max(discountRate, 0.1);
    }

    return {
      totalBeforeDiscount,
      totalAfterDiscount,
      discountRate,
      itemCount,
    };
  }, [cartItems, products]);

  // 적립금 계산
  const bonus = Math.floor(totalAfterDiscount * 0.001); // 예: 1% 적립

  return (
    <div id="cart-total" className="text-xl font-bold my-4">
      <div>총액: {Math.round(totalAfterDiscount)}원
      {discountRate > 0 && (
        <span className="text-green-600">{Math.round(discountRate * 100)}% 할인 적용</span>
      )}
      <span id="loyalty-points" className="text-blue-500 ml-2">포인트: {bonus}P</span>
      </div>
    </div>
  );
};

function discountPrice(id: string, qty: number): number {
  if (qty < 10) return 0;
  return DISCOUNTS[id] || 0;
}

export { CartPrice };
