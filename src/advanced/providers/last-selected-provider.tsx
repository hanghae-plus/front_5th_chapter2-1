import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useProduct } from "../hooks/use-product";
import { Cart, PLUS_MINUS, PlusMinus, Product } from "../types";

export const CartContext = createContext<{
  lastSelected: string | undefined;
  cart: Cart;
  updateCart: (id: Product["id"], mode: PlusMinus) => void;
} | null>(null);

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const { products } = useProduct();
  const [lastSelected, setLastSelected] = useState<string | undefined>();
  const [cart, setCart] = useState<Cart>({});

  const updateCart = useCallback(
    (id: Product["id"], mode: PlusMinus) => {
      // tmp
      const target = products.find((product) => product.id === id);
      if (!target) return;
      setCart({ [id]: 1 });
      if (mode === PLUS_MINUS.PLUS) {
      } else {
      }
      setLastSelected(id);
    },
    [products, setLastSelected, setCart]
  );

  const value = useMemo(
    () => ({ lastSelected, cart, updateCart }),
    [lastSelected, , cart, updateCart]
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
