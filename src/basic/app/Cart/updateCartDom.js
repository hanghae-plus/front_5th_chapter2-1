import { ElementIds } from "../constants.js";
import { findProduct, getProductList } from "../../store/prodList.js";

/** DATA */
const discountRateById = {
  p1: 0.1,
  p2: 0.15,
  p3: 0.2,
  p4: 0.05,
  p5: 0.25,
};

/** CALCULATIONS */
function getDisc(quantity, currentItemId) {
  if (quantity < 10) {
    return 0;
  }
  return discountRateById[currentItemId] || 0;
}

function getFinalAmounts(itemCnt, totalAmt, subTot) {
  let discRate = 0;
  if (itemCnt >= 30) {
    const bulkDisc = totalAmt * 0.25;
    const itemDisc = subTot - totalAmt;
    if (bulkDisc > itemDisc) {
      totalAmt = subTot * (1 - 0.25);
      discRate = 0.25;
    } else {
      discRate = (subTot - totalAmt) / subTot;
    }
  } else {
    discRate = (subTot - totalAmt) / subTot;
  }
  if (new Date().getDay() === 2) {
    totalAmt *= 1 - 0.1;
    discRate = Math.max(discRate, 0.1);
  }

  return {
    totalAmt,
    discRate,
  };
}

function getBonusPts(totalAmt) {
  return Math.floor(totalAmt / 1000);
}

function getProductQuantityMessage(prodList) {
  let infoMsg = "";

  prodList.forEach(function (item) {
    if (item.q < 5) {
      infoMsg +=
        item.name +
        ": " +
        (item.q > 0 ? "재고 부족 (" + item.q + "개 남음)" : "품절") +
        "\n";
    }
  });

  return infoMsg;
}

/** ACTIONS **/

function createPointTag() {
  const ptsTag = document.createElement("span");
  ptsTag.id = ElementIds.LOYALTY_POINTS;
  ptsTag.className = "text-blue-500 ml-2";
  return ptsTag;
}

function updateBonusPointDom(totalAmt) {
  const sum = document.getElementById(ElementIds.SUM);
  let ptsTag = document.getElementById(ElementIds.LOYALTY_POINTS);

  if (!ptsTag) {
    ptsTag = createPointTag();
    sum?.appendChild(ptsTag);
  }

  const bonusPts = getBonusPts(totalAmt);
  ptsTag.textContent = "(포인트: " + bonusPts + ")";
}

function updateStockInfoDom() {
  const stockInfo = document.getElementById(ElementIds.STOCK_INFO);
  const productList = getProductList();
  if (stockInfo) {
    stockInfo.textContent = getProductQuantityMessage(productList);
  }
}

function createDiscountRateMessage(discRate) {
  const span = document.createElement("span");
  span.className = "text-green-500 ml-2";
  span.textContent = "(" + (discRate * 100).toFixed(1) + "% 할인 적용)";
  return span;
}

export function getCartItemText(item) {
  return item.querySelector("span");
}

export function getValueFromCardItem(item, type = "quantity") {
  const itemText = getCartItemText(item);
  if (type === "quantity") {
    return parseInt(itemText.textContent.split("x ")[1]);
  }
  return itemText.textContent.split("x ")[0];
}


function getFinalAmount (){
  let totalAmt = 0;
  let subTot = 0;
  let itemCnt = 0;

  const cartDisp = document.getElementById(ElementIds.CART_DISP);
  const cartItems = cartDisp?.children;

  for (let i = 0; i < cartItems.length; i++) {
    let curItem = findProduct(cartItems[i].id);

    const quantity = getValueFromCardItem(cartItems[i]);
    const itemTot = curItem.val * quantity;
    itemCnt += quantity;
    subTot += itemTot;

    const disc = getDisc(quantity, curItem.id);
    totalAmt += itemTot * (1 - disc);
  }

  return getFinalAmounts(itemCnt, totalAmt, subTot);
}

function updateSumDom(totalAmt,discRate ){
  const sum = document.getElementById(ElementIds.SUM);

  if (!sum) {
    return;
  }

  sum.textContent = "총액: " + Math.round(totalAmt) + "원";
  if (discRate > 0) {
    const discountRateSpan = createDiscountRateMessage(discRate);
    sum?.appendChild(discountRateSpan);
  }
}

/**
 * 장바구니에서 확인한 총액과 할인율로 관련 DOM 업데이트
 */
export function updateCartDom() {
 // 장바구니 에 담긴 상품들을 확인해서 총액과 할인율을 계산
  const {totalAmt, discRate} = getFinalAmount()

  // 총액 & 할인율 DOM 업데이트
  updateSumDom(totalAmt, discRate);

  // 재고 정보 DOM 업데이트
  updateStockInfoDom();

  // 보너스 보인트 DOM 업데이트
  updateBonusPointDom(totalAmt);
}
