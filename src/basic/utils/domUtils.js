export const appendUIElements = (root, elements) => {
  elements.wrapper.append(
    elements.title,
    elements.cartDisplay,
    elements.total,
    elements.productSelect,
    elements.addButton,
    elements.stockInfo,
  );
  elements.container.appendChild(elements.wrapper);
  root.appendChild(elements.container);
};

export const getItemQuantity = (itemElement) => {
  return parseInt(itemElement.querySelector("span").textContent.split("x ")[1]);
};

export const getButtonType = (button) => {
  if (button.classList.contains("remove-item")) return "remove";
  if (button.classList.contains("quantity-change")) return "change";
  return null;
};

export const createUIElement = (tag, { id, className, textContent } = {}) => {
  const element = document.createElement(tag);

  if (id) {
    element.id = id;
  }

  if (className) {
    element.className = className;
  }

  if (textContent) {
    element.textContent = textContent;
  }

  return element;
};

export const updateItemQuantity = (itemElement, product, newQty) => {
  itemElement.querySelector("span").textContent =
    `${product.name} - ${product.val}원 x ${newQty}`;
};
