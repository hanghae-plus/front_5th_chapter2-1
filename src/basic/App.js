import { createElement } from "./utils/createDom";
import { stores } from "./stores";
import AddToCartButton from "./components/button/AddToCartButton";
import ProductSelector from "./components/product/ProductSelector";
import StockStatus from "./components/product/StockStatus";
import CartSection from "./components/cart/CartSection";

const App = (rootElement) => {
  const container = createElement("div", {
    className: "bg-gray-100 p-8",
  });
  const wrapper = createElement("div", {
    className: "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8",
  });

  const renderProductSelector = () => {
    const productList = stores.product.getState().productList;
    const productSelector = ProductSelector({ productList });

    return productSelector;
  };

  let productSelector = renderProductSelector();

  wrapper.append(CartSection(), productSelector, AddToCartButton(), StockStatus());

  container.appendChild(wrapper);
  rootElement.appendChild(container);
};

export default App;
