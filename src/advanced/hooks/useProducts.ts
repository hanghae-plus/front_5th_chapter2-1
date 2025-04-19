import { useContext } from "react";
import { ProductsContext } from "../context/ProductContext";

export const useProducts = () => {
    const context = useContext(ProductsContext)
    if(context === undefined) {
        throw new Error("Hook must be userd within an Provider!")
    }
    return context
}