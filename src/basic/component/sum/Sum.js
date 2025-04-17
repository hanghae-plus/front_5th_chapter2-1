import { updatePoint } from './Sum.viewmodel.js';
import { getCartTotal, getTotalDiscountRate } from './Sum.Model.js';

let $sum;

const TOTAL_TEXT = (total) => `총액: ${Math.round(total)}원`;
const POINT_TEXT = (pts) => `(포인트: ${pts})`;
const DISCOUNT_TEXT = (rate) => `(${(rate * 100).toFixed(1)}% 할인 적용)`;

function createSumElement() {
  $sum = document.createElement('div');
  $sum.id = 'cart-total';
  $sum.className = 'text-xl font-bold my-4';
  return $sum;
}

/**
 * 총 금액(total) 표기
 */
function createSumText() {
  const total = getCartTotal();
  $sum.textContent = TOTAL_TEXT(total);
}

/**
 * 포인트 표기
 */
export function createPointText() {
  let bonusPts = updatePoint();
  let $point = document.getElementById('loyalty-points');

  if (!$point) {
    $point = document.createElement('span');
    $point.id = 'loyalty-points';
    $point.className = 'text-blue-500 ml-2';
    $sum.appendChild($point);
  }
  $point.textContent = POINT_TEXT(bonusPts);
}

/**
 * 총 할인율(discountRate) 표기
 */
function createDiscountText() {
  const rate = getTotalDiscountRate();
  if (rate > 0) {
    let $span = document.createElement('span');
    $span.className = 'text-green-500 ml-2';
    $span.textContent = DISCOUNT_TEXT(rate);
    $sum.appendChild($span);
  }
}

export { createSumElement, createSumText, createDiscountText };
