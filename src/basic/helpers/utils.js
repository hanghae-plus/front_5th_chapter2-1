import { products } from "../constants.js";

export function getProductById(id) {
  if (!id) return null;
  return products.find((product) => product.id === id);
}

export function getQuantity(element) {
  if (!element) return 0;
  try {
    const quantityText = element.querySelector("span").textContent;
    return parseInt(quantityText.split("x ")[1]);
  } catch (error) {
    console.error("Error parsing quantity:", error);
    return 0;
  }
}
