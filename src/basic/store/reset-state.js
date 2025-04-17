import { products } from "../data/products";
import { cartState } from "./state";

export const resetCartState = () => {
  cartState.products = products.map((product) => ({ ...product }));
  cartState.lastSelected = null;
  cartState.finalTotal = 0;
  cartState.originalTotal = 0;
  cartState.itemCount = 0;
  cartState.discountRate = 0;
};
