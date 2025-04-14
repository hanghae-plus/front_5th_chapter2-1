import {
  BULK_DISCOUNT_LIMIT,
  MONTHLY_SPECIAL_DAY,
  MONTHLY_SPECIAL_DISCOUNT_RATE,
  TOTAL_BULK_DISCOUNT_LIMIT,
  TOTAL_BULK_DISCOUNT_RATE,
} from "@/basic/config/constants";

/**
 * 장바구니에 포함된 상품의 총액 및 할인율을 계산
 * - 장바구니에 포함된 상품의 수량, 소계, 개별 대량 구매 할인율을 계산
 * - 총 상품 갯수에 의한 할인율 계산
 *   - 개별 할인 총액보다, 총 갯수 할인이 클 경우만 적용
 * - 매월 2일 총액에서 추가할인 계산
 *
 * @param {*} products
 * @param {*} cartItems
 * @returns {Object<{ totalCost: number, discountRate: 할인율}>}
 *
 * @see BULK_DISCOUNT_LIMIT - 개별 할인 적용 수량 기준
 * @see TOTAL_BULK_DISCOUNT_LIMIT - 전체 할인 적용 수량 기준
 * @see TOTAL_BULK_DISCOUNT_RATE - 전체 할인 적용 할인율
 * @see MONTHLY_SPECIAL_DAY - 특별 추가 할인 날짜 기준
 * @see MONTHLY_SPECIAL_DISCOUNT_RATE - 특별 추가 할인 날짜 기준 할인율
 */
export const calculateCart = (products, cartItems) => {
  let totalCost = 0;
  let itemCount = 0;

  let subTotal = 0;
  for (let i = 0; i < cartItems.length; i++) {
    // 장바구니 상품만 확인하여 전체 수량 및 소계, 할인된 총계 계산
    const currentItem = products.find((item) => item.id === cartItems[i].id);
    if (!currentItem) continue;

    const quantity = parseInt(
      cartItems[i].querySelector("span").textContent.split("x ")[1],
    );
    const itemTotal = currentItem.cost * quantity;
    const discount =
      quantity >= BULK_DISCOUNT_LIMIT && !!currentItem.discount
        ? currentItem.discount
        : 0;

    itemCount += quantity;
    subTotal += itemTotal;
    totalCost += itemTotal * (1 - discount);
  }

  // 전체 수량 기준 할인율 계산
  let discountRate = 0;
  if (itemCount >= TOTAL_BULK_DISCOUNT_LIMIT) {
    const bulkDiscount = totalCost * TOTAL_BULK_DISCOUNT_RATE;
    const itemDiscount = subTotal - totalCost;
    if (bulkDiscount > itemDiscount) {
      totalCost = subTotal * (1 - TOTAL_BULK_DISCOUNT_RATE);
      discountRate = TOTAL_BULK_DISCOUNT_RATE;
    } else {
      discountRate = (subTotal - totalCost) / subTotal;
    }
  } else {
    discountRate = (subTotal - totalCost) / subTotal;
  }

  // 매월 2일 특별 할인?
  if (new Date().getDay() === MONTHLY_SPECIAL_DAY) {
    totalCost *= 1 - MONTHLY_SPECIAL_DISCOUNT_RATE;
    discountRate = Math.max(discountRate, MONTHLY_SPECIAL_DISCOUNT_RATE);
  }
  return { totalCost, discountRate };
};
