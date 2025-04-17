import type React from "react";
import { STYLES } from "@/basic/consts";
import { formatPrice, formatDiscountRate } from "@/advanced/utils/format";
import { useCart } from "@/advanced/context";
import { getDiscountRate } from "@/advanced/logic";

export const TotalAmount: React.FC = () => {
  const { cart } = useCart();
  const discountRate = getDiscountRate(cart.itemCount, cart.totalAmount, cart.subTotal);

  return (
    <>
      총액: {formatPrice(cart.totalAmount)}
      {discountRate > 0 && (
        <span className={STYLES.TEXT.SUCCESS}>
          ({formatDiscountRate(discountRate)} 할인 적용)
        </span>
      )}
    </>
  );
};