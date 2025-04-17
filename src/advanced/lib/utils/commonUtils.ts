export function calculatePercentageFromRate(rate: number) {
  return Math.round((1 - rate) * 100);
}
