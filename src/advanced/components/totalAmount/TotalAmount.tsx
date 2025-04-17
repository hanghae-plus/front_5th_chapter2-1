import type React from "react";
import { STYLES } from "@/basic/consts";
import { BonusPoints } from "./BonusPoints";
import { useShoppingContext } from "@/advanced/context";
import { formatPrice, formatDiscountRate } from "@/advanced/utils";
import { getDiscountRate } from "@/advanced/logic/discount";

export const TotalAmount: React.FC = () => {
  const { cartItems, totalAmount } = useShoppingContext();
  
  const discountRate = getDiscountRate({
    itemCount: cartItems.length,
    totalAmount,
    subTotal: cartItems.reduce((acc, item) => acc + item.value * item.quantity, 0),
  });

  const hasDiscount = discountRate > 0;

  return (
    <>
      총액: {formatPrice(totalAmount)}
      {hasDiscount && (
        <span className={STYLES.TEXT.SUCCESS}>
          ({formatDiscountRate(discountRate)} 할인 적용)
        </span>
      )}
      <BonusPoints totalAmount={totalAmount} />
    </>
  );
};