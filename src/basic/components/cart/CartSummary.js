import { createElement, createTextNode } from "../../utils/createDom";
import { stores } from "../../stores";
import { calculateCart } from "../../utils/calculateCart";

const CartSummary = () => {
  const container = createElement("div", {
    className: "text-xl font-bold my-4",
    id: "cart-total",
  });

  const renderSummary = () => {
    const { cartItemList } = stores.cart.getState();
    const { productList } = stores.product.getState();
    const { totalPrice, discountRate, bonusPoint } = calculateCart(cartItemList, productList);

    container.innerHTML = "";

    const totalText = createTextNode(`총액: ${totalPrice}원`);

    container.appendChild(totalText);

    if (discountRate > 0) {
      const discount = createElement("span", {
        className: "text-green-500 ml-2",
        textContent: `(${(discountRate * 100).toFixed(1)}% 할인 적용)`,
      });

      container.appendChild(discount);
    }

    const point = createElement("span", {
      className: "text-blue-500 ml-2",
      id: "loyalty-points",
      textContent: `(포인트: ${bonusPoint})`,
    });

    container.appendChild(point);
  };

  stores.cart.subscribe(renderSummary);
  renderSummary();

  return container;
};

export default CartSummary;
