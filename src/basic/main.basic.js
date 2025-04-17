import { products } from "./constants.js";
import { calculateCart } from "./helpers/logic/calculateCart.js";
import { mount } from "./helpers/render.js";
import {
  scheduleFlashSale,
  scheduleRecommendationSale,
} from "./helpers/scheduleTask.js";
import { bindCartEvents } from "./helpers/events.js";

const context = { lastSelectedProductId: null };

let [
  cartItemList,
  cartTotalEl,
  productSelector,
  addToCartButton,
  stockStatusEl,
] = mount();

updateProductSelector();
calculateCart({ cartItemList, cartTotalEl, stockStatusEl });
triggerRandomSales();

function triggerRandomSales() {
  scheduleFlashSale({ onSale: updateProductSelector });
  scheduleRecommendationSale({
    productId: context.lastSelectedProductId,
    onSale: updateProductSelector,
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

function updateProductSelector() {
  productSelector.innerHTML = "";

  products.forEach(function (item) {
    const option = document.createElement("option");

    option.value = item.id;
    option.textContent = `${item.name} - ${item.price}원`;
    option.disabled = item.units === 0;

    productSelector.appendChild(option);
  });
}
