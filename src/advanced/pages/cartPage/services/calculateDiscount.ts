// 10개 이상 구매시 상품별 할인 p1 10% p2 15% p3 20% p4 5% p5 25%
// 30개 이상 구매시 25% 할인 -> 개별 할인과 구매 할인중 큰 할인율 적용
// 화요일에는 추가 10% 할인 -> 기존 할인율과 비교해서 더 큰 할인율 적용
import { Product } from '../../../types';

const DISCOUNT_THRESHOLDS = {
  p1: 0.1,
  p2: 0.15,
  p3: 0.2,
  p4: 0.05,
  p5: 0.25,
};

export const calculateDiscount = (
  cartItems: Product[],
  discountThresholds = DISCOUNT_THRESHOLDS,
  bulkDiscountThreshold = 30,
  bulkDiscountRate = 0.25,
  tuesdayDiscountRate = 0.1,
  minimumDiscountQuantity = 10
) => {
  let subtotalBeforeDiscount = 0;
  let totalAmount = 0;
  let itemCount = 0;
  let calculatedDiscountRate = 0;

  cartItems.forEach((item) => {
    const itemTotal = item.price * item.stock;
    subtotalBeforeDiscount += itemTotal;
    itemCount += item.stock;

    let discount = 0;
    if (item.stock >= minimumDiscountQuantity) {
      discount = discountThresholds[item.id as keyof typeof discountThresholds] || 0;
    }
    totalAmount += itemTotal * (1 - discount);
  });

  if (itemCount >= bulkDiscountThreshold) {
    const bulkDiscountAmount = totalAmount * bulkDiscountRate;
    const individualDiscountAmount = subtotalBeforeDiscount - totalAmount;

    if (bulkDiscountAmount > individualDiscountAmount) {
      totalAmount = subtotalBeforeDiscount * (1 - bulkDiscountRate);
      calculatedDiscountRate = bulkDiscountRate;
    } else {
      calculatedDiscountRate = (subtotalBeforeDiscount - totalAmount) / subtotalBeforeDiscount;
    }
  } else {
    calculatedDiscountRate = (subtotalBeforeDiscount - totalAmount) / subtotalBeforeDiscount;
  }

  if (new Date().getDay() === 2) {
    totalAmount *= 1 - tuesdayDiscountRate;
    calculatedDiscountRate = Math.max(calculatedDiscountRate, tuesdayDiscountRate);
  }

  return { totalAmount, calculatedDiscountRate };
};
