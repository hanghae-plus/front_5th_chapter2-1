import { cartStore } from "../../stores";

const createQuantityButton = (productId, changeValue, buttonText) => {
  const button = document.createElement("button");
  button.className = "quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1";
  button.dataset.productId = productId;
  button.dataset.change = changeValue;
  button.textContent = buttonText;
  return button;
};

const createRemoveButton = (productId) => {
  const button = document.createElement("button");
  button.className = "remove-item bg-red-500 text-white px-2 py-1 rounded";
  button.dataset.productId = productId;
  button.textContent = "삭제";
  return button;
};

const createCartItemElement = (cartItem) => {
  const cartItemElement = document.createElement("div");
  cartItemElement.id = cartItem.id;
  cartItemElement.className = "flex justify-between items-center mb-2";

  const cartItemInfoElement = document.createElement("span");
  cartItemInfoElement.textContent = `${cartItem.name} - ${cartItem.price}원 x ${cartItem.quantity}`;

  const cartItemButtonsContainer = document.createElement("div");

  const cartItemDecreaseButton = createQuantityButton(cartItem.id, "-1", "-");
  const cartItemIncreaseButton = createQuantityButton(cartItem.id, "1", "+");
  const cartItemRemoveButton = createRemoveButton(cartItem.id);

  cartItemButtonsContainer.appendChild(cartItemDecreaseButton);
  cartItemButtonsContainer.appendChild(cartItemIncreaseButton);
  cartItemButtonsContainer.appendChild(cartItemRemoveButton);

  cartItemElement.appendChild(cartItemInfoElement);
  cartItemElement.appendChild(cartItemButtonsContainer);

  return cartItemElement;
};

const removeNonExistingItems = (container, existingItemIds, newItemIds) => {
  for (const id of existingItemIds) {
    if (newItemIds.includes(id)) {
      continue;
    }

    const itemToRemove = document.getElementById(id);

    if (itemToRemove) {
      container.removeChild(itemToRemove);
    }
  }
};

const updateExistingAndCreateNewItems = (container, cartItems) => {
  for (const cartItem of cartItems) {
    const existingElement = document.getElementById(cartItem.id);

    if (existingElement) {
      const infoElement = existingElement.querySelector("span");
      infoElement.textContent = `${cartItem.name} - ${cartItem.price}원 x ${cartItem.quantity}`;
      continue;
    }

    const cartItemElement = createCartItemElement(cartItem);
    container.appendChild(cartItemElement);
  }
};

export const renderCartItems = (container) => {
  const { cartItems } = cartStore.state;

  const existingItemIds = Array.from(container.children).map((item) => item.id);
  const newItemIds = cartItems.map((item) => item.id);

  removeNonExistingItems(container, existingItemIds, newItemIds);
  updateExistingAndCreateNewItems(container, cartItems);
};
