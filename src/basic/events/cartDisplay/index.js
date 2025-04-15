import store from "../../libs/store";
import { handleCartDisplayClick } from "./click";

const cartDisplay = {
  $element: store.elements.$cartDisplay,
  click: handleCartDisplayClick,
};

export default cartDisplay;
