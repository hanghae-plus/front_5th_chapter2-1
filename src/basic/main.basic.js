import { DISCOUNT_RATE, LUCK_THRESHOLD, prodList } from './constants';
import {
  createElement,
  extractCartProductInfo,
  getProductStockStatusString,
  startRandomlyInMs,
} from './utils';

const store = {
  lastSelectedId: null,
  bonusPts: 0,
  totalAmt: 0,
  itemCnt: 0,
};

function main() {
  // DOM 레이아웃 생성
  initLayout();
  // DB의 product list를 기반으로 select, option 초기화
  updateSelectOptions();
  // 장바구니 초기화
  calcCart();

  // 럭키드로우 및 제안 기능을 주기적으로 실행
  startRandomlyInMs(10_000)(() => setInterval(startLuckyDraw, 30_000));
  startRandomlyInMs(20_000)(() => setInterval(startSuggestion, 60_000));
}

const initLayout = () => {
  const root = document.getElementById('app');

  const cont = createElement('div', { className: 'bg-gray-100 p-8' });
  const wrap = createElement('div', {
    className:
      'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8',
  });

  const header = createElement('h1', {
    className: 'text-2xl font-bold mb-4',
    textContent: '장바구니',
  });

  const cartDisp = createElement('div', { id: 'cart-items' });

  const totalLabel = createElement('div', {
    id: 'cart-total',
    className: 'text-xl font-bold my-4',
  });

  const productSelect = createElement('select', {
    id: 'product-select',
    className: 'border rounded p-2 mr-2',
  });

  const addBtn = createElement('button', {
    id: 'add-to-cart',
    className: 'bg-blue-500 text-white px-4 py-2 rounded',
    textContent: '추가',
  });

  const stockInfo = createElement('div', {
    id: 'stock-status',
    className: 'text-sm text-gray-500 mt-2 whitespace-pre-wrap',
  });

  wrap.appendChild(header);
  wrap.appendChild(cartDisp);
  wrap.appendChild(totalLabel);
  wrap.appendChild(productSelect);
  wrap.appendChild(addBtn);
  wrap.appendChild(stockInfo);

  cont.appendChild(wrap);

  root.appendChild(cont);
};

const startLuckyDraw = () => {
  const randomIndex = Math.floor(Math.random() * prodList.length);
  const luckyItem = prodList[randomIndex];

  const isLucky = Math.random() < LUCK_THRESHOLD;
  const hasStock = luckyItem.quantity > 0;

  // 당첨됐고 재고가 있는 경우
  if (isLucky && hasStock) {
    alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);
    // 해당 상품의 가격 할인, DB에 적용
    luckyItem.price = Math.round(luckyItem.price * (1 - DISCOUNT_RATE.lucky));
    // select, option 업데이트
    updateSelectOptions();
  }
};

const startSuggestion = () => {
  if (store.lastSelectedId) {
    const suggestion = prodList.find(
      (product) => product.id !== store.lastSelectedId && product.quantity > 0,
    );

    if (!suggestion) return;
    alert(
      `${suggestion.name}은(는) 어떠세요? 지금 구매하시면 ${DISCOUNT_RATE.suggestion * 100}% 추가 할인!`,
    );

    suggestion.price = Math.round(
      suggestion.price * (1 - DISCOUNT_RATE.suggestion),
    );
    updateSelectOptions();
  }
};

// 변경된 상품 목록으로 select, option 초기화
function updateSelectOptions() {
  // select 요소 선택
  const productSelect = document.getElementById('product-select');

  // option 목록 초기화
  productSelect.innerHTML = '';

  // 상품 목록을 순회하며 option 요소 생성
  prodList.forEach((product) => {
    const option = createElement('option', {
      value: product.id,
      textContent: `${product.name} - ${product.price}원`,
      // 재고가 없는 상품은 disabled 처리
      disabled: product.quantity === 0,
    });

    productSelect.appendChild(option);
  });
}

function calcCart() {
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
  renderBonusPts();
}

