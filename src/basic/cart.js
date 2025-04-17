import { state, dom } from './store';
import { productList } from './mock/product-list';
import { renderBonusPts, updateStockInfo } from './components';

export function calcCart() {
  state.totalAmt = 0;
  dom.itemCnt = 0;
  const cartItems = dom.cartDisp.children;
  let subTot = 0;

  for (let i = 0; i < cartItems.length; i++) {
    let curItem = productList.find((p) => p.id === cartItems[i].id);
    if (!curItem) continue;

    const itemQuantity = parseInt(
      cartItems[i].querySelector('span').textContent.split('x ')[1]
    );

    let disc = 0;
    dom.itemCnt += itemQuantity;

    if (itemQuantity >= 10) {
      if (curItem.id === 'p1') disc = 0.1;
      else if (curItem.id === 'p2') disc = 0.15;
      else if (curItem.id === 'p3') disc = 0.2;
      else if (curItem.id === 'p4') disc = 0.05;
      else if (curItem.id === 'p5') disc = 0.25;
    }
    const itemTot = curItem.val * itemQuantity;
    subTot += itemTot;
    state.totalAmt += itemTot * (1 - disc);
  }

  let discRate = 0;
  if (dom.itemCnt >= 30) {
    const bulkDisc = state.totalAmt * 0.25;
    const itemDisc = subTot - state.totalAmt;
    if (bulkDisc > itemDisc) {
      state.totalAmt = subTot * (1 - 0.25);
      discRate = 0.25;
    } else {
      discRate = (subTot - state.totalAmt) / subTot;
    }
  } else {
    discRate = (subTot - state.totalAmt) / subTot;
  }

  // 화요일 10% 추가 할인
  if (new Date().getDay() === 2) {
    state.totalAmt *= 1 - 0.1;
    discRate = Math.max(discRate, 0.1);
  }

  // 👉 한 줄로 총액 + 할인 + 포인트 출력
  const bonusPts = Math.floor(state.totalAmt / 1000);

  dom.sum.innerHTML = `
총액: ${Math.round(state.totalAmt)}원${
    discRate > 0
      ? `<span class="text-green-500 ml-2">
        (${(discRate * 100).toFixed(1)}% 할인 적용)
      </span>`
      : `<span id="loyalty-points" class="text-blue-500 ml-2">(포인트: ${bonusPts})</span>`
  }
`;
  renderBonusPts();
  updateStockInfo();
}
