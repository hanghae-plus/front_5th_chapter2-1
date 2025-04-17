import type React from "react";
import { STYLES, DOM_IDS } from "@/basic/consts";
import { StockStatus } from "./StockStatus";
export const StockStatusContainer: React.FC = () => {
  return (
    <div 
      id={DOM_IDS.PRODUCT.STOCK_STATUS}
      className={STYLES.TEXT.STOCK}
    >
      <StockStatus />
    </div>
  );
};