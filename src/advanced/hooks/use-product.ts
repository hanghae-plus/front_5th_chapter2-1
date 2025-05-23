import { useContext } from "react";
import { ProductContext } from "../providers";

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("context is null");
  return context;
};
