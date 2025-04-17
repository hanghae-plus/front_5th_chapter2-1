import { products } from "../../constants.js";

export function getSelectedProduct(productSelector) {
  const selectedId = productSelector.value;

  return products.find((p) => p.id === selectedId);
}
