import { elementms } from "../pages/App";
import { prodList } from "../state";
import store from "../state/state";

function updateCartTotalDisplay(totalAmt, discountRate, element) {
    element.textContent = '총액: ' + Math.round(totalAmt) + '원';
    if (discountRate > 0) {
        const span = document.createElement('span');
        span.className = 'text-green-500 ml-2';
        span.textContent = `(${(discountRate * 100).toFixed(1)}% 할인 적용)`;
        element.appendChild(span);
    }
}

function applyTuesdayDiscount(totalAmt, discountRate) {
    if (new Date().getDay() === 2) {
        totalAmt *= 0.9;
        discountRate = Math.max(discountRate, 0.1);
    }
    return { totalAmt, discountRate };
}

function applyBulkDiscount(subTot, totalAmt, itemCnt) {
    let discountRate = 0;
    if (itemCnt >= 30) {
        const bulkDiscount = subTot * 0.25;
        const itemDiscount = subTot - totalAmt;
        if (bulkDiscount > itemDiscount) {
            totalAmt = subTot * (1 - 0.25);
            discountRate = 0.25;
        } else {
            discountRate = itemDiscount / subTot;
        }
    } else {
        discountRate = (subTot - totalAmt) / subTot;
    }
    return { totalAmt, discountRate };
}

function calculateItemTotals(cartItems, prodList) {
    let subTot = 0;
    let totalAmt = 0;
    let itemCnt = 0;

    for (const itemEl of cartItems) {
        const productId = itemEl.id;
        const product = prodList.find(p => p.id === productId);
        if (!product) continue;

        const quantity = parseInt(itemEl.querySelector('span').textContent.split('x ')[1]);
        const itemTotal = product.price * quantity;
        itemCnt += quantity;
        subTot += itemTotal;

        let discount = 0;
        if (quantity >= 10) {
            const discountRates = { p1: 0.1, p2: 0.15, p3: 0.2, p4: 0.05, p5: 0.25 };
            discount = discountRates[product.id] || 0;
        }

        totalAmt += itemTotal * (1 - discount);
    }

    return { subTot, totalAmt, itemCnt };
}


export function calcCart() {
    const cartItems = elementms.cartItems.children;

    const { subTot, totalAmt: preTotal, itemCnt } = calculateItemTotals(cartItems, prodList);
    let { totalAmt, discountRate } = applyBulkDiscount(subTot, preTotal, itemCnt);
    ({ totalAmt, discountRate } = applyTuesdayDiscount(totalAmt, discountRate));

    updateCartTotalDisplay(totalAmt, discountRate, elementms.cartTotal);

    store.state.totalAmt = totalAmt; // 전역 포인트 계산용
    store.state.itemCnt = itemCnt;

    updateStockInfo();
    renderBonusPts();
}

const renderBonusPts = () => {
    store.state.bonusPts = Math.floor(store.state.totalAmt / 1000);
    var ptsTag = document.getElementById('loyalty-points');
    if (!ptsTag) {
        ptsTag = document.createElement('span');
        ptsTag.id = 'loyalty-points';
        ptsTag.className = 'text-blue-500 ml-2';
        elementms.cartTotal.appendChild(ptsTag);
    }
    ptsTag.textContent = '(포인트: ' + store.state.bonusPts + ')';
};

function updateStockInfo() {
    var infoMsg = '';
    prodList.forEach(function (item) {
        if (item.quantity < 5) {
            infoMsg += item.name + ': ' + (item.quantity > 0 ? '재고 부족 (' + item.quantity + '개 남음)' : '품절') + '\n';
        }
    });
    elementms.stockStatus.textContent = infoMsg;
}

