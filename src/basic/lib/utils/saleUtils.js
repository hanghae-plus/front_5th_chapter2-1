import { registerRecurringTask } from "./commonUtils";
import { renderProductInventory } from "./renderUtils";

function isEligibleForSale(stock) {
  return stock > 0 && Math.random() < 0.3;
}

export function registerFlashSaleAlert() {
  registerRecurringTask(
    () => {
      const saleItem = PRODUCT_INVENTORY[Math.floor(Math.random() * PRODUCT_INVENTORY.length)];

      if (!isEligibleForSale(saleItem.stock)) return;

      saleItem.price = Math.round(saleItem.price * 0.8);

      alert(`번개세일! ${saleItem.name}이(가) 20% 할인 중입니다!`);
      renderProductInventory();
    },
    30000,
    Math.random() * 10000,
  );
}

export function registerRecommendSaleAlert() {
  registerRecurringTask(
    () => {
      if (!cartState.lastSelected) return;

      const saleItem = PRODUCT_INVENTORY.find((item) => item.id !== cartState.lastSelected && item.stock > 0);

      if (!saleItem) return;

      saleItem.price = Math.round(saleItem.price * 0.95);

      alert(`${saleItem.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
      renderProductInventory();
    },
    60000,
    Math.random() * 20000,
  );
}
