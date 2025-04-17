import { updateBonusPointsDisplay } from './updateBonusPointsDisplay';
import { updateStockStatus } from './updateStockStatus';
import { PRODUCT_LIST } from '../constant';
import { DISCOUNT_RATE } from '../constant';

const getDiscountRate = (itemCnt, totalAmt, subTotal) => {
  let discountRate = 0;

  const itemDiscountRate = (subTotal - totalAmt) / subTotal;

  if (itemCnt >= 30) {
    const bulkDiscountRate = 0.25;
    discountRate = Math.max(itemDiscountRate, bulkDiscountRate);
  } else {
    discountRate = itemDiscountRate;
  }

  const isTuesday = new Date().getDay() === 2;
  if (isTuesday) {
    discountRate = Math.max(discountRate, 0.1);
  }

  return discountRate;
};

export const updateCartSummary = () => {
  let totalAmt = 0;
  let itemCnt = 0;
  const cartItems = document.getElementById('cart-items').children;
  let subTotal = 0;
  for (let i = 0; i < cartItems.length; i++) {
    (function () {
      let currentItem;
      for (let j = 0; j < PRODUCT_LIST.length; j++) {
        if (PRODUCT_LIST[j].id === cartItems[i].id) {
          currentItem = PRODUCT_LIST[j];
          break;
        }
      }

      const q = parseInt(cartItems[i].querySelector('span').textContent.split('x ')[1]);
      const itemTot = currentItem.price * q;
      const discount = q >= 10 ? (DISCOUNT_RATE[currentItem.id] ?? 0) : 0;

      itemCnt += q;
      subTotal += itemTot;

      totalAmt += itemTot * (1 - discount);
    })();
  }

  const discountRate = getDiscountRate(itemCnt, totalAmt, subTotal);

  document.getElementById('cart-total').textContent = '총액: ' + Math.round(totalAmt) + '원';
  if (discountRate > 0) {
    const span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = '(' + (discountRate * 100).toFixed(1) + '% 할인 적용)';
    document.getElementById('cart-total').appendChild(span);
  }
  updateStockStatus();
  updateBonusPointsDisplay(totalAmt);
};
