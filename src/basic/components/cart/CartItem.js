import { createElement } from "../../utils/createDom";
import QuantityButton from "../button/QuantityButton";
import RemoveButton from "../button/RemoveButton";

const CartItem = ({ product, quantity }) => {
  const { id, name, price } = product;

  const container = createElement("div", {
    className: "flex justify-between items-center mb-2",
    id: id,
  });

  const itemDetails = createElement("span", {
    textContent: `${name} - ${price}원 x ${quantity}`,
  });

  const buttonWrapper = createElement("div");

  const minusButton = QuantityButton({ productId: id, amount: -1 });
  const plusButton = QuantityButton({ productId: id, amount: 1 });
  const removeButton = RemoveButton({ productId: id });

  buttonWrapper.append(minusButton, plusButton, removeButton);
  container.append(itemDetails, buttonWrapper);

  return container;
};

export default CartItem;
