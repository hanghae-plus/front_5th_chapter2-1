import { PRODUCT_INVENTORY } from "@advanced/lib/configs";
import { useCart } from "@advanced/lib/contexts/CartProvider";
import type { Product } from "@advanced/lib/types";
import { useState } from "react";

export function useProductSelector() {
  const { dispatch } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCT_INVENTORY[0]);

  const handleProductSelect = (product: Product) => setSelectedProduct(product);

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: { ...selectedProduct } });
  };

  return {
    selectedProduct,
    handleProductSelect,
    handleAddToCart,
  };
}
