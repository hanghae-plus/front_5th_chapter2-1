import { useContext } from "react";
import { MainContext } from "../context/MainProvider";

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("useMainContext must be used within a MainProvider");
  }
  return context;
};
