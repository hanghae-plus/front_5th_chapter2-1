import { createElement } from "../../utils/createDom";

const ProductSelector = ({ productList = [] }) => {
  const select = createElement("select", {
    className: "border rounded p-2 mr-2",
    id: "product-select",
  });

  productList.forEach((product) => {
    const option = createElement("option", {
      attributes: { value: product.id },
      textContent: `${product.name} - ${product.price}원`,
      props: { disabled: product.stock === 0 },
    });

    select.appendChild(option);
  });

  return select;
};

export default ProductSelector;
