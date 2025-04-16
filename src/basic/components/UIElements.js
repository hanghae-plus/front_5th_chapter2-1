import { createUIElement } from "../utils/domUtils";

export const createUIElements = () => {
  return {
    container: createUIElement("div", { className: "bg-gray-100 p-8" }),
    wrapper: createUIElement("div", {
      className:
        "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8",
    }),
    title: createUIElement("h1", {
      className: "text-2xl font-bold mb-4",
      textContent: "장바구니",
    }),
    cartDisplay: createUIElement("div", { id: "cart-items" }),
    total: createUIElement("div", {
      id: "cart-total",
      className: "text-xl font-bold my-4",
    }),
    productSelect: createUIElement("select", {
      id: "product-select",
      className: "border rounded p-2 mr-2",
    }),
    addButton: createUIElement("button", {
      id: "add-to-cart",
      className: "bg-blue-500 text-white px-4 py-2 rounded",
      textContent: "추가",
    }),
    stockInfo: createUIElement("div", {
      id: "stock-status",
      className: "text-sm text-gray-500 mt-2",
    }),
  };
};
