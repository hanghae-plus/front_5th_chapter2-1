import { state } from '../store/index.js';
import { getDiscountPrice } from './discount-calculate.js';
import { PRODUCT_CONFIG } from '../constants/index.js';

/**
 * 장바구니 총액 계산
 * @param {Array<{id: string, name: string, price: number, stock: number}>} products 상품 목록
 * @returns {{totalAmount: number, discountRate: number, cartItemCount: number}} 총액, 할인율, 총 수량
 */
const calculateTotalAmount = (products = state.products) => {
  let totalAmount = state.totalAmount;
  let discountRate = state.discountRate;
  let cartItemCount = 0;
  let subTotalAmount = 0;

  const cartItems = [...state.cartList];

  for (const item of cartItems) {
    const currentProduct = products.find((product) => product.id === item.id);
    const quantity = parseInt(item.dataset.quantity);
    const currentProductPrice = currentProduct.price * quantity;
    let discountRate = 0;

    cartItemCount += quantity;

    subTotalAmount += currentProductPrice;

    if (quantity >= 10) {
      discountRate = PRODUCT_CONFIG.DISCOUNT_RATE[currentProduct.id] || 0;
    }
    // 할인 가격 계산
    totalAmount += getDiscountPrice(currentProductPrice, discountRate);
  }

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

  return { totalAmount, discountRate };
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
  if (updatedQuantity > maximumStock) return { success: false };
  if (updatedQuantity <= 0) return { success: true, quantity: 1 };
  return { success: true, quantity: updatedQuantity };
};

export { calculateTotalAmount, calculateCartQuantity };
