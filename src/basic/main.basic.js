let prodList, sel, addBtn, cartDisp, sum, stockInfo;
let lastSel = null;
let bonusPts = 0;
let totalAmt = 0;
let itemCnt = 0;

const main = () => {
  prodList = [
    { id: 'p1', name: '상품1', val: 10000, q: 50 },
    { id: 'p2', name: '상품2', val: 20000, q: 30 },
    { id: 'p3', name: '상품3', val: 30000, q: 20 },
    { id: 'p4', name: '상품4', val: 15000, q: 0 },
    { id: 'p5', name: '상품5', val: 25000, q: 10 },
  ];
  const root = document.getElementById('app');
  const cont = document.createElement('div');
  const wrap = document.createElement('div');
  const hTxt = document.createElement('h1');
  cartDisp = document.createElement('div');
  sum = document.createElement('div');
  sel = document.createElement('select');
  addBtn = document.createElement('button');
  stockInfo = document.createElement('div');
  cartDisp.id = 'cart-items';
  sum.id = 'cart-total';
  sel.id = 'product-select';
  addBtn.id = 'add-to-cart';
  stockInfo.id = 'stock-status';
  cont.className = 'bg-gray-100 p-8';
  wrap.className =
    'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';
  hTxt.className = 'text-2xl font-bold mb-4';
  sum.className = 'text-xl font-bold my-4';
  sel.className = 'border rounded p-2 mr-2';
  addBtn.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  stockInfo.className = 'text-sm text-gray-500 mt-2';
  hTxt.textContent = '장바구니';
  addBtn.textContent = '추가';
  updateSelOpts();
  wrap.appendChild(hTxt);
  wrap.appendChild(cartDisp);
  wrap.appendChild(sum);
  wrap.appendChild(sel);
  wrap.appendChild(addBtn);
  wrap.appendChild(stockInfo);
  cont.appendChild(wrap);
  root.appendChild(cont);
  calcCart();
  setTimeout(() => {
    setInterval(() => {
      const luckyItem = prodList[Math.floor(Math.random() * prodList.length)];
      if (Math.random() < 0.3 && luckyItem.q > 0) {
        luckyItem.val = Math.round(luckyItem.val * 0.8);
        alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);
        updateSelOpts();
      }
    }, 30000);
  }, Math.random() * 10000);
  setTimeout(() => {
    setInterval(() => {
      if (lastSel) {
        const suggest = prodList.find((item) => {
          return item.id !== lastSel && item.q > 0;
        });
        if (suggest) {
          alert(`${suggest.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
          suggest.val = Math.round(suggest.val * 0.95);
          updateSelOpts();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
};

const updateSelOpts = () => {
  sel.innerHTML = '';
  prodList.forEach(({ id, name, val, q }) => {
    const opt = document.createElement('option');
    opt.value = id;
    opt.textContent = `${name} - ${val}원`;
    if (q === 0) opt.disabled = true;
    sel.appendChild(opt);
  });
};

const calcCart = () => {
  totalAmt = 0;
  itemCnt = 0;
  const cartItems = cartDisp.children;
  let subTot = 0;
  for (let i = 0; i < cartItems.length; i++) {
    (() => {
      let curItem;
      for (let j = 0; j < prodList.length; j++) {
        if (prodList[j].id === cartItems[i].id) {
          curItem = prodList[j];
          break;
        }
      }
      const { id, val } = curItem;
      const q = parseInt(cartItems[i].querySelector('span').textContent.split('x ')[1]);
      const itemTot = val * q;
      let disc = 0;
      itemCnt += q;
      subTot += itemTot;
      if (q >= 10) {
        if (id === 'p1') disc = 0.1;
        else if (id === 'p2') disc = 0.15;
        else if (id === 'p3') disc = 0.2;
        else if (id === 'p4') disc = 0.05;
        else if (id === 'p5') disc = 0.25;
      }
      totalAmt += itemTot * (1 - disc);
    })();
  }
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
  sum.textContent = `총액: ${Math.round(totalAmt)}원`;
  if (discRate > 0) {
    const span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = `(${(discRate * 100).toFixed(1)}% 할인 적용)`;
    sum.appendChild(span);
  }
  updateStockInfo();
  renderBonusPts();
};

const renderBonusPts = () => {
  bonusPts = Math.floor(totalAmt / 1000);
  let ptsTag = document.getElementById('loyalty-points');
  if (!ptsTag) {
    ptsTag = document.createElement('span');
    ptsTag.id = 'loyalty-points';
    ptsTag.className = 'text-blue-500 ml-2';
    sum.appendChild(ptsTag);
  }
  ptsTag.textContent = `(포인트: ${bonusPts})`;
};

const updateStockInfo = () => {
  let infoMsg = '';
  prodList.forEach(({ name, q }) => {
    if (q < 5) {
      infoMsg += `${name}: ${q > 0 ? `재고 부족 (${q}개 남음)` : '품절'}\n`;
    }
  });
  stockInfo.textContent = infoMsg;
};

main();

addBtn.addEventListener('click', () => {
  const selItem = sel.value;
  const itemToAdd = prodList.find(({ id }) => id === selItem);
  if (itemToAdd && itemToAdd.q > 0) {
    const { id, name, val, q } = itemToAdd;
    const item = document.getElementById(id);
    if (item) {
      const newQty = parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;
      if (newQty <= q) {
        item.querySelector('span').textContent = `${name} - ${val}원 x ${newQty}`;
        itemToAdd.q--;
      } else {
        alert('재고가 부족합니다.');
      }
    } else {
      const newItem = document.createElement('div');
      newItem.id = id;
      newItem.className = 'flex justify-between items-center mb-2';
      newItem.innerHTML = `
        <span>${name} - ${val}원 x 1</span>
        <div>
          <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${id}" data-change="-1">-</button>
          <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${id}" data-change="1">+</button>
          <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${id}">삭제</button>
        </div>`;
      cartDisp.appendChild(newItem);
      itemToAdd.q--;
    }
    calcCart();
    lastSel = selItem;
  }
});

cartDisp.addEventListener('click', (event) => {
  const tgt = event.target;
  if (tgt.classList.contains('quantity-change') || tgt.classList.contains('remove-item')) {
    const prodId = tgt.dataset.productId;
    const itemElem = document.getElementById(prodId);
    const prod = prodList.find((p) => p.id === prodId);
    if (tgt.classList.contains('quantity-change')) {
      const qtyChange = parseInt(tgt.dataset.change);
      const newQty =
        parseInt(itemElem.querySelector('span').textContent.split('x ')[1]) + qtyChange;
      if (
        newQty > 0 &&
        newQty <= prod.q + parseInt(itemElem.querySelector('span').textContent.split('x ')[1])
      ) {
        itemElem.querySelector('span').textContent =
          `${itemElem.querySelector('span').textContent.split('x ')[0]}x ${newQty}`;
        prod.q -= qtyChange;
      } else if (newQty <= 0) {
        itemElem.remove();
        prod.q -= qtyChange;
      } else {
        alert('재고가 부족합니다.');
      }
    } else if (tgt.classList.contains('remove-item')) {
      const remQty = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]);
      prod.q += remQty;
      itemElem.remove();
    }
    calcCart();
  }
});
