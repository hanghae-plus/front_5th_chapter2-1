// utils/calculateCart.js
import { renderCartTotal, renderBonusPoints, updateStockInfo } from './dom.js';
import { DISCOUNT_RATES } from '../constants.js';


const BULK_DISCOUNT_THRESHOLD = 30;
const BULK_DISCOUNT_RATE = 0.25;
const WEEKLY_DISCOUNT_DAY = 2; // Tuesday

/* 총 아이템 가격 */
const calculateItemTotal = (product, quantity) => {
    return product.val * quantity;
}

/* 상품 10개 이상 구매 시 할인율 적용 */
const applyDiscount = (product, quantity) => {
    return quantity >= 10 ? (DISCOUNT_RATES[product.id] || 0) : 0;
}

/* 30개 이상 구매 시 25% 할인율 적용 */
const calculateDiscountRate = (itemCount, totalAmount, subTotal) => {
    if (itemCount >= BULK_DISCOUNT_THRESHOLD) {
        // 대량 구매시 할인율 적용
        const bulkDiscount = subTotal * BULK_DISCOUNT_RATE;
        const itemDiscount = subTotal - totalAmount;

        // 대량 구매 할인 금액과 기존 할인 금액을 비교하여 적용
        return bulkDiscount > itemDiscount
            ? { discountRate: BULK_DISCOUNT_RATE, totalAmount: subTotal * (1 - BULK_DISCOUNT_RATE) }
            : { discountRate: itemDiscount / subTotal, totalAmount };
    }

    // 대량 구매가 아니라면 기존 할인율 계산
    return { discountRate: (subTotal - totalAmount) / subTotal, totalAmount };
}

/* 매주 화요일 10% 추가 할인 적용 */
const applyWeeklyDiscount = (totalAmount, discountRate) => {
    if (new Date().getDay() === WEEKLY_DISCOUNT_DAY) {
        const discountedTotal = totalAmount * (1 - 0.1);
        discountRate = Math.max(discountRate, 0.1);
        return { discountedTotal, discountRate };
    }
    return { discountedTotal: totalAmount, discountRate };
};

export const calculateCart = (cartItemList, productList, cartTotal, stockStatus, bonusPoints) => {
    const cartItems = cartItemList.children;

    let itemCount = 0;
    let subTotal = 0;
    let totalAmount = 0;
    let discountRate = 0

    Array.from(cartItems).forEach(item => {
        const productId = item.id;
        const quantity = parseInt(item.querySelector('span').textContent.split('x ')[1]);

        const product = productList.find(p => p.id === productId);
        if (!product) return;

        const itemTotal = calculateItemTotal(product, quantity);
        const discount = applyDiscount(product, quantity);

        itemCount += quantity;
        subTotal += itemTotal;
        totalAmount += itemTotal * (1 - discount);
    });

    // 대량 구매 할인 계산
    const { discountRate: bulkDiscountRate, totalAmount: bulkDiscountTotal } = calculateDiscountRate(itemCount, totalAmount, subTotal);
    discountRate = bulkDiscountRate;
    totalAmount = bulkDiscountTotal;

    // 주간 할인 적용 (화요일만)
    const { discountedTotal, discountRate: weeklyDiscountRate } = applyWeeklyDiscount(totalAmount, discountRate);
    totalAmount = discountedTotal;
    discountRate = weeklyDiscountRate;

    renderCartTotal(cartTotal, totalAmount, discountRate);
    updateStockInfo(productList, stockStatus);
    renderBonusPoints(cartTotal, bonusPoints, totalAmount);

    return totalAmount;
}
