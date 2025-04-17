import type React from "react";
import { useStockStatus } from "@/advanced/hooks";

export const StockStatus: React.FC = () => {
  const { stockMessage } = useStockStatus();
  return <>{stockMessage}</>;
};