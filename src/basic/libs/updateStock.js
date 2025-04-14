/** @typedef {import("../types").Product} Product */

/**
 * 재고 상태 업데이트
 *
 * @param {Element} $stockInfo - 재고 상태 표시 요소
 * @param {Array<Product>} products - 상품 목록
 *
 * @example
 * updateStockInfo($stockInfo, prodList);
 */
export const updateStockInfo = ($stockInfo, products) => {
  const stockInfoMessage = products
    .filter((item) => item.stock < 5)
    .reduce((acc, prev) => {
      return acc + `${prev.name}: ${prev.stock > 0 ? "재고 부족 (" + prev.stock + "개 남음)" : "품절"} \n`;
    }, "");

  $stockInfo.textContent = stockInfoMessage;
};
