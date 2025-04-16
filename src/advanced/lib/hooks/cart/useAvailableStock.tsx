import { PRODUCT_INVENTORY } from "@advanced/lib/configs/products";
import { useCart } from "@advanced/lib/contexts/CartProvider";
import { useMemo } from "react";

export function useAvailableStock() {
  const { state } = useCart();

  const inventoryWithAvailableStock = useMemo(() => {
    return PRODUCT_INVENTORY.map((product) => ({
      ...product,
      availableStock: product.stock - (state.addedItems.find((item) => item.id === product.id)?.quantity ?? 0),
    }));
  }, [state.addedItems]);

  return { inventoryWithAvailableStock };
}
