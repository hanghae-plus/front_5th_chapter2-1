import { getState } from '../store/index.js';
import { PRODUCT_CONFIG } from '../constants/index.js';

/**
 * 할인 적용 가능한 상품 할인율 반환
 * @param {string} productId 상품 ID
 * @param {number} quantity 상품 수량
 * @returns {number} 할인율
 */
const getDiscountRate = (productId, quantity) => {
  if (quantity >= 10 && PRODUCT_CONFIG.DISCOUNT_RATE[productId]) {
    return PRODUCT_CONFIG.DISCOUNT_RATE[productId];
  }

  return 0;
};

/**
 * 장바구니 총액 계산
 * @param {Array} products 상품 목록
 * @param {Array} cartList 장바구니 목록
 * @returns {Object} 계산된 총액, 할인율, 포인트
 */
const calculateTotalAmount = (
  products = getState().products,
  cartList = getState().cartList,
) => {
  let totalAmount = 0;
  let cartCount = 0;
  let totalAmountBeforeDiscount = 0;
  let discountRate = 0;
  let points = 0;

  cartList.forEach((cartItem) => {
    const currentItem = products.find(({ id }) => id === cartItem.id);
    if (!currentItem) return;

    const quantity = cartItem.quantity;
    const itemTotalAmount = currentItem.price * quantity;
    const itemDiscountRate = getDiscountRate(cartItem.id, quantity);

    // 할인 적용 가능한 상품 할인율 반환
    const discountedAmount = itemTotalAmount * (1 - itemDiscountRate);
    totalAmount += discountedAmount;
    cartCount += quantity;
    totalAmountBeforeDiscount += itemTotalAmount;

    // 포인트는 할인 후 금액의 0.1%
    points += Math.floor(discountedAmount * 0.001);
  });

  // 번들 할인 적용
  const bundleResult = bundleDiscount(
    totalAmount,
    cartCount,
    totalAmountBeforeDiscount,
    discountRate,
  );
  totalAmount = bundleResult.totalAmount;
  discountRate = bundleResult.discountRate;

  // 화요일 할인 적용
  const tuesdayResult = tuesdayDiscount(totalAmount, discountRate);
  totalAmount = tuesdayResult.totalAmount;
  discountRate = tuesdayResult.discountRate;

  return { totalAmount, discountRate, points };
};

/**
 * 장바구니 수량 계산
 * @param {number} currentQuantity 현재 수량
 * @param {number} change 변경 수량
 * @param {number} maximumStock 최대 재고
 * @returns {{success: boolean, quantity: number, isRemove: boolean}} 성공 여부, 수량, 삭제 여부
 */
const calculateCartQuantity = (currentQuantity, change, maximumStock) => {
  const updatedQuantity = currentQuantity + change;
  if (updatedQuantity > maximumStock) {
    return { success: false, quantity: currentQuantity };
  }
  if (updatedQuantity <= 0) {
    return { success: true, quantity: 0, isRemove: true };
  }
  return { success: true, quantity: updatedQuantity };
};

/**
 * 번들 할인 계산
 * @param {number} totalAmount 총액
 * @param {number} cartCount 장바구니 수량
 * @param {number} totalAmountBeforeDiscount 총액 할인 전
 * @param {number} discountRate 할인율
 * @returns {object} 총액, 할인율
 */
const bundleDiscount = (
  totalAmount,
  cartCount,
  totalAmountBeforeDiscount,
  discountRate,
) => {
  if (totalAmountBeforeDiscount === 0) {
    return { totalAmount, discountRate };
  }

  discountRate =
    (totalAmountBeforeDiscount - totalAmount) / totalAmountBeforeDiscount;

  if (cartCount >= 30) {
    const bulkDiscountAmount = totalAmountBeforeDiscount * 0.25;
    const currentDiscountAmount = totalAmountBeforeDiscount - totalAmount;

    if (bulkDiscountAmount > currentDiscountAmount) {
      totalAmount = totalAmountBeforeDiscount * (1 - 0.25);
      discountRate = 0.25;
    }
  }

  return { totalAmount, discountRate };
};

/**
 * 화요일 할인 계산
 * @param {number} totalAmount 총액
 * @param {number} discountRate 할인율
 * @returns {object} 총액, 할인율
 */
const tuesdayDiscount = (totalAmount, discountRate) => {
  const isTuesday = new Date().getDay() === 2;

  if (isTuesday) {
    totalAmount *= 1 - 0.1;
    discountRate = Math.max(discountRate, 0.1);
  }

  return { totalAmount, discountRate };
};

export { calculateTotalAmount, calculateCartQuantity };
