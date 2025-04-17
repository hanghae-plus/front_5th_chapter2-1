/** 재고 현황 컴포넌트 */
export const StockList = ({ id, name, stock }) =>
  `<span id="${id}">
    ${name}: ${stock === 0 ? '품절' : `재고 부족 (${stock}개 남음)`}
 </span>`;
