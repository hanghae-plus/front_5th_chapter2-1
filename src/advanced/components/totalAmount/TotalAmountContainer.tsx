import type React from "react";
import { STYLES, DOM_IDS } from "@/basic/consts";
import { TotalAmount } from "./TotalAmount";

export const TotalAmountContainer: React.FC = () => {
  return (
    <div 
      id={DOM_IDS.CART.TOTAL}
      className={STYLES.TEXT.TOTAL}
    >
      <TotalAmount />
    </div>
  );
};