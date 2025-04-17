import { useCart } from "@/advanced/context";
import { calculateCartAmounts } from "./calculateCartAmounts";

export const getCartCalculation = () => {
  const { setCart, cartItems } = useCart();
  const { itemCount, subTotal, totalAmount } = calculateCartAmounts(cartItems);
  setCart({itemCount, subTotal, totalAmount})
}
