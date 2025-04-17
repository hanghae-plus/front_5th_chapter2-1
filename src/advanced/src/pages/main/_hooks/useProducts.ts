import { useContext } from "react";

import { ProductsContext } from "#advanced/pages/main/_providers/ProductsProvider";

const useProducts = () => {
  return useContext(ProductsContext);
};

export default useProducts;
