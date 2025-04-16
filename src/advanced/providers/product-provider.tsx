import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { Product } from "../types";

export const ProductContext = createContext<{
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
} | null>(null);

type BasketProviderProps = {
  products: Product[];
  children: ReactNode;
};

export const ProductProvider = ({
  products: origin = [],
  children,
}: BasketProviderProps) => {
  const [products, setProducts] = useState(origin);

  const value = useMemo(
    () => ({ products, setProducts }),
    [products, setProducts]
  );
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
