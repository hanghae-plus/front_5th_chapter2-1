import type React from "react";
import { formatStockStatusMessage } from "@/advanced/utils/format";
import { useProduct } from "@/advanced/context";

export const StockStatus: React.FC = () => {
  const { productList } = useProduct();

  const infoMessage = productList.reduce((acc, item) => {
    return acc + formatStockStatusMessage(item);
  }, '');

  return <>{infoMessage}</>;
};