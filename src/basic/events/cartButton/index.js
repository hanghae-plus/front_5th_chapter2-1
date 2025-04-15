import store from "../../libs/store";
import { handleCartButtonClick } from "./click";

const cartButton = {
  $element: store.elements.$addCartButton,
  click: handleCartButtonClick,
};

export default cartButton;
