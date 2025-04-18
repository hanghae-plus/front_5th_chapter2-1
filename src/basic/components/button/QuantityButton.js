import { createElement } from "../../utils/createDom";

const QuantityButton = ({ productId, amount }) => {
  const button = createElement("button", {
    className: "quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1",
    attributes: {
      "data-product-id": productId,
      "data-change": amount,
    },
    textContent: amount > 0 ? "+" : "-",
  });

  return button;
};

export default QuantityButton;
