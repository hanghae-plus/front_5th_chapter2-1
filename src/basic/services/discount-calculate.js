/**
 * 할인 가격 계산
 * @param {number} price 가격
 * @param {number} discountRate 할인율
 * @returns {number} 할인 가격
 */
const getDiscountPrice = (price, discountRate) => price * (1 - discountRate);

export { getDiscountPrice };
