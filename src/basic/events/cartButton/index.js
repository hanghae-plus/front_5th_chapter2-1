import store from "#basic/libs/store";

import { handleCartButtonClick } from "./click";

const cartButton = {
  $element: store.elements.$addCartButton,
  click: handleCartButtonClick,
};

export default cartButton;
