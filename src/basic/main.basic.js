import { CONSTANTS } from './\bconstants/constant.js';
import ERROR_MESSAGES from './\bconstants/errorMessages.js';
import buildLayout from './ utils/buildLayout.js';
import createEl from './ utils/createEl.js';
import { attachEventListener } from './eventManager.js';
import { state, elements } from './state.js';

function createUI() {
  //element 생성
  const root = document.getElementById('app');
  elements.cartDisp = createEl('div', { id: 'cart-items', className: '' });
  elements.sum = createEl('div', { id: 'cart-total', className: 'text-xl font-bold my-4' });
  elements.sel = createEl('select', { id: 'product-select', className: 'border rounded p-2 mr-2' });
  elements.addBtn = createEl('button', { id: 'add-to-cart', className: 'bg-blue-500 text-white px-4 py-2 rounded', text: '추가' });
  elements.stockInfo = createEl('div', { id: 'stock-status', className: 'text-sm text-gray-500 mt-2' });

  //Layout 생성
  const layout = buildLayout();
  root.appendChild(layout);
}

//초기값 세팅
function initializeState() {
  state.productList = [
    { id: 'p1', name: '상품1', val: 10000, q: 50 },
    { id: 'p2', name: '상품2', val: 20000, q: 30 },
    { id: 'p3', name: '상품3', val: 30000, q: 20 },
    { id: 'p4', name: '상품4', val: 15000, q: 0 },
    { id: 'p5', name: '상품5', val: 25000, q: 10 },
  ];
}

//할인 정보
function setUpSale() {
  setupFlashSale();
  setupSuggestions();
}

function setupFlashSale() {
  const delay = Math.random() * CONSTANTS.FLASH_SALE.MAX_DELAY;

  setTimeout(() => {
    setInterval(() => {
      try {
        runFlashSale();
      } catch (error) {
        console.error(ERROR_MESSAGES.SALE_SYSTEM.FLASH_SALE_ERROR, error);
      }
    }, CONSTANTS.FLASH_SALE.INTERVAL);
  }, delay);
}

function runFlashSale() {
  if (!state.productList || state.productList.length === 0) {
    console.warn(ERROR_MESSAGES.SALE_SYSTEM.NO_PRODUCTS);
    return;
  }
  const luckyItem = state.productList[Math.floor(Math.random() * state.productList.length)];
  if (Math.random() < CONSTANTS.FLASH_SALE.CHANCE && luckyItem.q > 0) {
    luckyItem.val = Math.round(luckyItem.val * CONSTANTS.SUGGESTION.DISCOUNT_RATE);
    alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
    updateSelOpts();
  }
}

function setupSuggestions() {
  const delay = Math.random() * CONSTANTS.SUGGESTION.MAX_DELAY;

  setTimeout(() => {
    setInterval(() => {
      try {
        runSuggestion();
      } catch (error) {
        console.error('추천 상품 실행 중 오류 발생:', error);
      }
    }, CONSTANTS.SUGGESTION.INTERVAL);
  }, delay);
}

