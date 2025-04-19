// services/calculationService.js
import { PRODUCT_CONSTANTS } from "../constants/products.js";

/**
 * 아이템별 할인율 계산
 * @param {string} productId 상품 ID
 * @param {number} quantity 수량
 * @returns {number} 할인율 (0~1 사이의 값)
 */
export const calculateItemDiscount = (productId, quantity) => {
  const { QUANTITY_DISCOUNT_THRESHOLD, QUANTITY_DISCOUNT_RATES } = PRODUCT_CONSTANTS;

  if (quantity < QUANTITY_DISCOUNT_THRESHOLD) return 0;

  return QUANTITY_DISCOUNT_RATES[productId] || 0;
};

/**
 * 장바구니 전체 계산
 * @param {Object} state 현재 상태
 * @returns {Object} 계산 결과 (totalAmount, itemCount, discountRate, bonusPoints)
 */
export const calculateCartTotal = (state) => {
  const { cartItems, products } = state;
  const { BULK_PURCHASE_THRESHOLD, BULK_DISCOUNT_RATE, POINT_RATE } = PRODUCT_CONSTANTS;

  let totalAmount = 0;
  let itemCount = 0;
  let subtotal = 0;

  // 각 상품별 합계 및 할인 계산
  Object.entries(cartItems).forEach(([productId, quantity]) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const itemTotal = product.val * quantity;
    itemCount += quantity;
    subtotal += itemTotal;

    const discount = calculateItemDiscount(productId, quantity);
    totalAmount += itemTotal * (1 - discount);
  });

  // 대량 구매 할인 계산
  let discountRate = 0;
  if (itemCount >= BULK_PURCHASE_THRESHOLD) {
    const bulkDiscount = totalAmount * BULK_DISCOUNT_RATE;
    const itemDiscount = subtotal - totalAmount;

    if (bulkDiscount > itemDiscount) {
      totalAmount = subtotal * (1 - BULK_DISCOUNT_RATE);
      discountRate = BULK_DISCOUNT_RATE;
    } else {
      discountRate = (subtotal - totalAmount) / subtotal;
    }
  } else {
    discountRate = subtotal > 0 ? (subtotal - totalAmount) / subtotal : 0;
  }

  // 화요일 할인 적용
  if (isTuesday()) {
    totalAmount *= 0.9; // 10% 할인
    discountRate = Math.max(discountRate, 0.1);
  }

  // 포인트 계산
  const bonusPoints = Math.floor(totalAmount / POINT_RATE);

  return {
    totalAmount: Math.round(totalAmount),
    itemCount,
    discountRate,
    bonusPoints
  };
};

/**
 * 대량 구매 할인 계산
 * @param {number} itemCount 총 상품 개수
 * @param {number} totalAmount 할인 적용 전 총액
 * @param {number} subtotal 개별 할인 적용 후 총액
 * @returns {number} 전체 할인율
 */
export const calculateBulkDiscount = (itemCount, totalAmount, subtotal) => {
  const { BULK_PURCHASE_THRESHOLD, BULK_DISCOUNT_RATE } = PRODUCT_CONSTANTS;

  // 아이템별 할인이 없는 경우
  if (totalAmount === subtotal) return 0;

  // 30개 이상 구매 시 추가 대량 할인 적용 검토
  if (itemCount >= BULK_PURCHASE_THRESHOLD) {
    const bulkDiscount = totalAmount * BULK_DISCOUNT_RATE;
    const currentDiscount = subtotal - totalAmount; // 현재 할인액

    // 대량 할인이 더 크면 대량 할인 적용
    if (bulkDiscount > currentDiscount) {
      return BULK_DISCOUNT_RATE;
    }
  }

  // 아이템별 할인만 적용
  return (subtotal - totalAmount) / subtotal;
};

/**
 * 현재 날짜가 화요일인지 확인
 * @returns {boolean} 화요일 여부
 */
export const isTuesday = () => {
  return new Date().getDay() === 2;
};

/**
 * 포인트 계산
 * @param {number} amount 금액
 * @returns {number} 포인트
 */
export const calculatePoints = (amount) => {
  const { POINT_RATE } = PRODUCT_CONSTANTS;
  return Math.floor(amount / POINT_RATE);
};
