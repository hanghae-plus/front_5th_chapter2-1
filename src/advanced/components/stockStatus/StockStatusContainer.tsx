import type React from "react";
import { STYLES, DOM_IDS } from "@/basic/consts";

interface StockStatusContainerProps {
  children: React.ReactNode;
}

export const StockStatusContainer: React.FC<StockStatusContainerProps> = ({ children }) => {
  return (
    <div 
      id={DOM_IDS.PRODUCT.STOCK_STATUS}
      className={STYLES.TEXT.STOCK}
    >
      {children}
    </div>
  );
};