import type React from "react";
import { useShoppingContext } from "@/advanced/context";
import { formatStockStatusMessage } from "@/advanced/utils";

export const StockStatus: React.FC = () => {
  const { products } = useShoppingContext();
  
  const stockMessage = products.reduce((acc, item) => 
    acc + formatStockStatusMessage(item)
  , '');

  return <>{stockMessage}</>;
};