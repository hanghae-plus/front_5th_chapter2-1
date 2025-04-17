/**
 * 재고 정보 컴포넌트
 * @param {Array} products - 상품 목록 배열
 * @param {number} threshold - 재고 부족 기준값
 */
const StockInfo = (products, threshold = 5) => {
  const lowStockProductMessages = products
    ?.filter((product) => product.quantity < threshold)
    ?.map((product) => `${product.name}: ${product.quantity > 0 ? `재고 부족 (${product.quantity}개 남음)` : "품절"}`)
    .join("\n");
  return `<div id="stock-status" class="text-sm text-gray-500 mt-2">${lowStockProductMessages}</div>`;
};

export default StockInfo;
