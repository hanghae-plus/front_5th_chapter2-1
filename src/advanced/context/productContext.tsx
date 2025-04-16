import type React from "react";
import { createContext, useContext, useState } from "react";
import type { ProductList } from "@/advanced/types";
import { PRODUCT_LIST } from "@/basic/consts";

interface ProductContextType {
  productList: ProductList;
  setProductList: React.Dispatch<React.SetStateAction<ProductList>>;
  selectedProductId: string;
  setSelectedProductId: React.Dispatch<React.SetStateAction<string>>;
}

const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(PRODUCT_LIST[0].id);
  const [productList, setProductList] = useState<ProductList>(PRODUCT_LIST);

  return (
    <ProductContext.Provider value={{ selectedProductId, setSelectedProductId, productList, setProductList }}>
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