import { calculateCartAmounts } from "./calculateCartAmounts";
import type { CartItem, CartState } from "@/advanced/context";

export const getCartCalculation = (cartItems: CartItem[], setCart: React.Dispatch<React.SetStateAction<CartState>>) => {
  const { itemCount, subTotal, totalAmount } = calculateCartAmounts(cartItems);
  setCart({itemCount, subTotal, totalAmount})
}
