import { PRODUCTS } from './productList.constant.js';
import renderBonusPts from './renderBonusPts.js';
import updateStockInfo from './updateStockInfo.js';

export default function calculatePrice() {
  const cartDisp = document.getElementById('cart-items');
  const sum = document.getElementById('cart-total');

  let totalAmount = 0;
  let itemCount = 0;
  let cartItems = cartDisp.children;
  let subTotal = 0;

  for (let i = 0; i < cartItems.length; i++) {
    let currentItem;
    for (let j = 0; j < PRODUCTS.length; j++) {
      if (PRODUCTS[j].id === cartItems[i].id) {
        currentItem = PRODUCTS[j];
        break;
      }
    }

    let q = parseInt(
      cartItems[i].querySelector('span').textContent.split('x ')[1]
    );

    let itemTotal = currentItem.price * q;
    let discount = 0;
    itemCount += q;
    subTotal += itemTotal;

    if (q >= 10) {
      switch (currentItem.id) {
        case 'p1':
          discount = 0.1;
          break;
        case 'p2':
          discount = 0.15;
          break;
        case 'p3':
          discount = 0.2;
          break;
        case 'p4':
          discount = 0.05;
          break;
        case 'p5':
          discount = 0.25;
          break;
      }
    }

    totalAmount += itemTotal * (1 - discount);
  }

  let discountRate = 0;
  if (itemCount >= 30) {
    let bulkDiscount = totalAmount * 0.25;
    let itemDiscount = subTotal - totalAmount;
    if (bulkDiscount > itemDiscount) {
      totalAmount = subTotal * (1 - 0.25);
      discountRate = 0.25;
    } else {
      discountRate = (subTotal - totalAmount) / subTotal;
    }
  } else {
    discountRate = (subTotal - totalAmount) / subTotal;
  }

  // if (new Date().getDay() === 2) {
  //   totalAmount *= 1 - 0.1;
  //   discountRate = Math.max(discountRate, 0.1);
  // }

  sum.textContent = `총액: ${Math.round(totalAmount)}원`;
  if (discountRate > 0) {
    let span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = `(${(discountRate * 100).toFixed(1)}% 할인 적용)`;
    sum.appendChild(span);
  }

  updateStockInfo();
  renderBonusPts();
}
