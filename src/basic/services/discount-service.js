// 할인 계산 관련 로직
import { findProductById } from '../components/product.js';
import { isTuesday } from '../utils/helpers.js';
import {
  DISCOUNT_RATES,
  BULK_DISCOUNT_RATE,
  BULK_QUANTITY_THRESHOLD,
  TUESDAY_DISCOUNT_RATE
} from '../data/constants.js';

/*
* 개별 상품 할인율 계산 함수
* */
export function calcItemDiscount(productId, quantity) {
  if (quantity < 10) return 0;
  return DISCOUNT_RATES[productId] || 0;
}

/*
* 대량 구매 할인 여부 확인 함수
* */
export function isBulkOrder(totalItemCount) {
  return totalItemCount >= BULK_QUANTITY_THRESHOLD;
}

/*
* 장바구니 내 모든 상품의 개별 할인 적용 후 금액 계산
* */
export function calcItemDiscountedTotal(cartList, products) {
  let total = 0;

  Array.from(cartList.children).forEach(cartItem => {
    const product = findProductById(cartItem.id, products);
    if (!product) return;

    const quantity = parseInt(cartItem.querySelector('span').textContent.split('x ')[1]);
    const itemTotal = product.price * quantity;
    const discount = calcItemDiscount(cartItem.id, quantity);

    total += itemTotal * (1 - discount);
  });

  return total;
}

/*
* 화요일 할인 적용 함수
* */
export function applyTuesdayDiscount(amount) {
  if (isTuesday()) {
    return amount * (1 - TUESDAY_DISCOUNT_RATE);
  }
  return amount;
}

/*
* 최종 할인율 계산 함수
* */
export function calcDiscountRate(cartList, products, subtotal, totalItemCount) {
  if (subtotal === 0) {
    return { finalAmount: 0, discountRate: 0 };
  }

  // 1. 개별 상품 할인 적용
  const totalWithItemDiscount = calcItemDiscountedTotal(cartList, products);
  let finalAmount = totalWithItemDiscount;

  // 이미 적용된 상품별 할인율 계산
  const itemDiscountTotal = subtotal - totalWithItemDiscount;
  let discountRate = itemDiscountTotal / subtotal || 0;

  // 2. 대량 구매 할인 적용 여부 확인
  if (isBulkOrder(totalItemCount)) {
    const bulkDiscountAmount = totalWithItemDiscount * BULK_DISCOUNT_RATE;

    // 더 큰 할인율 적용
    if (bulkDiscountAmount > itemDiscountTotal) {
      finalAmount = subtotal * (1 - BULK_DISCOUNT_RATE);
      discountRate = BULK_DISCOUNT_RATE;
    }
  }

  // 3. 화요일 할인 적용
  if (isTuesday()) {
    finalAmount = applyTuesdayDiscount(finalAmount);
    discountRate = Math.max(discountRate, TUESDAY_DISCOUNT_RATE);
  }

  return {
    finalAmount,
    discountRate
  };
}