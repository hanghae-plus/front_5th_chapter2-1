import store from "#basic/libs/store";

/** 재고 상태 업데이트 */
export const updateStockInfo = () => {
  const { $stockInfo } = store.elements;
  const { products } = store.states;

  const stockInfoMessage = products
    .filter((item) => item.stock < 5)
    .reduce((acc, prev) => {
      return acc + `${prev.name}: ${prev.stock > 0 ? "재고 부족 (" + prev.stock + "개 남음)" : "품절"} \n`;
    }, "");

  $stockInfo.textContent = stockInfoMessage;
};
