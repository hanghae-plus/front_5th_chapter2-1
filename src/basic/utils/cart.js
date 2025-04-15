// utils/calculateCart.js

import { renderCartTotal, renderBonusPoints, updateStockInfo } from './dom.js';

export const calculateCart = (cartItemList, productList, cartTotal, stockStatus, bonusPoints) => {
    console.log("cartItemList   : ", cartItemList);
    const cartItems = cartItemList.children;

    let itemCount = 0;
    let subTotal = 0;
    let totalAmount = 0;

    for (let i = 0; i < cartItems.length; i++) {
        const cartItem = cartItems[i];
        const productId = cartItem.id;
        const quantity = parseInt(cartItem.querySelector('span').textContent.split('x ')[1]);

        const product = productList.find(p => p.id === productId);
        if (!product) continue;

        const itemTotal = product.val * quantity;
        let discount = 0;

        itemCount += quantity;
        subTotal += itemTotal;

        if (quantity >= 10) {
            if (product.id === 'p1') discount = 0.1;
            else if (product.id === 'p2') discount = 0.15;
            else if (product.id === 'p3') discount = 0.2;
            else if (product.id === 'p4') discount = 0.05;
            else if (product.id === 'p5') discount = 0.25;
        }

        totalAmount += itemTotal * (1 - discount);
    }

    let discountRate = 0;
    if (itemCount >= 30) {
        const bulkDiscount = totalAmount * 0.25;
        const itemDiscount = subTotal - totalAmount;
        if (bulkDiscount > itemDiscount) {
            totalAmount = subTotal * (1 - 0.25);
            discountRate = 0.25;
        } else {
            discountRate = (subTotal - totalAmount) / subTotal;
        }
    } else {
        discountRate = (subTotal - totalAmount) / subTotal;
    }

    if (new Date().getDay() === 2) {
        totalAmount *= (1 - 0.1);
        discountRate = Math.max(discountRate, 0.1);
    }

    renderCartTotal(cartTotal, totalAmount, discountRate);
    updateStockInfo(productList, stockStatus);
    renderBonusPoints(cartTotal, bonusPoints, totalAmount);

    return totalAmount;
}
