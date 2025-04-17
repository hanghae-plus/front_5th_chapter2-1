import { products } from "../../constants.js";
import { getProductById } from "../utils.js";

export function getSelectedProduct(selectEl) {
  const selectedId = selectEl.value;
  return getProductById(selectedId);
}

export function updateProductSelector(selectEl) {
  selectEl.innerHTML = "";

  const fragment = document.createDocumentFragment();

  for (const product of products) {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = `${product.name} - ${product.price}원`;
    option.disabled = product.units <= 0;
    fragment.appendChild(option);
  }
  selectEl.appendChild(fragment);
}
