import { useContext } from "react";

import { CartContext } from "#advanced/pages/main/_providers/CartProvider";

const useCart = () => {
  return useContext(CartContext);
};

export default useCart;
