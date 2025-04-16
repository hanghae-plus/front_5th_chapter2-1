import { CartItemList } from "./CartItemList";
import { ProductSelector } from "./ProductSelector";
import { OutOfStockIndicator } from "./OutOfStockIndicator";
import { CartTotal } from "./CartTotal";
import { useFlashSaleAlert } from "@advanced/lib/hooks/alert/useFlashSaleAlert";
import { useOutOfStockAlert } from "@advanced/lib/hooks/alert/useOutOfStockAlert";
import { useEffect } from "react";

export function CartContainer() {
  const { registerOutOfStockAlert } = useOutOfStockAlert();
  const { registerFlashSale, registerSuggestFlashSale } = useFlashSaleAlert();

  useEffect(() => {
    registerOutOfStockAlert();
    registerFlashSale();
    registerSuggestFlashSale();

    return () => {
      registerOutOfStockAlert();
      registerFlashSale();
      registerSuggestFlashSale();
    };
  }, [registerOutOfStockAlert, registerFlashSale, registerSuggestFlashSale]);

  return (
    <div className="space-y-4">
      <div className="space-y-0.5">
        <ProductSelector />
        <OutOfStockIndicator />
      </div>
      <CartItemList />
      <CartTotal />
    </div>
  );
}