function runSuggestion() {
  if (!state.lastSel || !state.productList || state.productList.length === 0) {
    console.warn(ERROR_MESSAGES.SALE_SYSTEM.NO_PRODUCTS);
    return;
  }

  const suggest = state.productList.find((item) => item.id !== state.lastSel && item.q > 0);
  if (suggest) {
    alert(`${suggest.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
    suggest.val = Math.round(suggest.val * CONSTANTS.SUGGESTION.DISCOUNT_RATE);
    updateSelOpts();
  }
}

function updateSelOpts() {
  elements.sel.innerHTML = '';
  state.productList.forEach(function (item) {
    const opt = createEl('option', { id: 'add-to-cart', value: item.id, text: item.name + ' - ' + item.val + '원' });
    if (item.q === 0) opt.disabled = true;
    elements.sel.appendChild(opt);
  });
}
function calcCart() {
  state.totalAmt = 0;
  state.itemCnt = 0;
  const cartItems = elements.cartDisp.children;
  let subTotal = 0;

  //장바구니에 담겨있는 요소 확인후 갯수와 값 계산
  for (let i = 0; i < cartItems.length; i++) {
    const itemEl = cartItems[i];
    const product = findProductById(itemEl.id); //  [{ id: 'p1', name: '상품1', val: 10000, q: 50 }, ...]
    const quantity = parseInt(itemEl.querySelector('span').textContent.split('x ')[1]);// <span>상품1 - 10000원 x 3</span>

    const { itemTotal, discountedTotal, quantity: q } = calculateItemTotal(product, quantity);

    state.itemCnt += q;
    subTotal += itemTotal;
    state.totalAmt += discountedTotal;
  }


  //일반 할인 처리
  let bulkResult = applyBulkDiscount(subTotal, state.totalAmt);
  let finalAmount = bulkResult.finalAmount;
  let discountRate = bulkResult.discountRate;
  
  //화요일 할인 처리
  let tuesdayResult = applyTuesdayDiscount(finalAmount, discountRate);
  finalAmount = tuesdayResult.finalAmount;
  discountRate = tuesdayResult.discountRate;

  //할인값 
  state.totalAmt = finalAmount;
  elements.sum.textContent = '총액: ' + Math.round(state.totalAmt) + '원';

  if (discountRate > 0) {
    const span = createEl('span', { className: 'text-green-500 ml-2', text: `(${(discountRate * 100).toFixed(1)}% 할인 적용)` });
    elements.sum.appendChild(span);
  }

  updateStockInfo();
  renderBonusPts();
}

function findProductById(id) {
  return state.productList.find((product) => product.id === id);
}

function calculateItemTotal(item, quantity) {
  let discount = 0;
  if (quantity >= 10) {
    discount = CONSTANTS.DISCOUNT_TABLE[item.id] || 0;
  }
  return {
    itemTotal: item.val * quantity,
    discountedTotal: item.val * quantity * (1 - discount),
    quantity,
  };
}

//일반 할인 계산
function applyBulkDiscount(subTotal, totalAmount) {
  if (state.itemCnt < CONSTANTS.CART.BULK_DISCOUNT_ITEM_COUNT) return { finalAmount: totalAmount, discountRate: (subTotal - totalAmount) / subTotal };

  const bulkDiscountAmt = subTotal * CONSTANTS.CART.BULK_DISCOUNT_RATE;
  const itemDiscountAmt = subTotal - totalAmount;

  if (bulkDiscountAmt > itemDiscountAmt) {
    return { finalAmount: subTotal * 0.75, discountRate: CONSTANTS.CART.BULK_DISCOUNT_RATE };
  }
  return { finalAmount: totalAmount, discountRate: itemDiscountAmt / subTotal };
}



//화요일 할인 계산
function applyTuesdayDiscount(totalAmount, currentDiscountRate) {
  const isTuesday = new Date().getDay() === 2;
  if (!isTuesday) return { finalAmount: totalAmount, discountRate: currentDiscountRate };

  return {
    finalAmount: totalAmount * 0.9,
    discountRate: Math.max(currentDiscountRate, 0.1),
  };
}

//보너스 포인트 계산후 렌더링
const renderBonusPts = () => {
  state.bonusPts = Math.floor(state.totalAmt / 1000);
  let ptsTag = document.getElementById('loyalty-points');
  if (!ptsTag) {
    ptsTag = createEl('span', { id: 'loyalty-points', className: 'text-green-500 ml-2' });
    elements.sum.appendChild(ptsTag);
  }
  ptsTag.textContent = '(포인트: ' + state.bonusPts + ')';
};

//계산후 재고 업데이트 및 관리
function updateStockInfo() {
  let infoMsg = '';
  state.productList.forEach(function (item) {
    if (item.q < 5) {
      infoMsg += item.name + ': ' + (item.q > 0 ? '재고 부족 (' + item.q + '개 남음)' : '품절') + '\n';
    }
  });
  elements.stockInfo.textContent = infoMsg;
}
function main() {
  initializeState();
  createUI();
  updateSelOpts();
  calcCart();
  setUpSale();
  attachEventListener(calcCart);
}

main();
