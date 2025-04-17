import { mount } from './helpers/views/render.js';
import { updateProductSelector } from './helpers/logic/selector.js';
import { calculateCart } from './helpers/logic/calculateCart.js';
import { scheduleFlashSale, scheduleRecommendationSale } from './helpers/schedule/scheduleTask.js';
import { bindCartEvents } from './helpers/events/cart.js';

const context = { lastSelectedProductId: null };
let cartItemList, cartTotalEl, productSelector, addToCartButton, stockStatusEl;

initShoppingCartApp();

function initShoppingCartApp() {
  renderElement();
  initialState();
  setupSaleSchedule();
  setupEventHandlers();

  function renderElement() {
    const elements = mount();

    cartItemList = elements.cartItemList;
    cartTotalEl = elements.cartTotalEl;
    productSelector = elements.productSelector;
    addToCartButton = elements.addToCartButton;
    stockStatusEl = elements.stockStatusEl;
  }

  function initialState() {
    updateProductSelector(productSelector);
    calculateCart({ cartItemList, cartTotalEl, stockStatusEl });
  }

  function setupSaleSchedule() {
    scheduleFlashSale({
      onSale: () => updateProductSelector(productSelector),
    });
    scheduleRecommendationSale({
      productId: () => context.lastSelectedProductId,
      onSale: () => updateProductSelector(productSelector),
    });
  }

  function setupEventHandlers() {
    const eventTargets = {
      cartItemList,
      addToCartButton,
      productSelector,
      cartTotalEl,
      stockStatusEl,
    };
    bindCartEvents({ ...eventTargets, context });
  }
}
