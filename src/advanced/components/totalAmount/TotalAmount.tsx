import type React from "react";
import { STYLES } from "@/basic/consts";
import { formatPrice, formatDiscountRate } from "@/advanced/utils";
import { useCart } from "@/advanced/context";
import { getDiscountRate } from "@/advanced/logic";
import { BonusPoints } from "./BonutPoints";

export const TotalAmount: React.FC = () => {
  const { cart, setCart } = useCart();
  const discountRate = getDiscountRate({
    itemCount: cart.itemCount,
    totalAmount: cart.totalAmount,
    subTotal: cart.subTotal,
    setCart: setCart
  });

  return (
    <>
      총액: {formatPrice(cart.totalAmount)}
      {discountRate > 0 && (
        <span className={STYLES.TEXT.SUCCESS}>
          ({formatDiscountRate(discountRate)} 할인 적용)
        </span>
      )}
      <BonusPoints totalAmount={cart.totalAmount} />
    </>
  );
};