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
  lastSelected: string;
  setLastSelected: Dispatch<SetStateAction<string>>;
} | null>(null);

type ProductProviderProps = {
  products: Product[];
  children: ReactNode;
};

export const ProductProvider = ({
  products: origin = [],
  children,
}: ProductProviderProps) => {
  const [products, setProducts] = useState(origin);
  const [lastSelected, setLastSelected] = useState<string>(
    origin?.[0].id || ""
  );

  const value = useMemo(
    () => ({ products, setProducts, lastSelected, setLastSelected }),
    [products, setProducts, lastSelected, setLastSelected]
  );
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
