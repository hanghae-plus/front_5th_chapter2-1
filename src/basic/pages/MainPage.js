import {
  renderBonusPoints,
  renderCartItems,
  renderDiscountRate,
  renderProductInventory,
  renderStockInfo,
  renderTotalPrice,
} from "../lib/utils/renderUtils";
import { PRODUCT_INVENTORY } from "../lib/configs/products";
import { cartStore } from "../stores/cartStore";
import { Template } from "./MainPage.template";

export function MainPage() {
  document.body.innerHTML = Template;

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

  const cartState = cartStore.getState();

  renderProductInventory();
  renderTotalPrice(cartState.totalAmount);
  renderBonusPoints(cartState.bonusPoints);

  setTimeout(() => {
    setInterval(() => {
      const luckyItem = PRODUCT_INVENTORY[Math.floor(Math.random() * PRODUCT_INVENTORY.length)];

      if (Math.random() < 0.3 && luckyItem.stock > 0) {
        luckyItem.price = Math.round(luckyItem.price * 0.8);

        alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);
        renderProductInventory();
      }
    }, 30000);
  }, Math.random() * 10000);

  setTimeout(() => {
    setInterval(() => {
      if (!cartState.lastSelected) return;

      const suggest = PRODUCT_INVENTORY.find((item) => item.id !== cartState.lastSelected && item.stock > 0);

      if (!suggest) return;

      alert(`${suggest.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
      suggest.price = Math.round(suggest.price * 0.95);
      renderProductInventory();
    }, 60000);
  }, Math.random() * 20000);
}
