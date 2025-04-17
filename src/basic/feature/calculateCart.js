import { state, domRefs } from '../store/state';

import {
    CLASS_NAME,
    DISCOUNT_THRESHOLDS,
    SPECIAL_DISCOUNT_RATE,
    SPECIAL_DISCOUNT_DAY,
    BULK_DISCOUNT_RATE,
} from '../constants';

import updateStockStatus from './updateStockStatus';
import renderBonusPoints from './renderBonusPoints';

export default function calculateCart() {
    const { cartItemsContainer, totalAmountElement } = domRefs;
    const { productList } = state;

    state.totalAmount = 0;
    state.totalItemCount = 0;

    const cartItems = cartItemsContainer.children;
    let subtotal = 0;

    for (let i = 0; i < cartItems.length; i++) {
        const cartItem = cartItems[i];
        const product = productList.find((p) => p.id === cartItem.id);
        if (!product) continue;

        const quantity = parseInt(cartItem.querySelector('span').textContent.split('x ')[1], 10);
        const itemTotal = product.val * quantity;

        let discount = 0;
        if (quantity >= 10) {
            discount = DISCOUNT_THRESHOLDS[product.id] || 0;
        }

        state.totalItemCount += quantity;
        subtotal += itemTotal;
        state.totalAmount += itemTotal * (1 - discount);
    }

    let discountRate = 0;

    if (state.totalItemCount >= 30) {
        const bulkDiscount = subtotal * BULK_DISCOUNT_RATE;
        const itemDiscount = subtotal - state.totalAmount;

        if (bulkDiscount > itemDiscount) {
            state.totalAmount = subtotal * 0.75;
            discountRate = 0.25;
        } else {
            discountRate = itemDiscount / subtotal;
        }
    } else {
        discountRate = (subtotal - state.totalAmount) / subtotal;
    }

    if (new Date().getDay() === SPECIAL_DISCOUNT_DAY) {
        state.totalAmount *= 0.9;
        discountRate = Math.max(discountRate, SPECIAL_DISCOUNT_RATE);
    }

    totalAmountElement.textContent = `총액: ${Math.round(state.totalAmount)}원`;

    if (discountRate > 0) {
        const discountSpan = document.createElement('span');
        discountSpan.className = CLASS_NAME.DISCOUNT;
        discountSpan.textContent = `(${(discountRate * 100).toFixed(1)}% 할인 적용)`;

        totalAmountElement.appendChild(discountSpan);
    }

    updateStockStatus();
    renderBonusPoints();
}
