import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { STOCK_ALERT_TEXT } from "../config/messages";
import { useProduct } from "../hooks/use-product";
import { Cart, PLUS_MINUS, PlusMinus, Product } from "../types";

export const CartContext = createContext<{
  lastSelected: string;
  setLastSelected: Dispatch<SetStateAction<string>>;
  cart: Cart;
  handleCartItem: (id: Product["id"], mode: PlusMinus) => void;
  handleRemoveItem: (id: Product["id"]) => void;
} | null>(null);

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const { products, setProducts } = useProduct();
  const [lastSelected, setLastSelected] = useState<string>(
    products?.[0].id || ""
  );
  const [cart, setCart] = useState<Cart>({});

  const handleCartItem = useCallback(
    (id: Product["id"], mode: PlusMinus) => {
      const targetIdx = products.findIndex((product) => product.id === id);
      if (targetIdx === -1) return;

      if (mode === PLUS_MINUS.PLUS) {
        if (!products[targetIdx].quantity) {
          alert(STOCK_ALERT_TEXT);
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

  const handleRemoveItem = (id: Product["id"]) => {
    if (!cart[id]) return;
    const targetIdx = products.findIndex((product) => product.id === id);
    if (targetIdx === -1) return;
    const quantity = cart[id];
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setProducts((prev) => {
      const next = [...prev];
      next[targetIdx] = {
        ...next[targetIdx],
        quantity: next[targetIdx].quantity + quantity,
      };
      return next;
    });
  };

  const value = useMemo(
    () => ({
      lastSelected,
      setLastSelected,
      cart,
      handleCartItem,
      handleRemoveItem,
    }),
    [lastSelected, setLastSelected, cart, handleCartItem, handleRemoveItem]
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
