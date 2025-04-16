import { products } from "../data/products";

export const cartState = {
  products: [...products],
  lastSelected: null,
  finalTotal: 0,
  originalTotal: 0,
  itemCount: 0,
  discountRate: 0,
};
