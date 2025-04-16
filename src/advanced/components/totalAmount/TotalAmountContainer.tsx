import type React from "react";
import { STYLES, DOM_IDS } from "@/basic/consts";

interface TotalAmountContainerProps {
  children: React.ReactNode;
}

export const TotalAmountContainer: React.FC<TotalAmountContainerProps> = ({ children }) => {
  return (
    <div 
      id={DOM_IDS.CART.TOTAL}
      className={STYLES.TEXT.TOTAL}
    >
      {children}
    </div>
  );
};