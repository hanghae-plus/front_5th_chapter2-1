export function isEligibleForFlashSale(stock: number) {
  return stock > 0 && Math.random() < 0.3;
}
