import { createElement } from "../../utils/createDom";
import CartList from "./CartList";
import CartSummary from "./CartSummary";

const CartSection = () => {
  const section = createElement("section");
  const title = createElement("h1", {
    className: "text-2xl font-bold mb-4",
    textContent: "장바구니",
  });

  section.append(title, CartList(), CartSummary());

  return section;
};

export default CartSection;
