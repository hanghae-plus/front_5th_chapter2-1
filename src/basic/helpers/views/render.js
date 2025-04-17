export function mount() {
  const root = document.getElementById("app");
  const { container, wrapper } = createLayout();
  const children = appendChildren(wrapper);

  root.appendChild(container);

  return children;
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

function appendChildren(wrapper) {
  const heading = document.createElement("h1");
  heading.className = "text-2xl font-bold mb-4";
  heading.textContent = "장바구니";

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
  addToCartButton.textContent = "추가";

  const stockStatusEl = document.createElement("div");
  stockStatusEl.id = "stock-status";
  stockStatusEl.className = "text-sm text-gray-500 mt-2";
  stockStatusEl.style.whiteSpace = "pre-wrap";

  wrapper.appendChild(heading);
  wrapper.appendChild(cartItemList);
  wrapper.appendChild(cartTotalEl);
  wrapper.appendChild(productSelector);
  wrapper.appendChild(addToCartButton);
  wrapper.appendChild(stockStatusEl);

  return {
    cartItemList,
    cartTotalEl,
    productSelector,
    addToCartButton,
    stockStatusEl,
  };
}
