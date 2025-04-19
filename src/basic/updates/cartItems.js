import { DISCOUNT_RATE, prodList } from '../lib/constants';
import { store } from '../lib/store';
import { createElement, extractCartProductInfo } from '../lib/utils';
import { updateBonusPoints } from './bonusPoints';
import { updateStockInfo } from './stockInfo';

export function updateCartItems() {
  const cartDisp = document.getElementById('cart-items');
  const totalLabel = document.getElementById('cart-total');
  store.totalAmt = 0;
  store.itemCnt = 0;
  const cartItems = cartDisp.children;
  let totalAmountWithoutDiscount = 0;

  // 장바구니 아이템 순회
  for (let i = 0; i < cartItems.length; i++) {
    // 장바구니 아이템의 id로 상품 목록에서 해당 상품 찾기
    const cartItem = cartItems[i];
    const curItem = prodList.find((product) => product.id === cartItem.id);

    // 장바구니 아이템 수량
    const itemStrElem = cartItem.querySelector('span');
    const { quantity } = extractCartProductInfo(itemStrElem);

    // 장바구니 아이템의 총 금액
    const itemTotalPrice = curItem.price * quantity;

    // 장바구니 아이템의 할인율. 10개 이상 구매시 할인율 적용
    const itemDiscountRate = quantity >= 10 ? curItem.discountRate : 0;

    store.itemCnt += quantity;
    store.totalAmt += itemTotalPrice * (1 - itemDiscountRate);

    totalAmountWithoutDiscount += itemTotalPrice;
  }

  let discRate = 0;

  // 30개 이상 구매시 할인
  const bulkDiscountedAmount = store.totalAmt * DISCOUNT_RATE.bulk;
  const itemDiscountedAmount = totalAmountWithoutDiscount - store.totalAmt;

  if (store.itemCnt >= 30 && bulkDiscountedAmount > itemDiscountedAmount) {
    store.totalAmt = totalAmountWithoutDiscount * (1 - DISCOUNT_RATE.bulk);
    discRate = DISCOUNT_RATE.bulk;
  } else {
    discRate = itemDiscountedAmount / totalAmountWithoutDiscount;
  }

  // 화요일 할인
  if (new Date().getDay() === 2) {
    store.totalAmt *= 1 - DISCOUNT_RATE.tuesday;
    discRate = Math.max(discRate, DISCOUNT_RATE.tuesday);
  }
  totalLabel.textContent = `총액: ${Math.round(store.totalAmt)}원`;
  if (discRate > 0) {
    const span = createElement('span', {
      className: 'text-red-500 ml-2',
      textContent: `(${(discRate * 100).toFixed(1)}% 할인 적용)`,
    });
    totalLabel.appendChild(span);
  }

  updateStockInfo();
  updateBonusPoints();
}
