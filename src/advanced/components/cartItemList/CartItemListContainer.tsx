import type React from "react";
import { DOM_IDS } from "@/basic/consts/dom";
import { CartItem } from "./CartItem";
import { useCart } from "@/advanced/context";
interface CartItemListContainerProps {
  children: React.ReactNode;
}

export const CartItemListContainer: React.FC<CartItemListContainerProps> = () => {
  const { cartItems } = useCart();

  return (
    <div id={DOM_IDS.CART.CONTAINER}>
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
};