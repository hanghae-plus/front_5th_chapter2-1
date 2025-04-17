import { useContext } from "react";
import { CartContext } from "../providers";

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("context is null");
  return context;
};
