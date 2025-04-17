import { getCartDisplayElement } from '../cartDisplay/CartDisplay.js';
import ProductModel from '../sel/Sel.Model.js';
import {
  setTotal,
  setOriginTotal,
  setItemCnt,
  setDiscountRate,
  setBonusPts,
  getCartTotal,
  getOriginTotal,
  getItemCnt,
} from './Sum.Model.js';

const MIN_DISCOUNT_QUANTITY = 10;

const BULK_DISCOUNT_ITEM_COUNT = 30;
const BULK_DISCOUNT_RATE = 0.25;

const TUESDAY_DISCOUNT_RATE = 0.1;
const TUESDAY = 2;

/**
 *
 * @param prodList  판매 상품 목록
 * @param $cartItems 사용자가 담은 상품 정보들
 * @returns {{originTotal: number, total: number, itemCnt: number}}  {기본금액, 할인된금액, 구매한 상품 개수}
 */
export function getTotalSum(prodList, $cartItems) {
  let total = 0;
  let itemCnt = 0;
  let originTotal = 0;

  for (let i = 0; i < $cartItems.length; i++) {
    (function () {
      let curItem = findItem(prodList, $cartItems[i].id);
      let curItemCount = findItemCount($cartItems[i]);
      let curItemTotal = curItem.price * curItemCount;

      itemCnt += curItemCount;
      originTotal += curItemTotal;

      let discountRate = getDiscountRate(curItemCount, curItem);
      total += curItemTotal * (1 - discountRate);
    })();
  }

  setTotal(total);
  setOriginTotal(originTotal);
  setItemCnt(itemCnt);
}

/**
 *
 * @param prodList 판매 상품 목록
 * @param cartItemId 사용자가 담은 상품 번호
 * @returns {*}  사용자가 담은 상품
 */
function findItem(prodList, cartItemId) {
  let item;
  for (let i = 0; i < prodList.length; i++) {
    if (prodList[i].id === cartItemId) {
      item = prodList[i];
      break;
    }
  }
  return item;
}

/**
 *
 * @param cartItem 사용자가 담은 상품 정보
 * @returns {number} 상품의 구매 개수
 */
function findItemCount($cartItem) {
  return parseInt($cartItem.querySelector('span').textContent.split('x ')[1]);
}

/**
 *
 * @param curItemCount  사용자가 담은 상품 개수
 * @param curItem 사용자가 담은 상품
 * @returns {number} 구매상품에 대한 할인율
 */
function getDiscountRate(curItemCount, curItem) {
  if (curItemCount < MIN_DISCOUNT_QUANTITY) return 0;

  return ProductModel.DISCOUNT_RATES[curItem.id] || 0;
}

/**
 * 사용자의 장바구니 목록의 상태 정보 갱신
 */
export function updateCartStatus() {
  // 사용자가 담은 items
  let $cartItems = getCartDisplayElement().children;
  if ($cartItems.length === 0) {
    setTotal(0);
    setItemCnt(0);
    setOriginTotal(0);
  } else {
    getTotalSum(ProductModel.getList(), $cartItems);
  }
}

/**
 * 적용된 할인율 개산
 */
export function updateTotalDiscountRate() {
  let total = getCartTotal();
  let originTotal = getOriginTotal();
  let itemCnt = getItemCnt();
  let discountRate = 0;

  if (itemCnt >= BULK_DISCOUNT_ITEM_COUNT) {
    let bulkDiscountPrice = total * BULK_DISCOUNT_RATE; // 추가 할인시 가격
    let itemDiscountPrice = originTotal - total; // 기존 할인 가격
    // 추가 할인 가격이 클 경우에만 0.25 할인율 적용
    if (bulkDiscountPrice > itemDiscountPrice) {
      total = originTotal * (1 - BULK_DISCOUNT_RATE);
      discountRate = BULK_DISCOUNT_RATE;
    } else {
      discountRate = (originTotal - total) / originTotal;
    }
  } else {
    discountRate = (originTotal - total) / originTotal;
  }

  // 요일 할인 적용
  if (new Date().getDay() === TUESDAY) {
    total *= 1 - TUESDAY_DISCOUNT_RATE;
    discountRate = Math.max(discountRate, TUESDAY_DISCOUNT_RATE);
  }

  setTotal(total);
  setDiscountRate(discountRate);
}

export function updatePoint() {
  const total = getCartTotal();
  const pts = Math.floor(total / 1000);
  setBonusPts(pts);
  return pts;
}
