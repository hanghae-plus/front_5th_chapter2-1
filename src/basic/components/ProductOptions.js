import { createUIElement } from "../utils/domUtils";

const renderProductOptions = (select, products) => {
  select.innerHTML = "";

  products.forEach((product) => {
    const option = createUIElement("option");

    option.value = product.id;

    option.textContent = `${product.name} - ${product.val}원`;

    option.disabled = product.q === 0;

    select.appendChild(option);
  });
};
export default renderProductOptions;
