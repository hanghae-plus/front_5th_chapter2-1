import { createContext } from "react";
import { Product } from "../types";

export interface ProductsContextType {
    products: Product[];
    updateQuantity: (id: string, quantity: number) => void;
    resetQuantity: (id: string) => void;
}

export const ProductsContext = createContext<ProductsContextType | undefined>(undefined)