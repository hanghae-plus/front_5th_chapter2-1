import { products } from "../../constants.js";
import { getProductById } from "../utils.js";

export function getSelectedProduct(productSelector) {
  const selectedId = productSelector.value;

  return getProductById(selectedId);
}

export function updateProductSelector(productSelector) {
  productSelector.innerHTML = "";

  for (const item of products) {
    const option = document.createElement("option");

    option.value = item.id;
    option.textContent = `${item.name} - ${item.price}원`;
    option.disabled = item.units === 0;

    productSelector.appendChild(option);
  }
}
