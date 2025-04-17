import { products } from '../constants.js';

export function getProductById(id) {
  if (!id) return null;
  return products.find((product) => product.id === id);
}
