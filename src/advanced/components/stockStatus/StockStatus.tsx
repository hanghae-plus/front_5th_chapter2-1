import type React from "react";
import { useShopping } from "@/advanced/hooks/useShopping";
import { formatStockStatusMessage } from "@/advanced/utils";

export const StockStatus: React.FC = () => {
  const { products } = useShopping();
  
  const stockMessage = products.reduce((acc, item) => 
    acc + formatStockStatusMessage(item)
  , '');

  return <>{stockMessage}</>;
};