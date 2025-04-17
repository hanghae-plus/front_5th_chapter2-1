import { calculateCart } from "./helpers/logic/calculateCart.js";
import { mount } from "./helpers/render.js";
import {
  scheduleFlashSale,
  scheduleRecommendationSale,
} from "./helpers/scheduleTask.js";
import { bindCartEvents } from "./helpers/events.js";
import { updateProductSelector } from "./helpers/logic/selector.js";

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
triggerRandomSales();

function triggerRandomSales() {
  scheduleFlashSale({ onSale: () => updateProductSelector(productSelector) });
  scheduleRecommendationSale({
    productId: context.lastSelectedProductId,
    onSale: () => updateProductSelector(productSelector),
  });
}

bindCartEvents({
  cartItemList,
  productSelector,
  addToCartButton,
  cartTotalEl,
  stockStatusEl,
  context,
});
