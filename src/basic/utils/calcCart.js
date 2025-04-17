import {state} from "../store/state.js";

export function calcCart() {
    state.totalAmount = 0;
    state.itemCount = 0;
    var cartItems = state.elements.cartDisplay.children;
    var subTot = 0;
    for (var i = 0; i < cartItems.length; i++) {
        (function () {
            var curItem;
            for (var j = 0; j < state.products.length; j++) {
                if (state.products[j].id === cartItems[i].id) {
                    curItem = state.products[j];
                    break;
                }
            }
            var q = parseInt(cartItems[i].querySelector('span').textContent.split('x ')[1]);
            var itemTot = curItem.val * q;
            var disc = 0;
            state.itemCount += q;
            subTot += itemTot;
            if (q >= 10) {
                if (curItem.id === 'p1') disc = 0.1;
                else if (curItem.id === 'p2') disc = 0.15;
                else if (curItem.id === 'p3') disc = 0.2;
                else if (curItem.id === 'p4') disc = 0.05;
                else if (curItem.id === 'p5') disc = 0.25;
            }
            state.totalAmount += itemTot * (1 - disc);
        })();
    }

    let discRate = 0;

    if (itemCount >= 30) {
        var bulkDisc = state.totalAmount * 0.25;
        var itemDisc = subTot - state.totalAmount;
        if (bulkDisc > itemDisc) {
            state.totalAmount = subTot * (1 - 0.25);
            discRate = 0.25;
        } else {
            discRate = (subTot - state.totalAmount) / subTot;
        }
    } else {
        discRate = (subTot - state.totalAmount) / subTot;
    }
    if (new Date().getDay() === 2) {
        state.totalAmount *= (1 - 0.1);
        discRate = Math.max(discRate, 0.1);
    }
    state.elements.totalDisplay.textContent = '총액: ' + Math.round(state.totalAmount) + '원';
    if (discRate > 0) {
        var span = document.createElement('span');
        span.className = 'text-green-500 ml-2';
        span.textContent = '(' + (discRate * 100).toFixed(1) + '% 할인 적용)';
        state.elements.totalDisplay.appendChild(span);
    }
    updateStockInfo();
    renderBonusPts();
}
