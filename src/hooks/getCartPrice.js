import { store } from "../store/store";
import { checkStock } from "./checkStock";
import { getPoints } from "./getPoints";

const PRODUCT_DISCOUNTS = {
    p1: 0.1,
    p2: 0.15,
    p3: 0.2,
    p4: 0.05,
    p5: 0.25,
};

export function getCartPrice () {
    const cartItems = store.element.cartDisp.children;
    const { products, state } = store;

    let subtotal = 0;
    let total = 0;
    let itemCount = 0;

    Array.from(cartItems).forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return;
    
        const quantityText = item.querySelector('span')?.textContent || '';
        const quantity = parseInt(quantityText.split('x ')[1]) || 0;
        const itemTotal = product.val * quantity;
    
        const itemDiscount = quantity >= 10 ? PRODUCT_DISCOUNTS[product.id] || 0 : 0;
        const discountedTotal = itemTotal * (1 - itemDiscount);
    
        itemCount += quantity;
        subtotal += itemTotal;
        total += discountedTotal;
    });

    let discountRate = computeBulkDiscountRate(itemCount, subtotal, total);
    total = applySpecialDayDiscount(total, discountRate);

    state.itemCnt = itemCount;
    state.totalAmt = Math.round(total);

    renderTotal(state.totalAmt, discountRate);
    checkStock();
    getPoints(store.element.sum);
}

function computeBulkDiscountRate(itemCount, subtotal, currentTotal) {
    if (itemCount < 30) return (subtotal - currentTotal) / subtotal;
  
    const bulkDiscountAmt = subtotal * 0.25;
    const itemDiscountAmt = subtotal - currentTotal;
  
    if (bulkDiscountAmt > itemDiscountAmt) {
      store.state.totalAmt = subtotal * (1 - 0.25);
      return 0.25;
    }
  
    return itemDiscountAmt / subtotal;
}

function applySpecialDayDiscount(total, currentRate) {
    const today = new Date().getDay();
    const isTuesday = today === 2;
  
    if (!isTuesday) return total;
    const discounted = total * 0.9;
    store.state.totalAmt = discounted;
    return discounted;
}

function renderTotal(totalAmt, discountRate) {
    const sumEl = store.element.sum;
    sumEl.textContent = `총액: ${Math.round(totalAmt)}원`;
  
    if (discountRate > 0) {
      const discountSpan = document.createElement('span');
      discountSpan.className = 'text-green-500 ml-2';
      discountSpan.textContent = `(${(discountRate * 100).toFixed(1)}% 할인 적용)`;
      sumEl.appendChild(discountSpan);
    }
}
  