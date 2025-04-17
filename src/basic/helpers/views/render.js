const APP_ROOT_ID = "app";
const TITLE_TEXT = "장바구니";
const ADD_BUTTON_TEXT = "추가";

export function mount() {
  const root = document.getElementById(APP_ROOT_ID);
  if (!root) {
    throw new Error(`cannot find element with id ${APP_ROOT_ID}`);
  }

  const { container, wrapper } = createLayout();
  const {
    cartItemList,
    cartTotalEl,
    productSelector,
    addToCartButton,
    stockStatusEl,
  } = initializeChildren(wrapper);
  root.appendChild(container);

  return {
    cartItemList,
    cartTotalEl,
    productSelector,
    addToCartButton,
    stockStatusEl,
  };
}

function createLayout() {
  const container = document.createElement("div");
  container.className = "bg-gray-100 p-8";

  const wrapper = document.createElement("div");
  wrapper.className =
    "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8";

  container.appendChild(wrapper);
  return { container, wrapper };
}

function initializeChildren(wrapper) {
  const heading = document.createElement("h1");
  heading.className = "text-2xl font-bold mb-4";
  heading.textContent = TITLE_TEXT;

  const cartItemList = document.createElement("div");
  cartItemList.id = "cart-items";

  const cartTotalEl = document.createElement("div");
  cartTotalEl.id = "cart-total";
  cartTotalEl.className = "text-xl font-bold my-4";

  const productSelector = document.createElement("select");
  productSelector.id = "product-select";
  productSelector.className = "border rounded p-2 mr-2";

  const addToCartButton = document.createElement("button");
  addToCartButton.id = "add-to-cart";
  addToCartButton.className = "bg-blue-500 text-white px-4 py-2 rounded";
  addToCartButton.textContent = ADD_BUTTON_TEXT;

  const stockStatusEl = document.createElement("div");
  stockStatusEl.id = "stock-status";
  stockStatusEl.className = "text-sm text-gray-500 mt-2";
  stockStatusEl.style.cssText = "white-space: pre-wrap";

  const fragment = document.createDocumentFragment();
  const elements = [
    heading,
    cartItemList,
    cartTotalEl,
    productSelector,
    addToCartButton,
    stockStatusEl,
  ];
  elements.forEach((element) => fragment.appendChild(element));
  wrapper.appendChild(fragment);

  return {
    cartItemList,
    cartTotalEl,
    productSelector,
    addToCartButton,
    stockStatusEl,
  };
}
