import { PRODUCT_CONFIG } from '../../../core/constants';
import { state } from '../../../core/state';
import { elements } from '../../../core/dom';

/**
 * 할인 가격 계산
 * @param {number} price 가격
 * @param {number} discountRate 할인율
 * @returns {number} 할인 가격
 */
const getDiscountPrice = (price, discountRate) => price * (1 - discountRate);

/**
 * 장바구니 총액 계산
 * @param {Array<{id: string, name: string, price: number, stock: number}>} products 상품 목록
 * @returns {{totalAmount: number, discountRate: number, cartItemCount: number}} 총액, 할인율, 총 수량
 */
const calculateTotalAmount = (products = state.products) => {
  let totalAmount = 0;
  let cartItemCount = 0;
  let subTotalAmount = 0;

  const cartItems = [...elements.cartItemsContainer.children];

  for (const item of cartItems) {
    // 현재 상품 찾기
    const currentProduct = products.find((product) => product.id === item.id);

    // 수량 추출
    const quantity = parseInt(
      item.querySelector('span').textContent.split('x ')[1],
    );
    // 상품 가격 계산
    const currentProductPrice = currentProduct.price * quantity;
    let discountRate = 0;

    // 수량 증가
    cartItemCount += quantity;

    // 총 가격 계산
    subTotalAmount += currentProductPrice;

    // 할인 적용
    if (quantity >= 10) {
      discountRate = PRODUCT_CONFIG.DISCOUNT_RATE[currentProduct.id] || 0;
    }

    // 할인 가격 계산
    totalAmount += getDiscountPrice(currentProductPrice, discountRate);
  }

  let discountRate = 0;

  // 30개 이상 구매시 25% 할인
  if (cartItemCount >= 30) {
    const bulkDiscount = totalAmount * 0.25;
    const itemDiscount = subTotalAmount - totalAmount;

    // 총 할인 가격이 상품 할인 가격보다 크면 총 할인 가격 적용
    if (bulkDiscount > itemDiscount) {
      totalAmount = getDiscountPrice(subTotalAmount, 0.25);
      discountRate = 0.25;
    } else {
      // 총 할인 가격이 상품 할인 가격보다 작으면 상품 할인 가격 적용
      discountRate = (subTotalAmount - totalAmount) / subTotalAmount;
    }
  } else {
    // 30개 미만 구매시 할인 가격 계산
    discountRate = (subTotalAmount - totalAmount) / subTotalAmount;
  }

  // 화요일 할인 적용
  const isTuesday = new Date().getDay() === 2;

  if (isTuesday) {
    totalAmount = getDiscountPrice(totalAmount, 0.1);
    discountRate = Math.max(discountRate, 0.1);
  }
  return { totalAmount, discountRate, cartItemCount };
};

export { calculateTotalAmount };
