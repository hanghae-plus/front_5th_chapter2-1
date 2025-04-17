import { state } from '../store/index.js';
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
 * @returns {void}
 */
const cartCalculate = () => {
  let totalAmount = 0;
  let cartCount = 0;

  const cartList = state.cartList;
  let totalAmountBeforeDiscount = 0;
  let discountRate = 0;

  cartList.forEach((cartItem) => {
    const currentItem = state.products.find(({ id }) => id === cartItem.id);
    if (!currentItem) return;

    const quantity = cartItem.quantity;
    const itemTotalAmount = currentItem.price * quantity;
    const discountRate = getDiscountRate(cartItem.id, quantity);

    // 할인 적용 가능한 상품 할인율 반환
    totalAmount += itemTotalAmount * (1 - discountRate);
    cartCount += quantity;
    totalAmountBeforeDiscount += itemTotalAmount;
  });

  ({ totalAmount, discountRate } = bundleDiscount(
    totalAmount,
    cartCount,
    totalAmountBeforeDiscount,
    discountRate,
  ));

  ({ totalAmount, discountRate } = tuesdayDiscount(totalAmount, discountRate));

  state.set('totalAmount', totalAmount);
  state.set('discountRate', discountRate);
  state.set('cartCount', cartCount);
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

export { cartCalculate };
