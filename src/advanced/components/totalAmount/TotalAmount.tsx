import type React from "react";
import { STYLES } from "@/basic/consts";
import { BonusPoints } from "./BonusPoints";
import { useTotalAmount } from "@/advanced/hooks";

export const TotalAmount: React.FC = () => {
  const { formattedTotalAmount, hasDiscount, formattedDiscountRate, totalAmount } = useTotalAmount();

  return (
    <>
      총액: {formattedTotalAmount}
      {hasDiscount && <span className={STYLES.TEXT.SUCCESS}>({formattedDiscountRate} 할인 적용)</span>}
      <BonusPoints totalAmount={totalAmount} />
    </>
  );
};