// 포인트 표시 업데이트. 없으면 새로 추가
const renderBonusPts = () => {
  const totalLabel = document.getElementById('cart-total');
  store.bonusPts = Math.floor(store.totalAmt / 1000);
  let loyaltyPointTag = document.getElementById('loyalty-points');
  if (!loyaltyPointTag) {
    loyaltyPointTag = createElement('span', {
      className: 'text-blue-500 ml-2',
      textContent: `(포인트: ${store.bonusPts})`,
    });
    totalLabel.appendChild(loyaltyPointTag);
  }
  loyaltyPointTag.textContent = `(포인트: ${store.bonusPts})`;
};

// 재고 상태 업데이트 (5개 미만인 상품에 대한 경고 메시지 표시)
function updateStockInfo() {
  const stockInfo = document.getElementById('stock-status');

  const infoMsg = prodList
    // 재고가 5개 미만인 상품만 필터링
    .filter((p) => p.quantity < 5)
    // 각 재고별 상태 문자열로 변환
    .map(getProductStockStatusString)
    // 줄바꿈 문자로 연결
    .join('\n');

  stockInfo.textContent = infoMsg;
}

main();

const addBtn = document.getElementById('add-to-cart');
addBtn.addEventListener('click', function () {
  const productSelect = document.getElementById('product-select');
  const cartDisp = document.getElementById('cart-items');

  const selectedProductId = productSelect.value;
  const itemToAdd = prodList.find((p) => p.id === selectedProductId);

  if (!itemToAdd || itemToAdd.quantity <= 0) return;

  const itemInCart = document.getElementById(itemToAdd.id);

  // 이미 장바구니에 있다면 수량 증가
  if (itemInCart) {
    const itemStrElem = itemInCart.querySelector('span');
    const { quantity: prevQuantity } = extractCartProductInfo(itemStrElem);
    const newQuantity = prevQuantity + 1;

    // 재고가 충분한지 확인 후 텍스트, 수량 업데이트
    if (newQuantity <= itemToAdd.quantity) {
      const newItemString = `${itemToAdd.name} - ${itemToAdd.price}원 x ${newQuantity}`;
      itemStrElem.textContent = newItemString;
      itemToAdd.quantity--;
    } else {
      alert('재고가 부족합니다.');
    }
  } else {
    // 장바구니에 없다면 새로 추가
    const newItem = createElement('div', {
      id: itemToAdd.id,
      className: 'flex justify-between items-center mb-2',
    });

    const minusBtnString = `<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="-1">-</button>`;
    const plusBtnString = `<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="1">+</button>`;
    const removeBtnString = `<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${itemToAdd.id}">삭제</button>`;
    const itemInfoString = `<span>${itemToAdd.name} - ${itemToAdd.price}원 x 1</span>`;

    newItem.innerHTML = `${itemInfoString}<div>${minusBtnString}${plusBtnString}${removeBtnString}</div>`;
    cartDisp.appendChild(newItem);

    itemToAdd.quantity--;
  }
  calcCart();
  store.lastSelectedId = selectedProductId;
});

const cartDisp = document.getElementById('cart-items');
cartDisp.addEventListener('click', function (event) {
  const tgt = event.target;
  const isQuantityButtonClicked = tgt.classList.contains('quantity-change');
  const isRemoveButtonClicked = tgt.classList.contains('remove-item');

  if (!isQuantityButtonClicked && !isRemoveButtonClicked) return;

  const prodId = tgt.dataset.productId;
  const itemElem = document.getElementById(prodId);
  const prod = prodList.find((product) => product.id === prodId);

  const itemStrElem = itemElem.querySelector('span');
  const { name, quantity } = extractCartProductInfo(itemStrElem);

  if (isQuantityButtonClicked) {
    const qtyChange = parseInt(tgt.dataset.change);
    const newQty = quantity + qtyChange;
    if (newQty > 0 && newQty <= prod.quantity + quantity) {
      itemStrElem.textContent = `${name} x ${newQty}`;
      prod.quantity -= qtyChange;
    } else if (newQty <= 0) {
      itemElem.remove();
      prod.quantity -= qtyChange;
    } else {
      alert('재고가 부족합니다.');
    }
  } else if (isRemoveButtonClicked) {
    prod.quantity += quantity;
    itemElem.remove();
  }
  calcCart();
});
