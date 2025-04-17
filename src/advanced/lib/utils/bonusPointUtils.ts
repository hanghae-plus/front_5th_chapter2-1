import { BONUS_POINT_RATE } from "@advanced/lib/configs";

export function calculateBonusPoints(totalAmount: number) {
  return Math.floor(totalAmount * BONUS_POINT_RATE);
}
