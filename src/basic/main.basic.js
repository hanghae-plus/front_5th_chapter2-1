import { mount } from "./helpers/views/render.js";
import { updateProductSelector } from "./helpers/logic/selector.js";
import { calculateCart } from "./helpers/logic/calculateCart.js";
import {
  scheduleFlashSale,
  scheduleRecommendationSale,
} from "./helpers/schedule/scheduleTask.js";
import { bindCartEvents } from "./helpers/events/cart.js";

const context = { lastSelectedProductId: null };
let [
  cartItemList,
  cartTotalEl,
  productSelector,
  addToCartButton,
  stockStatusEl,
] = mount();

updateProductSelector(productSelector);
calculateCart({ cartItemList, cartTotalEl, stockStatusEl });

scheduleFlashSale({ onSale: () => updateProductSelector(productSelector) });
scheduleRecommendationSale({
  productId: () => context.lastSelectedProductId,
  onSale: () => updateProductSelector(productSelector),
});

bindCartEvents({
  cartItemList,
  addToCartButton,
  productSelector,
  cartTotalEl,
  stockStatusEl,
  context,
});
