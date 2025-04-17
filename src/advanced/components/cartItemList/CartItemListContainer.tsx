import type React from "react";
import { DOM_IDS } from "@/basic/consts/dom";
import { CartItem } from "./CartItem";
import { useShopping } from "@/advanced/hooks/useShopping";

export const CartItemListContainer: React.FC = () => {
  const { cartItems } = useShopping();

  return (
    <div id={DOM_IDS.CART.CONTAINER}>
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
};