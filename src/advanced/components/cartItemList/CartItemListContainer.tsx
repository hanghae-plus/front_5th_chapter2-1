import type React from "react";
import { DOM_IDS } from "@/basic/consts/dom";
import { CartItem } from "./CartItem";
import { useShoppingContext } from "@/advanced/context";

export const CartItemListContainer: React.FC = () => {
  const { cartItems } = useShoppingContext();

  return (
    <div id={DOM_IDS.CART.CONTAINER}>
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
};