import { POINT_RATE } from "@/basic/config/constants";
import { $, STYLES } from "@/basic/lib";
/**
 * [Component] 할인율 컴포넌트
 *
 * @param {number} discountRate
 * @returns {HTMLSpanElement}
 */
const DiscountText = (discountRate = 0) => {
  if (!discountRate || discountRate < 0) return null;
  return $("span", {
    className: STYLES.TOTAL_TEXT,
    textContent: "(" + (discountRate * 100).toFixed(1) + "% 할인 적용)",
  });
};
/**
 * [Component] 장바구니 포인트 컴포넌트
 *
 * @param {number} totalCost
 * @returns {HTMLSpanElement}
 */
const LoyaltyPoints = (totalCost = 0) => {
  const bonusPoints = Math.floor(totalCost * POINT_RATE);
  return $("span", {
    id: "loyalty-points",
    className: STYLES.LOYALTY_POINTS,
    textContent: "(포인트: " + bonusPoints + ")",
  });
};

/**
 * [Component] 총액 및 할인율, 포인트 컴포넌트
 *
 * @param {number} totalCost
 * @param {number} discountRate
 * @returns {DocumentFragment}
 */
export const CartTotal = (totalCost = 0, discountRate = 0) => {
  return $(
    "frag",
    null,
    "총액: " + Math.round(totalCost) + "원",
    DiscountText(discountRate),
    LoyaltyPoints(totalCost),
  );
};
