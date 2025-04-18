import { stores } from "../../stores";
import { createElement } from "../../utils/createDom";
import CartItem from "./CartItem";

const CartList = () => {
  const container = createElement("div", {
    id: "cart-items",
  });

  const renderCartItem = () => {
    const { cartItemList } = stores.cart.getState();

    container.innerHTML = "";

    cartItemList.forEach(({ id, quantity, ...product }) => {
      container.appendChild(CartItem({ product: { id, ...product }, quantity }));
    });
  };

  stores.cart.subscribe(renderCartItem);
  renderCartItem();

  return container;
};

export default CartList;
