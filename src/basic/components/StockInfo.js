import { getStore } from "../store/store.js";

export const StockInfo = () => {
  return `<div id="stock-status" class="text-sm text-gray-500 mt-2"></div>`;
};

export const updateStockInfo = () => {
  const { products } = getStore();
  const stockElement = document.getElementById("stock-status");
  if (!stockElement) return;

  let infoMessage = "";

  products.forEach((product) => {
    if (product.q < 5) {
      infoMessage += `${product.name}: ${
        product.q > 0 ? `재고 부족 (${product.q}개 남음)` : "품절"
      }\n`;
    }
  });

  stockElement.textContent = infoMessage;
};
