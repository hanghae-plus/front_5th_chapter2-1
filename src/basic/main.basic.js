const products = [
  { id: 'p1', name: '상품1', price: 10000, quantity: 50 },
  { id: 'p2', name: '상품2', price: 20000, quantity: 30 },
  { id: 'p3', name: '상품3', price: 30000, quantity: 20 },
  { id: 'p4', name: '상품4', price: 15000, quantity: 0 },
  { id: 'p5', name: '상품5', price: 25000, quantity: 10 },
];

let select, addButton, cartList, cartTotal, stockStauts;
let lastSel,
  LoyaltyPoints = 0,
  totalAmount = 0,
  itemCount = 0;

main();
setupEventListeners();

function main() {
  const root = document.getElementById('app');

  const container = document.createElement('div');
  container.className = 'bg-gray-100 p-8';

  const wrapper = document.createElement('div');
  wrapper.className =
    'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';

  const hTxt = document.createElement('h1');
  hTxt.className = 'text-2xl font-bold mb-4';
  hTxt.textContent = '장바구니';

  cartList = document.createElement('div');
  cartList.id = 'cart-items';

  cartTotal = document.createElement('div');
  cartTotal.id = 'cart-total';
  cartTotal.className = 'text-xl font-bold my-4';

  select = document.createElement('select');
  select.className = 'border rounded p-2 mr-2';
  select.id = 'product-select';

  addButton = document.createElement('button');
  addButton.id = 'add-to-cart';
  addButton.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  addButton.textContent = '추가';

  stockStauts = document.createElement('div');
  stockStauts.id = 'stock-status';
  stockStauts.className = 'text-sm text-gray-500 mt-2';

  updateSelOpts();

  wrapper.appendChild(hTxt);
  wrapper.appendChild(cartList);
  wrapper.appendChild(cartTotal);
  wrapper.appendChild(select);
  wrapper.appendChild(addButton);
  wrapper.appendChild(stockStauts);
  container.appendChild(wrapper);
  root.appendChild(container);

  calcCart();

  setTimeout(function () {
    setInterval(function () {
      const luckyItem = products[Math.floor(Math.random() * products.length)];
      if (Math.random() < 0.3 && luckyItem.quantity > 0) {
        luckyItem.price = Math.round(luckyItem.price * 0.8);
        alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
        updateSelOpts();
      }
    }, 30000);
  }, Math.random() * 10000);
  setTimeout(function () {
    setInterval(function () {
      if (lastSel) {
        const suggest = products.find(function (item) {
          return item.id !== lastSel && item.quantity > 0;
        });
        if (suggest) {
          alert(
            suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!'
          );
          suggest.price = Math.round(suggest.price * 0.95);
          updateSelOpts();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
}

function updateSelOpts() {
  select.innerHTML = '';
  products.forEach(function (item) {
    const opt = document.createElement('option');
    opt.value = item.id;
    opt.textContent = item.name + ' - ' + item.price + '원';
    if (item.quantity === 0) opt.disabled = true;
    select.appendChild(opt);
  });
}

function calcCart() {
  totalAmount = 0;
  itemCount = 0;
  const cartItems = cartList.children;
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
      const quantity = parseInt(
        cartItems[i].querySelector('span').textContent.split('x ')[1]
      );
      const itemTot = curItem.price * quantity;
      let disc = 0;
      itemCount += quantity;
      subTot += itemTot;
      if (quantity >= 10) {
        if (curItem.id === 'p1') disc = 0.1;
        else if (curItem.id === 'p2') disc = 0.15;
        else if (curItem.id === 'p3') disc = 0.2;
        else if (curItem.id === 'p4') disc = 0.05;
        else if (curItem.id === 'p5') disc = 0.25;
      }
      totalAmount += itemTot * (1 - disc);
    })();
  }
  let discRate = 0;
  if (itemCount >= 30) {
    const bulkDisc = totalAmount * 0.25;
    const itemDisc = subTot - totalAmount;
    if (bulkDisc > itemDisc) {
      totalAmount = subTot * (1 - 0.25);
      discRate = 0.25;
    } else {
      discRate = (subTot - totalAmount) / subTot;
    }
  } else {
    discRate = (subTot - totalAmount) / subTot;
  }
  if (new Date().getDay() === 2) {
    totalAmount *= 1 - 0.1;
    discRate = Math.max(discRate, 0.1);
  }
  cartTotal.textContent = '총액: ' + Math.round(totalAmount) + '원';
  if (discRate > 0) {
    const span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = '(' + (discRate * 100).toFixed(1) + '% 할인 적용)';
    cartTotal.appendChild(span);
  }
  updateStockStatus();
  renderLoyaltyPoints();
}

function renderLoyaltyPoints() {
  LoyaltyPoints = Math.floor(totalAmount / 1000);
  let ptsTag = document.getElementById('loyalty-points');
  if (!ptsTag) {
    ptsTag = document.createElement('span');
    ptsTag.id = 'loyalty-points';
    ptsTag.className = 'text-blue-500 ml-2';
    cartTotal.appendChild(ptsTag);
  }
  ptsTag.textContent = '(포인트: ' + LoyaltyPoints + ')';
}

function updateStockStatus() {
  let statusMessage = '';
  products.forEach(function (item) {
    if (item.quantity < 5) {
      statusMessage +=
        item.quantity > 0
          ? `${item.name}: 재고 부족 (${item.quantity}개 남음)\n`
          : `${item.name}: 품절\n`;
    }
  });
  stockStauts.textContent = statusMessage;
}

function setupEventListeners() {
  addButton.addEventListener('click', function () {
    const selItem = select.value;
    const itemToAdd = products.find(function (p) {
      return p.id === selItem;
    });
    if (itemToAdd && itemToAdd.quantity > 0) {
      const item = document.getElementById(itemToAdd.id);
      if (item) {
        const newQty =
          parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;
        if (newQty <= itemToAdd.quantity) {
          item.querySelector('span').textContent =
            itemToAdd.name + ' - ' + itemToAdd.price + '원 x ' + newQty;
          itemToAdd.quantity--;
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
          itemToAdd.price +
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
        cartList.appendChild(newItem);
        itemToAdd.quantity--;
      }
      calcCart();
      lastSel = selItem;
    }
  });

  cartList.addEventListener('click', function (event) {
    const tgt = event.target;
    if (
      tgt.classList.contains('quantity-change') ||
      tgt.classList.contains('remove-item')
    ) {
      const prodId = tgt.dataset.productId;
      const itemElem = document.getElementById(prodId);
      const prod = products.find(function (p) {
        return p.id === prodId;
      });
      if (tgt.classList.contains('quantity-change')) {
        const qtyChange = parseInt(tgt.dataset.change);
        const newQty =
          parseInt(itemElem.querySelector('span').textContent.split('x ')[1]) +
          qtyChange;
        if (
          newQty > 0 &&
          newQty <=
            prod.quantity +
              parseInt(
                itemElem.querySelector('span').textContent.split('x ')[1]
              )
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
        const remQty = parseInt(
          itemElem.querySelector('span').textContent.split('x ')[1]
        );
        prod.quantity += remQty;
        itemElem.remove();
      }
      calcCart();
    }
  });
}
