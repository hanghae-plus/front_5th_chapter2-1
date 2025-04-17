import { products } from "../constants.js";

export function getProductById(id) {
  return products.find((product) => product.id === id);
}
