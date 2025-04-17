/**
 * 상품 할인 정책
 * @typedef {Object} ProductDiscountPolicy
 * @property {Object} RATES - 상품별 할인율
 * @property {number} MIN_QUANTITY - 최소 구매 수량
 */

/**
 * 장바구니 할인 정책
 * @typedef {Object} CartDiscountPolicy
 * @property {number} BULK_THRESHOLD - 대량 구매 기준 수량
 * @property {number} BULK_RATE - 대량 구매 할인율
 */

/**
 * 화요일 할인 정책
 * @typedef {Object} TuesdayDiscountPolicy
 * @property {number} RATE - 화요일 할인율
 */

/**
 * 전체 할인 정책
 * @typedef {Object} DiscountPolicies
 * @property {ProductDiscountPolicy} PRODUCT - 상품 할인 정책
 * @property {CartDiscountPolicy} CART - 장바구니 할인 정책
 * @property {TuesdayDiscountPolicy} TUESDAY - 화요일 할인 정책
 */

/** @type {DiscountPolicies} */
const DISCOUNT_POLICIES = {
  PRODUCT: {
    RATES: {
      p1: 0.1,
      p2: 0.15,
      p3: 0.2,
      p4: 0.05,
      p5: 0.25,
    },
    MIN_QUANTITY: 10,
  },
  CART: {
    BULK_THRESHOLD: 30,
    BULK_RATE: 0.25,
  },
  TUESDAY: {
    RATE: 0.1,
  },
};

/**
 * 상품 할인 금액을 계산합니다.
 * @param {Object} product - 상품 정보
 * @param {string} product.id - 상품 ID
 * @param {number} product.price - 상품 가격
 * @param {number} quantity - 구매 수량
 * @returns {number} 할인 적용된 금액
 */
export const calculateProductDiscount = (product, quantity) => {
  const discountRate =
    quantity >= DISCOUNT_POLICIES.PRODUCT.MIN_QUANTITY
      ? DISCOUNT_POLICIES.PRODUCT.RATES[product.id] || 0
      : 0;

  return product.price * quantity * (1 - discountRate);
};

/**
 * 대량 구매 할인 금액을 계산합니다.
 * @param {number} totalPrice - 총 금액
 * @returns {number} 대량 구매 할인 금액
 */
const calculateBulkDiscount = (totalPrice) => {
  return totalPrice * DISCOUNT_POLICIES.CART.BULK_RATE;
};

/**
 * 상품별 할인 금액을 계산합니다.
 * @param {number} totalPriceBeforeDiscount - 할인 전 총 금액
 * @param {number} totalPrice - 할인 후 총 금액
 * @returns {number} 상품별 할인 금액
 */
const calculateItemDiscount = (totalPriceBeforeDiscount, totalPrice) => {
  return totalPriceBeforeDiscount - totalPrice;
};

/**
 * 장바구니 할인율을 계산합니다.
 * @param {number} totalPrice - 할인 후 총 금액
 * @param {number} totalPriceBeforeDiscount - 할인 전 총 금액
 * @param {number} totalProductCount - 총 상품 수량
 * @returns {number} 최종 할인율
 */
export const calculateCartDiscount = (totalPrice, totalPriceBeforeDiscount, totalProductCount) => {
  if (totalProductCount < DISCOUNT_POLICIES.CART.BULK_THRESHOLD) {
    return (totalPriceBeforeDiscount - totalPrice) / totalPriceBeforeDiscount;
  }

  const bulkDiscount = calculateBulkDiscount(totalPrice);
  const itemDiscount = calculateItemDiscount(totalPriceBeforeDiscount, totalPrice);

  if (bulkDiscount > itemDiscount) {
    return DISCOUNT_POLICIES.CART.BULK_RATE;
  }

  return itemDiscount / totalPriceBeforeDiscount;
};

/**
 * 화요일 할인을 적용합니다.
 * @param {number} price - 현재 가격
 * @param {number} currentDiscountRate - 현재 할인율
 * @returns {Object} 할인 적용된 가격과 할인율
 * @returns {number} returns.price - 할인 적용된 가격
 * @returns {number} returns.discountRate - 최종 할인율
 */
export const calculateTuesdayDiscount = (price, currentDiscountRate) => {
  if (new Date().getDay() === 2) {
    return {
      price: price * (1 - DISCOUNT_POLICIES.TUESDAY.RATE),
      discountRate: Math.max(currentDiscountRate, DISCOUNT_POLICIES.TUESDAY.RATE),
    };
  }

  return { price, discountRate: currentDiscountRate };
};
