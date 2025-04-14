var lastSel,
  bonusPts = 0,
  totalAmt = 0,
  itemCnt = 0;

const prodList = [
  { id: 'p1', name: '상품1', price: 10000, quantity: 50 },
  { id: 'p2', name: '상품2', price: 20000, quantity: 30 },
  { id: 'p3', name: '상품3', price: 30000, quantity: 20 },
  { id: 'p4', name: '상품4', price: 15000, quantity: 0 },
  { id: 'p5', name: '상품5', price: 25000, quantity: 10 },
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

  const cartDisp = document.createElement('div');
  cartDisp.id = 'cart-items';

  const sum = document.createElement('div');
  sum.id = 'cart-total';
  sum.className = 'text-xl font-bold my-4';

  const sel = document.createElement('select');
  sel.id = 'product-select';
  sel.className = 'border rounded p-2 mr-2';

  const addBtn = document.createElement('button');
  addBtn.id = 'add-to-cart';
  addBtn.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  addBtn.textContent = '추가';

  const stockInfo = document.createElement('div');
  stockInfo.id = 'stock-status';
  stockInfo.className = 'text-sm text-gray-500 mt-2';

  wrap.appendChild(hTxt);
  wrap.appendChild(cartDisp);
  wrap.appendChild(sum);
  wrap.appendChild(sel);
  wrap.appendChild(addBtn);
  wrap.appendChild(stockInfo);

  cont.appendChild(wrap);

  root.appendChild(cont);

  updateSelectOptions();

  calcCart();
  setTimeout(function () {
    setInterval(function () {
      const luckyItem = prodList[Math.floor(Math.random() * prodList.length)];
      if (Math.random() < 0.3 && luckyItem.quantity > 0) {
        luckyItem.price = Math.round(luckyItem.price * 0.8);
        alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
        updateSelectOptions();
      }
    }, 30000);
  }, Math.random() * 10000);
  setTimeout(function () {
    setInterval(function () {
      if (lastSel) {
        const suggestionItem = prodList.find(function (item) {
          return item.id !== lastSel && item.quantity > 0;
        });
        if (suggestionItem) {
          alert(
            suggestionItem.name +
              '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!',
          );
          suggestionItem.price = Math.round(suggestionItem.price * 0.95);
          updateSelectOptions();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
}

// 변경된 상품 목록으로 select, option 초기화
function updateSelectOptions() {
  // select 요소 선택
  const productSelect = document.getElementById('product-select');

  // option 목록 초기화
  productSelect.innerHTML = '';

  // 상품 목록을 순회하며 option 요소 생성
  prodList.forEach((product) => {
    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = product.name + ' - ' + product.price + '원';

    // 재고가 없는 상품은 disabled 처리
    if (product.quantity === 0) {
      option.disabled = true;
    }

    productSelect.appendChild(option);
  });
}

function calcCart() {
  const cartDisp = document.getElementById('cart-items');
  const sum = document.getElementById('cart-total');
  totalAmt = 0;
  itemCnt = 0;
  var cartItems = cartDisp.children;
  var subTot = 0;
  for (var i = 0; i < cartItems.length; i++) {
    (function () {
      var curItem;
      for (var j = 0; j < prodList.length; j++) {
        if (prodList[j].id === cartItems[i].id) {
          curItem = prodList[j];
          break;
        }
      }
      var q = parseInt(
        cartItems[i].querySelector('span').textContent.split('x ')[1],
      );
      var itemTot = curItem.price * q;
      var disc = 0;
      itemCnt += q;
      subTot += itemTot;
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
  if (itemCnt >= 30) {
    var bulkDisc = totalAmt * 0.25;
    var itemDisc = subTot - totalAmt;
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
  sum.textContent = '총액: ' + Math.round(totalAmt) + '원';
  if (discRate > 0) {
    var span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = '(' + (discRate * 100).toFixed(1) + '% 할인 적용)';
    sum.appendChild(span);
  }
  updateStockInfo();
  renderBonusPts();
}

const renderBonusPts = () => {
  const sum = document.getElementById('cart-total');
  bonusPts = Math.floor(totalAmt / 1000);
  var ptsTag = document.getElementById('loyalty-points');
  if (!ptsTag) {
    ptsTag = document.createElement('span');
    ptsTag.id = 'loyalty-points';
    ptsTag.className = 'text-blue-500 ml-2';
    sum.appendChild(ptsTag);
  }
  ptsTag.textContent = '(포인트: ' + bonusPts + ')';
};

function updateStockInfo() {
  const stockInfo = document.getElementById('stock-status');
  var infoMsg = '';
  prodList.forEach(function (item) {
    if (item.quantity < 5) {
      infoMsg +=
        item.name +
        ': ' +
        (item.quantity > 0
          ? '재고 부족 (' + item.quantity + '개 남음)'
          : '품절') +
        '\n';
    }
  });
  stockInfo.textContent = infoMsg;
}

main();

const addBtn = document.getElementById('add-to-cart');
addBtn.addEventListener('click', function () {
  const productSelect = document.getElementById('product-select');
  const cartDisp = document.getElementById('cart-items');

  const selectedProductId = productSelect.value;
  const itemToAdd = prodList.find(
    (product) => product.id === selectedProductId,
  );

  if (itemToAdd && itemToAdd.quantity > 0) {
    const itemInCart = document.getElementById(itemToAdd.id);

    // 이미 장바구니에 있다면 수량 증가
    if (itemInCart) {
      const itemSpan = itemInCart.querySelector('span');
      const prevQuantityString = itemSpan.textContent.split('x ')[1];
      const newQuantity = parseInt(prevQuantityString) + 1;

      // 재고가 충분한지 확인 후 텍스트, 수량 업데이트
      if (newQuantity <= itemToAdd.quantity) {
        const newItemString = `${itemToAdd.name} - ${itemToAdd.price}원 x ${newQuantity}`;
        itemSpan.textContent = newItemString;
        itemToAdd.quantity--;
      } else {
        alert('재고가 부족합니다.');
      }
    } else {
      // 장바구니에 없다면 새로 추가
      const newItem = document.createElement('div');
      newItem.id = itemToAdd.id;
      newItem.className = 'flex justify-between items-center mb-2';

      const minusBtnString = `<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="-1">-</button>`;
      const plusBtnString = `<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="1">+</button>`;
      const removeBtnString = `<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${itemToAdd.id}">삭제</button>`;
      const itemInfoString = `<span>${itemToAdd.name} - ${itemToAdd.price}원 x 1</span>`;

      newItem.innerHTML = `${itemInfoString}<div>${minusBtnString}${plusBtnString}${removeBtnString}</div>`;
      cartDisp.appendChild(newItem);
      
      itemToAdd.quantity--;
    }
    calcCart();
    lastSel = selectedProductId;
  }
});

const cartDisp = document.getElementById('cart-items');
cartDisp.addEventListener('click', function (event) {
  var tgt = event.target;
  if (
    tgt.classList.contains('quantity-change') ||
    tgt.classList.contains('remove-item')
  ) {
    var prodId = tgt.dataset.productId;
    var itemElem = document.getElementById(prodId);
    var prod = prodList.find(function (p) {
      return p.id === prodId;
    });
    if (tgt.classList.contains('quantity-change')) {
      var qtyChange = parseInt(tgt.dataset.change);
      var newQty =
        parseInt(itemElem.querySelector('span').textContent.split('x ')[1]) +
        qtyChange;
      if (
        newQty > 0 &&
        newQty <=
          prod.quantity +
            parseInt(itemElem.querySelector('span').textContent.split('x ')[1])
      ) {
        itemElem.querySelector('span').textContent =
          itemElem.querySelector('span').textContent.split('x ')[0] +
          'x ' +
          newQty;
        prod.quantity -= qtyChange;
      } else if (newQty <= 0) {
        itemElem.remove();
        prod.quantity -= qtyChange;
      } else {
        alert('재고가 부족합니다.');
      }
    } else if (tgt.classList.contains('remove-item')) {
      var remQty = parseInt(
        itemElem.querySelector('span').textContent.split('x ')[1],
      );
      prod.quantity += remQty;
      itemElem.remove();
    }
    calcCart();
  }
});
