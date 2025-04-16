import { products } from "../data/products";
import { cloneProducts } from "../utils/\bclone-product";

export const cartState = {
  products: cloneProducts(products),
  lastSelected: null,
  finalTotal: 0,
  originalTotal: 0,
  itemCount: 0,
  discountRate: 0,
};
