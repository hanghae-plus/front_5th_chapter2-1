import type React from "react";
import { createContext, useContext, useState } from "react";
import type { ProductState } from "./types";

interface ProductContextType {
  selectedProductId: ProductState["selectedProductId"];
  setSelectedProductId: React.Dispatch<React.SetStateAction<ProductState["selectedProductId"]>>;
}

const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  return (
    <ProductContext.Provider value={{ selectedProductId, setSelectedProductId }}>
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