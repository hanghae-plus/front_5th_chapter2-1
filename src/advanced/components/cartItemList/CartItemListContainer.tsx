import type React from "react";
import { DOM_IDS } from "@/basic/consts/dom";

interface CartItemListContainerProps {
  children: React.ReactNode;
}

export const CartItemListContainer: React.FC<CartItemListContainerProps> = ({ children }) => {
  return (
    <div id={DOM_IDS.CART.CONTAINER}>
      {children}
    </div>
  );
};