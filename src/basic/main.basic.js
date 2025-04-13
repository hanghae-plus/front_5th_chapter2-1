// TODO: 전역 변수 지양하기
let productList, selection, addBtn, cartContainer, sum, stock;
let lastSel,
  points = 0,
  totalAmt = 0,
  itemCount = 0;

function main() {
  productList = [
    { id: 'p1', name: '상품1', val: 10000, q: 50 },
    { id: 'p2', name: '상품2', val: 20000, q: 30 },
    { id: 'p3', name: '상품3', val: 30000, q: 20 },
    { id: 'p4', name: '상품4', val: 15000, q: 0 },
    { id: 'p5', name: '상품5', val: 25000, q: 10 },
  ];
  const app = document.getElementById('app');

  let appContainer = document.createElement('div');
  let wrapper = document.createElement('div');
  let cartTitle = document.createElement('h1');

  cartContainer = document.createElement('div');
  sum = document.createElement('div');
  selection = document.createElement('select');
  addBtn = document.createElement('button');
  stock = document.createElement('div');

  cartContainer.id = 'cart-items';
  sum.id = 'cart-total';
  selection.id = 'product-select';
  addBtn.id = 'add-to-cart';
  stock.id = 'stock-status';

  appContainer.className = 'bg-gray-100 p-8';
  wrapper.className =
    'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';
  cartTitle.className = 'text-2xl font-bold mb-4';
  sum.className = 'text-xl font-bold my-4';
  selection.className = 'border rounded p-2 mr-2';
  addBtn.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  stock.className = 'text-sm text-gray-500 mt-2';

  cartTitle.textContent = '장바구니';
  addBtn.textContent = '추가';

  updateSelections();

  wrapper.appendChild(cartTitle);
  wrapper.appendChild(cartContainer);
  wrapper.appendChild(sum);
  wrapper.appendChild(selection);
  wrapper.appendChild(addBtn);
  wrapper.appendChild(stock);
  appContainer.appendChild(wrapper);
  app.appendChild(appContainer);

  calculateCartItems();

  setTimeout(function () {
    setInterval(function () {
      let luckyItem = productList[Math.floor(Math.random() * productList.length)];
      if (Math.random() < 0.3 && luckyItem.q > 0) {
        luckyItem.val = Math.round(luckyItem.val * 0.8);
        alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
        updateSelections();
      }
    }, 30000);
  }, Math.random() * 10000);

  setTimeout(function () {
    setInterval(function () {
      if (lastSel) {
        let suggest = productList.find(function (item) {
          return item.id !== lastSel && item.q > 0; // 선택하지 않았지만 재고가 남아있는 물품
        });
        if (suggest) {
          alert(suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');
          suggest.val = Math.round(suggest.val * 0.95);
          updateSelections();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
}

// TODO: options 를 빼도 될런지
function updateSelections() {
  selection.innerHTML = '';
  productList.forEach(function (item) {
    let opt = document.createElement('option');
    opt.value = item.id;
    opt.textContent = item.name + ' - ' + item.val + '원';
    if (item.q === 0) opt.disabled = true;
    selection.appendChild(opt);
  });
}

function calculateCartItems() {
  totalAmt = 0;
  itemCount = 0;
  let cartItems = cartContainer.children;
  let subTot = 0;

  for (let i = 0; i < cartItems.length; i++) {
    (function () {
      let curItem;
      for (let j = 0; j < productList.length; j++) {
        if (productList[j].id === cartItems[i].id) {
          curItem = productList[j];
          break;
        }
      }
      let q = parseInt(cartItems[i].querySelector('span').textContent.split('x ')[1]);
      let itemTot = curItem.val * q;
      let disc = 0;
      itemCount += q;
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

  if (itemCount >= 30) {
    let bulkDisc = totalAmt * 0.25;
    let itemDisc = subTot - totalAmt;
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
    let span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = '(' + (discRate * 100).toFixed(1) + '% 할인 적용)';
    sum.appendChild(span);
  }

  updateStock();
  renderPoints();
}

const renderPoints = () => {
  points = Math.floor(totalAmt / 1000);
  let pointContainer = document.getElementById('loyalty-points');

  if (!pointContainer) {
    pointContainer = document.createElement('span');
    pointContainer.id = 'loyalty-points';
    pointContainer.className = 'text-blue-500 ml-2';
    sum.appendChild(pointContainer);
  }
  pointContainer.textContent = '(포인트: ' + points + ')';
};

const updateStock = () => {
  let infoMsg = '';
  productList.forEach(function (item) {
    if (item.q < 5) {
      infoMsg +=
        item.name + ': ' + (item.q > 0 ? '재고 부족 (' + item.q + '개 남음)' : '품절') + '\n';
    }
  });
  stock.textContent = infoMsg;
};

main();

addBtn.addEventListener('click', handleClickAddBtn);
cartContainer.addEventListener('click', handleClickCartEvent);

function handleClickAddBtn() {
  let selItem = selection.value;
  let itemToAdd = productList.find(function (p) {
    return p.id === selItem;
  });
  if (itemToAdd && itemToAdd.q > 0) {
    let item = document.getElementById(itemToAdd.id);
    if (item) {
      let newQty = parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;
      if (newQty <= itemToAdd.q) {
        item.querySelector('span').textContent =
          itemToAdd.name + ' - ' + itemToAdd.val + '원 x ' + newQty;
        itemToAdd.q--;
      } else {
        alert('재고가 부족합니다.');
      }
    } else {
      let newItem = document.createElement('div');
      newItem.id = itemToAdd.id;
      newItem.className = 'flex justify-between items-center mb-2';
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
      cartContainer.appendChild(newItem);
      itemToAdd.q--;
    }
    calculateCartItems();
    lastSel = selItem;
  }
}
function handleClickCartEvent(event) {
  let tgt = event.target;
  if (tgt.classList.contains('quantity-change') || tgt.classList.contains('remove-item')) {
    let prodId = tgt.dataset.productId;
    let itemElem = document.getElementById(prodId);
    let prod = productList.find(function (p) {
      return p.id === prodId;
    });
    if (tgt.classList.contains('quantity-change')) {
      let qtyChange = parseInt(tgt.dataset.change);
      let newQty = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]) + qtyChange;
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
        alert('재고가 부족합니다.');
      }
    } else if (tgt.classList.contains('remove-item')) {
      let remQty = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]);
      prod.q += remQty;
      itemElem.remove();
    }
    calculateCartItems();
  }
}
