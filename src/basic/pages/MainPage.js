import {
  renderBonusPoints,
  renderCartItems,
  renderDiscountRate,
  renderProductInventory,
  renderStockInfo,
  renderTotalPrice,
} from "../components/render";
import { PRODUCT_INVENTORY } from "../lib/configs/products";
import { bonusPointService } from "../lib/services/BonusPointService";
import { discountService } from "../lib/services/DiscountService";
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
    renderDiscountRate(discountService.discountRate);
    renderBonusPoints(bonusPointService.bonusPoints);
    renderStockInfo();
  });

  renderProductInventory();
  renderCartItems(cartStore.getState().addedItems);
  renderTotalPrice(cartStore.getState().totalAmount);
  renderBonusPoints(bonusPointService.bonusPoints);

  setTimeout(function () {
    setInterval(function () {
      const inventory = PRODUCT_INVENTORY;
      let luckyItem = inventory[Math.floor(Math.random() * inventory.length)];
      if (Math.random() < 0.3 && luckyItem.stock > 0) {
        luckyItem.price = Math.round(luckyItem.price * 0.8);
        alert("번개세일! " + luckyItem.name + "이(가) 20% 할인 중입니다!");
        renderProductInventory();
      }
    }, 30000);
  }, Math.random() * 10000);

  setTimeout(function () {
    setInterval(function () {
      if (cartStore.getState().lastSelected) {
        const inventory = PRODUCT_INVENTORY;
        let suggest = inventory.find(function (item) {
          return (
            item.id !== cartStore.getState().lastSelected && item.stock > 0
          );
        });
        if (suggest) {
          alert(
            suggest.name + "은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!",
          );
          suggest.price = Math.round(suggest.price * 0.95);
          renderProductInventory();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
}
