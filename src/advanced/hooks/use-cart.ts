import { useContext } from "react";
import { LastSelectedContext } from "../providers";

export const useCart = () => {
  const context = useContext(LastSelectedContext);
  if (!context) throw new Error("context is null");
  return context;
};
