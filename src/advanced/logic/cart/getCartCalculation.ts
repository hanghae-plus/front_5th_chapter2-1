import type { CartItem, CartState } from "@/advanced/context";
import { PRODUCT_DISCOUNT_RATES } from "@/basic/consts";

const calculateCartAmounts = (cartItems: CartItem[]): CartState => {
  return cartItems.reduce(
    (acc, item) => {
      const itemTotal = item.value * item.quantity;
      const discount = 
        item.quantity >= 10 ? (PRODUCT_DISCOUNT_RATES[item.id as keyof typeof PRODUCT_DISCOUNT_RATES] ?? 0) : 0;

      acc.itemCount += item.quantity;
      acc.subTotal += itemTotal;
      acc.totalAmount += itemTotal * (1 - discount);

      return acc;
    },
    { itemCount: 0, subTotal: 0, totalAmount: 0 }
  );
};

export const getCartCalculation = (cartItems: CartItem[], setCart: React.Dispatch<React.SetStateAction<CartState>>) => {
  const { itemCount, subTotal, totalAmount } = calculateCartAmounts(cartItems);
  setCart({itemCount, subTotal, totalAmount})
}
