import { PRODUCT_CONSTANTS } from "../constants/products.js";

/**
 * 재고 정보 렌더링
 * @param {Object} state 현재 상태
 */
export const renderStockInfo = (state) => {
  const { products } = state;
  const stockElement = document.getElementById("stock-status");
  if (!stockElement) return;

  let infoMessage = "";
  const { LOW_STOCK_THRESHOLD } = PRODUCT_CONSTANTS;

  // 재고 부족/품절 상품 메시지 생성
  products.forEach((product) => {
    if (product.q < LOW_STOCK_THRESHOLD) {
      infoMessage += `${product.name}: ${
        product.q > 0 ? `재고 부족 (${product.q}개 남음)` : "품절"
      }\n`;
    }
  });

  stockElement.textContent = infoMessage;
};
