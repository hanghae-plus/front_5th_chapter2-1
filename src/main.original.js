let lastSel,
  bonusPts = 0,
  totalAmt = 0,
  itemCnt = 0;

const products = [
  { id: 'p1', name: '상품1', val: 10000, q: 50 },
  { id: 'p2', name: '상품2', val: 20000, q: 30 },
  { id: 'p3', name: '상품3', val: 30000, q: 20 },
  { id: 'p4', name: '상품4', val: 15000, q: 0 },
  { id: 'p5', name: '상품5', val: 25000, q: 10 },
];

const CartContainer = () => {
  const div = document.createElement('div');
  div.className = 'bg-gray-100 p-8';
  return div;
};

const CartWrapper = () => {
  const div = document.createElement('div');
  div.className = 'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';

  div.appendChild(CartTitle());
  div.appendChild(CartItems());
  div.appendChild(CartTotal());
  div.appendChild(CartProductSelect());
  div.appendChild(CartItemAddButton());
  div.appendChild(CartStockInfo());

  return div;
};

const CartTitle = () => {
  const h1 = document.createElement('h1');
  h1.className = 'text-2xl font-bold mb-4';
  h1.textContent = '장바구니';

  return h1;
};

const CartItems = () => {
  const div = document.createElement('div');
  div.id = 'cart-items';

  return div;
};

const CartTotal = () => {
  const div = document.createElement('div');
  div.id = 'cart-total';
  div.className = 'text-xl font-bold my-4';

  return div;
};

const CartProductSelect = () => {
  const select = document.createElement('select');
  select.id = 'product-select';
  select.className = 'border rounded p-2 mr-2';

  return select;
};

const CartItemAddButton = () => {
  const button = document.createElement('button');
  button.id = 'add-to-cart';
  button.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  button.textContent = '추가';

  return button;
};

const CartStockInfo = () => {
  const div = document.createElement('div');
  div.id = 'stock-status';
  div.className = 'text-sm text-gray-500 mt-2';

  return div;
};

function main() {
  const root = document.getElementById('app');
  const container = CartContainer();
  const wrapper = CartWrapper();

  container.appendChild(wrapper);
  root.appendChild(container);

  updateSelOpts();
  calcCart();

  setTimeout(function () {
    setInterval(function () {
      const luckyItem = products[Math.floor(Math.random() * products.length)];
      if (Math.random() < 0.3 && luckyItem.q > 0) {
        luckyItem.val = Math.round(luckyItem.val * 0.8);
        alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
        updateSelOpts();
      }
    }, 30000);
  }, Math.random() * 10000);

  setTimeout(function () {
    setInterval(function () {
      if (lastSel) {
        const suggest = products.find(function (item) {
          return item.id !== lastSel && item.q > 0;
        });
        if (suggest) {
          alert(suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');
          suggest.val = Math.round(suggest.val * 0.95);
          updateSelOpts();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
}

function updateSelOpts() {
  document.getElementById('product-select').innerHTML = '';

  products.forEach(function (item) {
    const opt = document.createElement('option');
    opt.value = item.id;
    opt.textContent = item.name + ' - ' + item.val + '원';
    if (item.q === 0) opt.disabled = true;
    document.getElementById('product-select').appendChild(opt);
  });
}

function calcCart() {
  totalAmt = 0;
  itemCnt = 0;

  const $cartItems = document.getElementById('cart-items');
  const cartItems = $cartItems.children;
  let subTot = 0;

  for (let i = 0; i < cartItems.length; i++) {
    (function () {
      let curItem;

      for (let j = 0; j < products.length; j++) {
        if (products[j].id === cartItems[i].id) {
          curItem = products[j];
          break;
        }
      }

      const q = parseInt(cartItems[i].querySelector('span').textContent.split('x ')[1]);
      const itemTot = curItem.val * q;
      let disc = 0;

      itemCnt += q;
      subTot += itemTot;

      if (q >= 10) {
        if (curItem.id === 'p1') {
          disc = 0.1;
        } else if (curItem.id === 'p2') {
          disc = 0.15;
        } else if (curItem.id === 'p3') {
          disc = 0.2;
        } else if (curItem.id === 'p4') {
          disc = 0.05;
        } else if (curItem.id === 'p5') {
          disc = 0.25;
        }
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

  const $sum = document.getElementById('cart-total');
  $sum.textContent = '총액: ' + Math.round(totalAmt) + '원';

  if (discRate > 0) {
    const span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = '(' + (discRate * 100).toFixed(1) + '% 할인 적용)';
    $sum.appendChild(span);
  }

  updateStockInfo();
  renderBonusPts($sum);
}

const renderBonusPts = (sum) => {
  bonusPts = Math.floor(totalAmt / 1000);
  let ptsTag = document.getElementById('loyalty-points');

  if (!ptsTag) {
    ptsTag = document.createElement('span');
    ptsTag.id = 'loyalty-points';
    ptsTag.className = 'text-blue-500 ml-2';
    sum.appendChild(ptsTag);
  }
  ptsTag.textContent = '(포인트: ' + bonusPts + ')';
};

function updateStockInfo() {
  let infoMsg = '';
  const $cartStrockInfo = document.getElementById('stock-status');

  products.forEach(function (item) {
    if (item.q < 5) {
      infoMsg +=
        item.name + ': ' + (item.q > 0 ? '재고 부족 (' + item.q + '개 남음)' : '품절') + '\n';
    }
  });

  $cartStrockInfo.textContent = infoMsg;
}

main();

document.getElementById('add-to-cart').addEventListener('click', function () {
  const $cartProductSelect = document.getElementById('product-select');

  const selItem = $cartProductSelect.value;
  const itemToAdd = products.find(function (p) {
    return p.id === selItem;
  });

  if (itemToAdd && itemToAdd.q > 0) {
    const item = document.getElementById(itemToAdd.id);
    if (item) {
      const newQty = parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;
      if (newQty <= itemToAdd.q) {
        item.querySelector('span').textContent =
          itemToAdd.name + ' - ' + itemToAdd.val + '원 x ' + newQty;
        itemToAdd.q--;
      } else {
        alert('재고가 부족합니다.');
      }
    } else {
      const newItem = document.createElement('div');
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
      document.getElementById('cart-items').appendChild(newItem);
      itemToAdd.q--;
    }

    calcCart();
    lastSel = selItem;
  }
});

document.getElementById('cart-items').addEventListener('click', function (event) {
  const tgt = event.target;

  if (tgt.classList.contains('quantity-change') || tgt.classList.contains('remove-item')) {
    const prodId = tgt.dataset.productId;
    const itemElem = document.getElementById(prodId);
    const prod = products.find(function (p) {
      return p.id === prodId;
    });

    if (tgt.classList.contains('quantity-change')) {
      const qtyChange = parseInt(tgt.dataset.change);
      const newQty =
        parseInt(itemElem.querySelector('span').textContent.split('x ')[1]) + qtyChange;
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
      const remQty = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]);
      prod.q += remQty;
      itemElem.remove();
    }

    calcCart();
  }
});
