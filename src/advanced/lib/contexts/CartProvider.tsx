import { createContext, type Dispatch, useContext, useReducer } from "react";
import { cartReducer, type CartAction } from "../../reducers/cartReducer";
import type { CartState } from "../types/cart";

const initialCartState: CartState = {
  addedItems: [],
  lastSelected: "",
  totalAmount: 0,
  totalQuantity: 0,
  totalAmountBeforeDiscount: 0,
  discountRate: 0,
  bonusPoints: 0,
};

const CartContext = createContext<{
  state: CartState;
  dispatch: Dispatch<CartAction>;
}>({
  state: initialCartState,
  dispatch: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
