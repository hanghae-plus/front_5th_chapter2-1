import type React from "react";
import { STYLES, DOM_IDS } from "@/basic/consts";

export const StockStatusContainer: React.FC = () => {
  return (
    <div 
      id={DOM_IDS.PRODUCT.STOCK_STATUS}
      className={STYLES.TEXT.STOCK}
    />
  );
};