/**
 * todo
 * - 초기 createElement된 요소들은 template으로 관리
 * - 만들 수 있는 부분은 component로 만들기
 *
 * - 필요한 상태값
 *  - 최근 담긴 상품 : latestItem
 *  - 특가 적용된 상품
 *  - 특가 적용된 새로운 option 상태
 *  - 장바구니 목록
 *  - 총 가격
 *  - 총 할인률
 */

let sel, addBtn, stockInfo;
let lastSel,
  bonusPts = 0,
  totalAmt = 0,
  itemCnt = 0;

/** 상품 목록 */
const PRODUCTS = [
  { id: 'p1', name: '상품1', val: 10000, q: 50 },
  { id: 'p2', name: '상품2', val: 20000, q: 30 },
  { id: 'p3', name: '상품3', val: 30000, q: 20 },
  { id: 'p4', name: '상품4', val: 15000, q: 0 },
  { id: 'p5', name: '상품5', val: 25000, q: 10 },
];

function main() {
  const root = document.getElementById('app');

  const cont = document.createElement('div');
  cont.className = 'bg-gray-100 p-8';

  const wrap = document.createElement('div');
  wrap.className =
    'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';

  const hTxt = document.createElement('h1');
  hTxt.className = 'text-2xl font-bold mb-4';
  hTxt.textContent = '장바구니';

  /** 장바구니 목록 ui */
  const cartDisp = document.createElement('div');
  cartDisp.id = 'cart-items';

  /** 장바구니에 담은 상품 총 가격 ui */
  const sum = document.createElement('div');
  sum.id = 'cart-total';
  sum.className = 'text-xl font-bold my-4';

  /** select-box ui */
  const sel = document.createElement('select');
  sel.id = 'product-select';
  sel.className = 'border rounded p-2 mr-2';

  /** 장바구니 추가 버튼 */
  const addBtn = document.createElement('button');
  addBtn.id = 'add-to-cart';
  addBtn.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  addBtn.textContent = '추가';

  /** 재고 현황 ui */
  const stockInfo = document.createElement('div');
  stockInfo.id = 'stock-status';
  stockInfo.className = 'text-sm text-gray-500 mt-2';

  updateSelOpts();

  // ui
  wrap.appendChild(hTxt);
  wrap.appendChild(cartDisp);
  wrap.appendChild(sum);
  wrap.appendChild(sel);
  wrap.appendChild(addBtn);
  wrap.appendChild(stockInfo);
  cont.appendChild(wrap);
  root.appendChild(cont);

  calcCart();

  // 광고 alert
  setTimeout(function () {
    setInterval(function () {
      // 랜덤으로 특가 상품 alert 실행
      const luckyItem = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
      if (Math.random() < 0.3 && luckyItem.q > 0) {
        luckyItem.val = Math.round(luckyItem.val * 0.8);
        alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');

        // 특가 적용된 select-option으로 변경
        updateSelOpts();
      }
    }, 30000);
  }, Math.random() * 10000);

  setTimeout(function () {
    setInterval(function () {
      // 마지막으로 구매한 상품 cta alert 실행
      if (lastSel) {
        const suggest = PRODUCTS.find(function (item) {
          return item.id !== lastSel && item.q > 0;
        });

        if (suggest) {
          alert(suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');

          // alert 띄운 상품의 select-option에 가격(=val) 수정
          suggest.val = Math.round(suggest.val * 0.95);
          updateSelOpts();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
}

/** option태그 업데이트 함수 */
function updateSelOpts() {
  sel.innerHTML = '';
  PRODUCTS.forEach(function (item) {
    const opt = document.createElement('option');
    opt.value = item.id;
    opt.textContent = item.name + ' - ' + item.val + '원';
    if (item.q === 0) opt.disabled = true;
    sel.appendChild(opt);
  });
}

/** 장바구니에 담긴 총 가격 계산 함수 */
function calcCart() {
  totalAmt = 0;
  itemCnt = 0;
  const cartItems = cartDisp.children;
  const subTot = 0;
  for (let i = 0; i < cartItems.length; i++) {
    (function () {
      let curItem;
      for (let j = 0; j < PRODUCTS.length; j++) {
        if (PRODUCTS[j].id === cartItems[i].id) {
          curItem = PRODUCTS[j];
          break;
        }
      }
      const q = parseInt(cartItems[i].querySelector('span').textContent.split('x ')[1]);
      const itemTot = curItem.val * q;
      const disc = 0;
      itemCnt += q;
      subTot += itemTot;

      // 상품별 10개이상일 경우 할인률 조건문
      if (q >= 10) {
        if (curItem.id === 'p1') disc = 0.1;
        else if (curItem.id === 'p2') disc = 0.15;
        else if (curItem.id === 'p3') disc = 0.2;
        else if (curItem.id === 'p4') disc = 0.05;
        else if (curItem.id === 'p5') disc = 0.25;
      }
      totalAmt += itemTot * (1 - disc);
    })();
  }
  let discRate = 0;

  // todo : early return으로 수정
  // 장바구니 추가 30개 이상일 경우 적용할인가
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

  // todo troubleshooting : 화요일일때 에러 발생
  // 화요일 할인 적용함수
  if (new Date().getDay() === 2) {
    totalAmt *= 1 - 0.1;
    discRate = Math.max(discRate, 0.1);
  }
  // 총 할인가 적용된 금액 출력
  sum.textContent = '총액: ' + Math.round(totalAmt) + '원';

  // 할인가 ui
  if (discRate > 0) {
    const span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = '(' + (discRate * 100).toFixed(1) + '% 할인 적용)';

    sum.appendChild(span);
  }

  updateStockInfo();
  renderBonusPts();
}

/** 보너스 포인트 함수 */
const renderBonusPts = () => {
  bonusPts = Math.floor(totalAmt / 1000);
  const ptsTag = document.getElementById('loyalty-points');
  if (!ptsTag) {
    ptsTag = document.createElement('span');
    ptsTag.id = 'loyalty-points';
    ptsTag.className = 'text-blue-500 ml-2';
    sum.appendChild(ptsTag);
  }
  ptsTag.textContent = '(포인트: ' + bonusPts + ')';
};

/** 재고 업데이트 함수 */
function updateStockInfo() {
  let infoMsg = '';
  PRODUCTS.forEach(function (item) {
    if (item.q < 5) {
      infoMsg +=
        item.name + ': ' + (item.q > 0 ? '재고 부족 (' + item.q + '개 남음)' : '품절') + '\n';
    }
  });
  stockInfo.textContent = infoMsg;
}

main();

// 장바구니 추가 버튼 클릭 이벤트
addBtn.addEventListener('click', function () {
  // 선택된 옵션
  const selItem = sel.value;
  const itemToAdd = PRODUCTS.find(function (p) {
    return p.id === selItem;
  });

  // todo : 장바구니에 추가되어있는 경우와 중복 로직
  if (itemToAdd && itemToAdd.q > 0) {
    const item = document.getElementById(itemToAdd.id);

    if (item) {
      const newQty = parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;
      // 가격 * 업데이트된 수량
      if (newQty <= itemToAdd.q) {
        item.querySelector('span').textContent =
          itemToAdd.name + ' - ' + itemToAdd.val + '원 x ' + newQty;
        itemToAdd.q--;
      } else {
        // todo : 재고 계산해서 부족할 경우 alert로 출력하는 함수 만들기
        alert('재고가 부족합니다.');
      }
    } else {
      // 새로운 장바구니 항목 추가
      const newItem = document.createElement('div');
      newItem.id = itemToAdd.id;
      newItem.className = 'flex justify-between items-center mb-2';

      // cartItem - ui
      newItem.innerHTML =
        '<span>' +
        itemToAdd.name +
        ' - ' +
        itemToAdd.val +
        '원 x 1</span><div>' +
        '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
        itemToAdd.id +
        '" data-change="-1">-</button>' +
        '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
        itemToAdd.id +
        '" data-change="1">+</button>' +
        '<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' +
        itemToAdd.id +
        '">삭제</button></div>';
      cartDisp.appendChild(newItem);
      itemToAdd.q--;
    }

    // 총 가격 계산
    calcCart();
    // 마지막 담은 상품 업데이트
    lastSel = selItem;
  }
});

// 장바구니 수량 변경 및 삭제 클릭 이벤트
cartDisp.addEventListener('click', function (event) {
  const tgt = event.target;

  // className에 quantity-change이 포함된 경우
  if (tgt.classList.contains('quantity-change') || tgt.classList.contains('remove-item')) {
    // 장바구니 내역 삭제
    const prodId = tgt.dataset.productId;
    const itemElem = document.getElementById(prodId);

    const prod = PRODUCTS.find(function (p) {
      return p.id === prodId;
    });

    // 장바구니에 담긴 quantity값을 가져옴
    if (tgt.classList.contains('quantity-change')) {
      console.log(tgt.dataset.change);
      const qtyChange = parseInt(tgt.dataset.change);
      const newQty =
        parseInt(itemElem.querySelector('span').textContent.split('x ')[1]) + qtyChange;

      // 재고 눌린 버튼에 따라 quantity 수량 변경
      if (
        newQty > 0 &&
        newQty <= prod.q + parseInt(itemElem.querySelector('span').textContent.split('x ')[1])
      ) {
        itemElem.querySelector('span').textContent =
          itemElem.querySelector('span').textContent.split('x ')[0] + 'x ' + newQty;
        prod.q -= qtyChange;
      } else if (newQty <= 0) {
        itemElem.remove();
        prod.q -= qtyChange;
      } else {
        // 재고가 부족하면 alert 실행
        alert('재고가 부족합니다.');
      }
    } else if (tgt.classList.contains('remove-item')) {
      // remove-item이면 삭제
      const remQty = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]);
      prod.q += remQty;
      itemElem.remove();
    }
    calcCart();
  }
});
