import {state} from "../store/state.js";
import {updateStockInfo} from "./stockInfo.js";

export const calcCart = () => {
    const cartItems = state.elements.cartDisplay.children;
    if (!cartItems) return;

    state.totalAmount = 0;
    state.itemCount = 0;

    let subTotal = 0;

    for (const itemEl of cartItems) {
        const productId = itemEl.id;
        const product = state.products.find(p => p.id === productId);
        if (!product) continue;

        const quantity = parseInt(itemEl.querySelector('span').textContent.split('x ')[1], 10);
        const itemTotal = product.val * quantity;

        let discount = 0;
        if (quantity >= 10) {
            if (productId === 'p1') discount = 0.1;
            else if (productId === 'p2') discount = 0.15;
            else if (productId === 'p3') discount = 0.2;
            else if (productId === 'p4') discount = 0.05;
            else if (productId === 'p5') discount = 0.25;
        }

        subTotal += itemTotal;
        state.itemCount += quantity;
        state.totalAmount += itemTotal * (1 - discount);
    }

    let discountRate = 0;
    if (state.itemCount >= 30) {
        const bulkDiscount = subTotal * 0.25;
        const itemDiscount = subTotal - state.totalAmount;
        if (bulkDiscount > itemDiscount) {
            state.totalAmount = subTotal * 0.75;
            discountRate = 0.25;
        } else {
            discountRate = itemDiscount / subTotal;
        }
    } else {
        discountRate = (subTotal - state.totalAmount) / subTotal;
    }

    // 화요일 추가 할인
    const isTuesday = new Date().getDay() === 2;
    if (isTuesday) {
        state.totalAmount *= 0.9;
        discountRate = Math.max(discountRate, 0.1);
    }

    renderTotal(discountRate);
    renderBonusPoints();
   updateStockInfo();
};

const renderTotal = (discountRate) => {
    const el = state.elements.totalDisplay;
    if (!el) return;

    el.textContent = `총액: ${Math.round(state.totalAmount)}원`;

    if (discountRate > 0) {
        const discountTag = document.createElement('span');
        discountTag.className = 'text-green-500 ml-2';
        discountTag.textContent = `(${(discountRate * 100).toFixed(1)}% 할인 적용)`;
        el.appendChild(discountTag);
    }
};

const renderBonusPoints = () => {
    state.bonusPoints = Math.floor(state.totalAmount / 1000);

    let pointsTag = document.getElementById('loyalty-points');
    if (!pointsTag) {
        pointsTag = document.createElement('span');
        pointsTag.id = 'loyalty-points';
        pointsTag.className = 'text-blue-500 ml-2';
        state.elements.totalDisplay.appendChild(pointsTag);
    }

    pointsTag.textContent = `(포인트: ${state.bonusPoints})`;
};