import {
  renderBonusPoints,
  renderCartItems,
  renderDiscountRate,
  renderProductInventory,
  renderStockInfo,
  renderTotalPrice,
} from "../lib/utils/renderUtils";
import { cartStore } from "../stores/cartStore";
import { Template } from "./MainPage.template";
import { registerFlashSaleAlert, registerRecommendSaleAlert } from "../lib/utils/saleUtils";

export function MainPage() {
  document.body.innerHTML = Template;

  const cartState = cartStore.getState();

  renderProductInventory();
  renderTotalPrice(cartState.totalAmount);
  renderBonusPoints(cartState.bonusPoints);

  registerFlashSaleAlert();
  registerRecommendSaleAlert();

  cartStore.subscribe((state) => {
    if (state.error) {
      alert(state.error);
      return;
    }

    renderProductInventory();
    renderTotalPrice(state.totalAmount);
    renderCartItems(state.addedItems);
    renderDiscountRate(state.discountRate);
    renderBonusPoints(state.bonusPoints);
    renderStockInfo();
  });
}
