import { renderBonusPoints } from './renderBonusPoints';
import { updateStockInfo } from './updateStockInfo';

/** 카트 아이템 총액 계산 */
export function calculateTotalPrice(products) {
    const $cartItem = document.getElementById('cart-items');
    const $cartTotal = document.getElementById('cart-total');

    let totalAmount = 0;
    let itemCount = 0;

    const cartItems = $cartItem.children;
    let subTotal = 0;

    for (let i = 0; i < cartItems.length; i++) {
        (function () {
            let currentItem;

            for (let j = 0; j < products.length; j++) {
                if (products[j].id === cartItems[i].id) {
                    currentItem = products[j];
                    break;
                }
            }

            const quantity = parseInt(cartItems[i].querySelector('span').textContent.split('x ')[1]);
            const itemTotalPrice = currentItem.price * quantity;

            let discount = 0;
            itemCount += quantity;
            subTotal += itemTotalPrice;

            if (quantity >= 10) {
                if (currentItem.id === 'p1') {
                    discount = 0.1;
                } else if (currentItem.id === 'p2') {
                    discount = 0.15;
                } else if (currentItem.id === 'p3') {
                    discount = 0.2;
                } else if (currentItem.id === 'p4') {
                    discount = 0.05;
                } else if (currentItem.id === 'p5') {
                    discount = 0.25;
                }
            }

            totalAmount += itemTotalPrice * (1 - discount);
        })();
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

    // 화요일 할인 적용
    if (new Date().getDay() === 2) {
        totalAmount *= 1 - 0.1;
        discountRate = Math.max(discountRate, 0.1);
    }

    $cartTotal.textContent = '총액: ' + Math.round(totalAmount) + '원';

    if (discountRate > 0) {
        const span = document.createElement('span');

        span.className = 'text-green-500 ml-2';
        span.textContent = '(' + (discountRate * 100).toFixed(1) + '% 할인 적용)';

        $cartTotal.appendChild(span);
    }

    updateStockInfo(products);
    renderBonusPoints(totalAmount);
}
