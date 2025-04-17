import { createContext, useState } from "react";

import type { IProduct } from "#advanced/pages/main/_types";
import { PRODUCTS } from "#advanced/pages/main/_constants";

interface IProductsContext {
  products: IProduct[];
}

export const ProductsContext = createContext<IProductsContext>({
  products: [],
});

const ProductsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [products] = useState<IProduct[]>(PRODUCTS);

  return <ProductsContext.Provider value={{ products }}>{children}</ProductsContext.Provider>;
};

export default ProductsProvider;
