import type { CartItem, CartState } from "@/advanced/context";
import { PRODUCT_DISCOUNT_RATES } from "@/basic/consts";

export const calculation = (cartItems: CartItem[]): CartState => {
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