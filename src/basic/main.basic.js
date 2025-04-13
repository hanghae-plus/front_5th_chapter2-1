let products, productSelectBox, addProductToCartButton, cartList, cartTotalPrice, stockStatus;
let lastSel = null;
let bonusPts = 0;
let totalAmt = 0;
let itemCnt = 0;

const main = () => {
  products = [
    { id: 'p1', name: '상품1', val: 10000, q: 50 },
    { id: 'p2', name: '상품2', val: 20000, q: 30 },
    { id: 'p3', name: '상품3', val: 30000, q: 20 },
    { id: 'p4', name: '상품4', val: 15000, q: 0 },
    { id: 'p5', name: '상품5', val: 25000, q: 10 },
  ];

  const background = document.createElement('div');
  const main = document.getElementById('app');
  const content = document.createElement('div');
  const title = document.createElement('h1');

  cartList = document.createElement('div');
  cartTotalPrice = document.createElement('div');
  productSelectBox = document.createElement('select');
  addProductToCartButton = document.createElement('button');
  stockStatus = document.createElement('div');

  cartList.id = 'cart-items';
  cartTotalPrice.id = 'cart-total';
  productSelectBox.id = 'product-select';
  addProductToCartButton.id = 'add-to-cart';
  stockStatus.id = 'stock-status';

  background.className = 'bg-gray-100 p-8';
  content.className =
    'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';
  title.className = 'text-2xl font-bold mb-4';
  cartTotalPrice.className = 'text-xl font-bold my-4';
  productSelectBox.className = 'border rounded p-2 mr-2';
  addProductToCartButton.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  stockStatus.className = 'text-sm text-gray-500 mt-2';

  title.textContent = '장바구니';
  addProductToCartButton.textContent = '추가';

  updateSelOpts();

  content.appendChild(title);
  content.appendChild(cartList);
  content.appendChild(cartTotalPrice);
  content.appendChild(productSelectBox);
  content.appendChild(addProductToCartButton);
  content.appendChild(stockStatus);
  background.appendChild(content);
  main.appendChild(background);

  calcCart();

  setTimeout(() => {
    setInterval(() => {
      const luckyItem = products[Math.floor(Math.random() * products.length)];

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
        const suggest = products.find((item) => item.id !== lastSel && item.q > 0);

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
  productSelectBox.innerHTML = '';
  products.forEach(({ id, name, val, q }) => {
    const opt = document.createElement('option');

    opt.value = id;
    opt.textContent = `${name} - ${val}원`;

    if (q === 0) {
      opt.disabled = true;
    }

    productSelectBox.appendChild(opt);
  });
};

const calcCart = () => {
  totalAmt = 0;
  itemCnt = 0;

  const cartItems = cartList.children;
  let subTot = 0;

  for (let i = 0; i < cartItems.length; i++) {
    (() => {
      let curItem;

      for (let j = 0; j < products.length; j++) {
        if (products[j].id === cartItems[i].id) {
          curItem = products[j];
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

  cartTotalPrice.textContent = `총액: ${Math.round(totalAmt)}원`;

  if (discRate > 0) {
    const span = document.createElement('span');

    span.className = 'text-green-500 ml-2';
    span.textContent = `(${(discRate * 100).toFixed(1)}% 할인 적용)`;
    cartTotalPrice.appendChild(span);
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
    cartTotalPrice.appendChild(ptsTag);
  }

  ptsTag.textContent = `(포인트: ${bonusPts})`;
};

const updateStockInfo = () => {
  let infoMsg = '';

  products.forEach(({ name, q }) => {
    if (q < 5) {
      infoMsg += `${name}: ${q > 0 ? `재고 부족 (${q}개 남음)` : '품절'}\n`;
    }
  });

  stockStatus.textContent = infoMsg;
};

main();

addProductToCartButton.addEventListener('click', () => {
  const selItem = productSelectBox.value;
  const itemToAdd = products.find(({ id }) => id === selItem);

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
      cartList.appendChild(newItem);
      itemToAdd.q--;
    }

    calcCart();
    lastSel = selItem;
  }
});

cartList.addEventListener('click', (event) => {
  const tgt = event.target;

  if (tgt.classList.contains('quantity-change') || tgt.classList.contains('remove-item')) {
    const prodId = tgt.dataset.productId;
    const itemElem = document.getElementById(prodId);
    const prod = products.find((p) => p.id === prodId);

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
