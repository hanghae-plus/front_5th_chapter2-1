import { createElement } from "../../utils/createDom";

const AddToCartButton = () => {
  const button = createElement("button", {
    className: "bg-blue-500 text-white px-4 py-2 rounded",
    id: "add-to-cart",
    textContent: "추가",
  });

  return button;
};

export default AddToCartButton;
