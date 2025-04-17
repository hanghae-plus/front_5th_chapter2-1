import { ElementIds } from '../../../shared/app/constants.ts';

import {
  getBonusPts,
  getDisc,
  getFinalAmounts,
  getProductQuantityMessage,
} from '../../../shared/app/Cart/calculation.js';
import { createPointTag } from './index';
import {
  findProduct,
  getProductList,
} from '../../../shared/store/productList.js';
import { CartItem, getCart } from '../../../shared/store/cart.js';

function updateBonusPointDom(totalAmt: number) {
  const $sum = document.getElementById(ElementIds.SUM) as HTMLElement;
  let $ptsTag: HTMLElement | null = document.getElementById(
    ElementIds.LOYALTY_POINTS,
  );

  if (!$ptsTag) {
    $ptsTag = createPointTag();
    $sum?.appendChild($ptsTag);
  }

  const bonusPts = getBonusPts(totalAmt);
  $ptsTag.textContent = '(포인트: ' + bonusPts + ')';
}

function updateStockInfoDom() {
  const $stockInfo = document.getElementById(ElementIds.STOCK_INFO);
  const productList = getProductList();
  if ($stockInfo) {
    $stockInfo.textContent = getProductQuantityMessage(productList);
  }
}

function createDiscountRateMessage(discRate: number) {
  const $span = document.createElement('span');
  $span.className = 'text-green-500 ml-2';
  $span.textContent = '(' + (discRate * 100).toFixed(1) + '% 할인 적용)';
  return $span;
}

function getFinalAmount() {
  let totalAmt = 0;
  let subTot = 0;
  let itemCnt = 0;
  const cart = getCart();

  cart.forEach((item: CartItem) => {
    const productList = getProductList();
    const product = findProduct(productList, item.productId);

    if (!product) {
      return;
    }

    const quantity = item.quantity;
    const itemTot = product.val * quantity;
    itemCnt += quantity;
    subTot += itemTot;

    const disc = getDisc(quantity, product.id);
    totalAmt += itemTot * (1 - disc);
  });

  return getFinalAmounts(itemCnt, totalAmt, subTot);
}

function updateSumDom(totalAmt: number, discRate: number) {
  const $sum = document.getElementById(ElementIds.SUM);

  if (!$sum) {
    return;
  }

  $sum.textContent = '총액: ' + Math.round(totalAmt) + '원';
  if (discRate > 0) {
    const $discountRateSpan = createDiscountRateMessage(discRate);
    $sum?.appendChild($discountRateSpan);
  }
}

/**
 * 장바구니에서 확인한 총액과 할인율로 관련 DOM 업데이트
 * - 장바구니 내용이 바뀔때마다 호출되어야 하는 특징이 있을 것으로 예상
 */
export function calculateCart() {
  // 장바구니 에 담긴 상품들을 확인해서 총액과 할인율을 계산
  const { totalAmt, discRate } = getFinalAmount();

  // 총액 & 할인율 DOM 업데이트
  updateSumDom(totalAmt, discRate);

  // 재고 정보 DOM 업데이트
  updateStockInfoDom();

  // 보너스 보인트 DOM 업데이트
  updateBonusPointDom(totalAmt);
}
