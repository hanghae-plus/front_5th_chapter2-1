import { products } from "../../constants.js";

export function getSelectedProduct(productSelector) {
  const selectedId = productSelector.value;

  return products.find((p) => p.id === selectedId);
}

export function updateProductSelector(productSelector) {
  productSelector.innerHTML = "";

  products.forEach(function (item) {
    const option = document.createElement("option");

    option.value = item.id;
    option.textContent = `${item.name} - ${item.price}원`;
    option.disabled = item.units === 0;

    productSelector.appendChild(option);
  });
}
