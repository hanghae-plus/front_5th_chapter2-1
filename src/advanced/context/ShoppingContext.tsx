import { createContext, useContext } from "react";
import { useShopping } from "@/advanced/hooks";

type ReturnTypeOfUseShopping = ReturnType<typeof useShopping>;

export const ShoppingContext = createContext<ReturnTypeOfUseShopping | null>(null);

export const ShoppingProvider = ({ children }: { children: React.ReactNode }) => {
  const shopping = useShopping();
  return (
    <ShoppingContext.Provider value={shopping}>
      {children}
    </ShoppingContext.Provider>
  );
};

export const useShoppingContext = () => {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error("useShoppingContext는 ShoppingProvider 안에서만 사용해야 합니다");
  }
  return context;
};
