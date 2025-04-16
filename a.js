import { productList } from './mock/product-list';
import { luckySaleAlert, recommendOtherProduct } from './utils';

let lastSel;

const state = {
  selectedProductId: null,
  bonusPts: 0,
  totalAmt: 0,
  itemCnt: 0,
};

const dom = {
  sel: null,
  addBtn: null,
  cartDisp: null,
  sum: null,
  stockInfo: null,
};

function main() {
  //html과 연결
  const root = document.getElementById('app');
  root.innerHTML = `
  <div class="bg-gray-100 p-8">
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
      <h1 class="text-2xl font-bold mb-4">장바구니</h1>
    </div>
  </div>
`;
  const cont = root.firstElementChild;
  const wrap = cont.firstElementChild;
  dom.cartDisp = wrap.firstElementChild;
  dom.sum = document.getElementById('cart-total');
  //carDsip
  dom.cartDisp = document.createElement('div');
  dom.cartDisp.id = 'cart-items';
  wrap.appendChild(dom.cartDisp);

  dom.sel = document.createElement('select');

  //sum
  dom.sum = document.createElement('div');
  dom.sum.id = 'cart-total';
  dom.sum.className = 'text-xl font-bold my-4';
  wrap.appendChild(dom.sum);

  //sell
  dom.sel.id = 'product-select';
  dom.sel.className = 'border rounded p-2 mr-2';
  wrap.appendChild(dom.sel);

  //stockInfo
  dom.stockInfo = document.createElement('div');
  dom.stockInfo.id = 'stock-status';
  dom.stockInfo.className = 'text-sm text-gray-500 mt-2';
  wrap.appendChild(dom.stockInfo);

  //addButton
  dom.addBtn = document.createElement('button');
  dom.addBtn.id = 'add-to-cart';
  dom.addBtn.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  dom.addBtn.textContent = '추가';
  wrap.appendChild(dom.addBtn);

  //함수
  calcCart();
  updateSelOpts();
  luckySaleAlert(productList, updateSelOpts);
  recommendOtherProduct(productList, lastSel, updateSelOpts);
}

function updateSelOpts() {
  dom.sel.innerHTML = '';
  productList.forEach((item) => {
    var opt = document.createElement('option');
    opt.value = item.id;
    opt.textContent = item.name + ' - ' + item.val + '원';
    if (item.stock === 0) opt.disabled = true;
    dom.sel.appendChild(opt);
  });
}

function calcCart() {
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

const renderBonusPts = () => {
  dom.bonusPts = Math.floor(state.totalAmt / 1000);
  dom.sum.innerHTML += `
    <span id="loyalty-points" class="text-blue-500 ml-2">(포인트: ${dom.bonusPts})</span>
  `;
};

function updateStockInfo() {
  //재고 문구 분기처리
  const lowStockItems = productList
    .filter((stockItem) => stockItem.stock < 5)
    .map((item) => {
      return `<li>${item.name}: ${item.stock > 0 ? `재고 부족 (${item.stock}개 남음)` : '품절'}</li>`;
    });
  //innerHTM?L
  dom.stockInfo.innerHTML = `<ul class="text-sm list-disc pl-4">${lowStockItems.join('')}</ul>`;
}

main();

dom.addBtn.addEventListener('click', function () {
  const selItem = dom.sel.value;
  const itemToAdd = productList.find((product) => product.id === selItem);

  if (itemToAdd && itemToAdd.stock > 0) {
    var item = document.getElementById(itemToAdd.id);
    if (item) {
      var newQty =
        parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;
      if (newQty <= itemToAdd.stock) {
        item.querySelector('span').textContent =
          itemToAdd.name + ' - ' + itemToAdd.val + '원 x ' + newQty;
        itemToAdd.stock--;
      } else {
        alert('재고가 부족합니다.');
      }
    } else {
      const newItem = document.createElement('div');
      newItem.id = itemToAdd.id;
      newItem.className = 'flex justify-between items-center mb-2';
      newItem.innerHTML = `
      <span>${itemToAdd.name} - ${itemToAdd.val}원 x 1</span>
      <div>
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="-1">-</button>
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="+1">+</button>
        <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${itemToAdd.id}">삭제</button>
      </div>
      `;

      // '<span>' +
      //   itemToAdd.name +
      //   ' - ' +
      //   itemToAdd.val +
      //   '원 x 1</span><div>' +
      // '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
      //   itemToAdd.id +
      //   '" data-change="-1">-</button>' +
      //   '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
      //   itemToAdd.id +
      //   '" data-change="1">+</button>' +
      //   '<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' +
      //   itemToAdd.id +
      //   '">삭제</button></div>';

      itemToAdd.stock--;
      return newItem;
    }
    calcCart();
    lastSel = selItem;
  }
});

dom.cartDisp.addEventListener('click', function (event) {
  let tgt = event.target;
  const isQtyChange = tgt.classList.contains('quantity-change');
  const isRemove = tgt.classList.contains('remove-item');
  if (!isQtyChange && !isRemove) return;

  let prodId = tgt.dataset.productId;
  let itemElem = document.getElementById(prodId);
  let prod = productList.find((product) => product.id === prodId);
  const span = itemElem.querySelector('span');
  const currentQty = parseInt(span.textContent.split('x')[1]);

  if (isQtyChange) {
    var qtyChange = parseInt(tgt.dataset.change);
    var newQty = currentQty + qtyChange;

    const availalbeQuantity = newQty > 0 && newQty <= prod.stock + currentQty;

    if (newQty > prod.stock + currentQty) {
      alert('재고가 부족합니다.');
      return;
    }

    if (availalbeQuantity) {
      span.textContent = span.textContent.split('x ')[0] + 'x ' + newQty;
      prod.stock -= qtyChange;
    } else if (newQty <= 0) {
      itemElem.remove();
      prod.stock -= qtyChange;
    }
  } else if (isRemove) {
    var remQty = parseInt(span.textContent.split('x ')[1]);
    prod.stock += remQty;
    itemElem.remove();
  }
  calcCart();
});
