import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { STOCK_WARNING_LIMIT } from "../config/constants";
import { useProduct } from "../hooks/use-product";
import { Cart, PLUS_MINUS, PlusMinus, Product } from "../types";

export const CartContext = createContext<{
  lastSelected: string | undefined;
  cart: Cart;
  handleAddToCart: (id: Product["id"], mode: PlusMinus) => void;
} | null>(null);

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const { products, setProducts } = useProduct();
  const [lastSelected, setLastSelected] = useState<string | undefined>();
  const [cart, setCart] = useState<Cart>({});

  const handleAddToCart = useCallback(
    (id: Product["id"], mode: PlusMinus) => {
      const targetIdx = products.findIndex((product) => product.id === id);
      if (targetIdx === -1) return;

      setLastSelected(id);

      if (mode === PLUS_MINUS.PLUS) {
        if (!products[targetIdx].quantity) {
          alert(STOCK_WARNING_LIMIT);
          return;
        }
        setCart((prev) => {
          const next = { ...prev };
          next[id] = (next[id] || 0) + 1;
          return next;
        });
        setProducts((prev) => {
          const next = [...prev];
          next[targetIdx] = {
            ...next[targetIdx],
            quantity: next[targetIdx].quantity - 1,
          };
          return next;
        });
      } else {
        if (!cart[id]) return;
        setCart((prev) => {
          const next = { ...prev };
          next[id] -= 1;
          if (next[id] <= 0) delete next[id];
          return next;
        });
        setProducts((prev) => {
          const next = [...prev];
          next[targetIdx] = {
            ...next[targetIdx],
            quantity: next[targetIdx].quantity + 1,
          };
          return next;
        });
      }
    },
    [products]
  );

  const value = useMemo(
    () => ({ lastSelected, cart, handleAddToCart }),
    [lastSelected, cart, handleAddToCart]
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
