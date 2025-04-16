import type React from "react";
import { createContext, useContext, useState } from "react";
import type { ProductState } from "./types";

interface ProductContextType {
  selectedProduct: ProductState["selectedProduct"];
  setSelectedProduct: React.Dispatch<React.SetStateAction<ProductState["selectedProduct"]>>;
}

const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductState["selectedProduct"]>(null);

  return (
    <ProductContext.Provider value={{ selectedProduct, setSelectedProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};