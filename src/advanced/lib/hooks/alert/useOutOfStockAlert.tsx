import { useCart } from "@advanced/lib/contexts/CartProvider";

export function useOutOfStockAlert() {
  const { state } = useCart();

  const registerOutOfStockAlert = () => {
    if (state.error) alert(state.error);
  };

  return { registerOutOfStockAlert };
}
