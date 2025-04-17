import { CartItemList } from "./CartItemList";
import { ProductSelector } from "./ProductSelector";
import { OutOfStockIndicator } from "./OutOfStockIndicator";
import { CartTotal } from "./CartTotal";
import { useSaleAlert } from "@advanced/lib/hooks/alert/useSaleAlert";
import { useOutOfStockAlert } from "@advanced/lib/hooks/alert/useOutOfStockAlert";
import { useEffect } from "react";

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
