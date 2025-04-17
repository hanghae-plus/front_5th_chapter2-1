import { productStore } from "../../stores";

const createProductOption = (product) => {
  const option = document.createElement("option");
  option.value = product.id;
  option.textContent = `${product.name} - ${product.price}원`;
  option.disabled = product.quantity <= 0;
  return option;
};

export const renderProductList = (selectElement) => {
  selectElement.innerHTML = "";

  const { productList } = productStore.state;

  for (const product of productList) {
    const option = createProductOption(product);

    selectElement.appendChild(option);
  }
};
