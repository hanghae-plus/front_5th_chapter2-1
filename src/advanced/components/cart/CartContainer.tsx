import { useOutOfStockAlert } from "@advanced/lib/hooks/alert/useOutOfStockAlert";
import { useSaleAlert } from "@advanced/lib/hooks/alert/useSaleAlert";
import { useEffect } from "react";
import { CartItemList } from "./CartItemList";
import { CartTotal } from "./CartTotal";
import { OutOfStockIndicator } from "./OutOfStockIndicator";
import { ProductSelector } from "./ProductSelector";

export function CartContainer() {
  const { registerOutOfStockAlert } = useOutOfStockAlert();
  const { registerFlashSale, registerRecommendSale } = useSaleAlert();

  useEffect(() => {
    registerOutOfStockAlert();
    registerFlashSale();
    registerRecommendSale();

    return () => {
      registerOutOfStockAlert();
      registerFlashSale();
      registerRecommendSale();
    };
  }, [registerOutOfStockAlert, registerFlashSale, registerRecommendSale]);

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
