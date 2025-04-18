import { createElement } from "../../utils/createDom";

const RemoveButton = ({ productId }) => {
  const button = createElement("button", {
    className: "remove-item bg-red-500 text-white px-2 py-1 rounded",
    attributes: {
      "data-product-id": productId,
    },
    textContent: "삭제",
  });

  return button;
};

export default RemoveButton;
