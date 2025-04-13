export function StockInfo({ name, quantityLeft }) {
  switch (quantityLeft) {
    case quantityLeft >= 5:
      return "";
    case quantityLeft > 0:
      return `${name}: 재고 부족 (${quantityLeft}개 남음)\n`;
    default:
      return `${name}: 품절\n`;
  }
}
