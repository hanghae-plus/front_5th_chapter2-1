import type React from "react";
import { useShoppingContext } from "@/advanced/context";
import { formatStockStatusMessage } from "@/advanced/utils";

export const StockStatus: React.FC = () => {
  const { productList } = useShoppingContext();
  
  const stockMessage = productList.reduce((acc, item) => 
    acc + formatStockStatusMessage(item)
  , '');

  return <>{stockMessage}</>;
};