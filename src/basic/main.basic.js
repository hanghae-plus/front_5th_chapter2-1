var products, productSelect, addToCartBtn, cartContainer, totalDisplay, stockDisplay;
var lastSelectedProduct,
  bonusPoints = 0,
  totalAmount = 0,
  totalItemCount = 0;

function main() {
  products = [
    { id: 'p1', name: '상품1', price: 10000, stock: 50 },
    { id: 'p2', name: '상품2', price: 20000, stock: 30 },
    { id: 'p3', name: '상품3', price: 30000, stock: 20 },
    { id: 'p4', name: '상품4', price: 15000, stock: 0 },
    { id: 'p5', name: '상품5', price: 25000, stock: 10 },
  ];

  var root = document.getElementById('app');
  let cont = document.createElement('div');
  var wrap = document.createElement('div');
  let hTxt = document.createElement('h1');
  cartContainer = document.createElement('div');
  totalDisplay = document.createElement('div');
  productSelect = document.createElement('select');
  addToCartBtn = document.createElement('button');
  stockDisplay = document.createElement('div');

  cartContainer.id = 'cart-items';
  totalDisplay.id = 'cart-total';
  productSelect.id = 'product-select';
  addToCartBtn.id = 'add-to-cart';
  stockDisplay.id = 'stock-status';
  cont.className = 'bg-gray-100 p-8';
  wrap.className =
    'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';
  hTxt.className = 'text-2xl font-bold mb-4';
  totalDisplay.className = 'text-xl font-bold my-4';
  productSelect.className = 'border rounded p-2 mr-2';
  addToCartBtn.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  stockDisplay.className = 'text-sm text-gray-500 mt-2';

  hTxt.textContent = '장바구니';
  addToCartBtn.textContent = '추가';

  updateSelOpts();

  wrap.appendChild(hTxt);
  wrap.appendChild(cartContainer);
  wrap.appendChild(totalDisplay);
  wrap.appendChild(productSelect);
  wrap.appendChild(addToCartBtn);
  wrap.appendChild(stockDisplay);
  cont.appendChild(wrap);
  root.appendChild(cont);

  calcCart();

  setTimeout(function () {
    setInterval(function () {
      var luckyItem = products[Math.floor(Math.random() * products.length)];
      if (Math.random() < 0.3 && luckyItem.stock > 0) {
        luckyItem.price = Math.round(luckyItem.price * 0.8);
        alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
        updateSelOpts();
      }
    }, 30000);
  }, Math.random() * 10000);

  setTimeout(function () {
    setInterval(function () {
      if (lastSelectedProduct) {
        var suggest = products.find(function (item) {
          return item.id !== lastSelectedProduct && item.stock > 0;
        });

        if (suggest) {
          alert(suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');
          suggest.price = Math.round(suggest.price * 0.95);
          updateSelOpts();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
}

function updateSelOpts() {
  productSelect.innerHTML = '';
  products.forEach(function (item) {
    var opt = document.createElement('option');

    opt.value = item.id;
    opt.textContent = item.name + ' - ' + item.price + '원';

    if (item.stock === 0) opt.disabled = true;

    productSelect.appendChild(opt);
  });
}

function calcCart() {
  totalAmount = 0;
  totalItemCount = 0;
  var cartItems = cartContainer.children;
  var subTot = 0;

  for (var i = 0; i < cartItems.length; i++) {
    (function () {
      var curItem;

      for (var j = 0; j < products.length; j++) {
        if (products[j].id === cartItems[i].id) {
          curItem = products[j];
          break;
        }
      }

      var q = parseInt(cartItems[i].querySelector('span').textContent.split('x ')[1]);
      var itemTot = curItem.price * q;
      var disc = 0;
      totalItemCount += q;
      subTot += itemTot;

      if (q >= 10) {
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

  if (totalItemCount >= 30) {
    var bulkDisc = totalAmount * 0.25;
    var itemDisc = subTot - totalAmount;

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

  totalDisplay.textContent = '총액: ' + Math.round(totalAmount) + '원';

  if (discRate > 0) {
    var span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = '(' + (discRate * 100).toFixed(1) + '% 할인 적용)';
    totalDisplay.appendChild(span);
  }

  updateStockInfo();
  renderBonusPoints();
}

const renderBonusPoints = () => {
  bonusPoints = Math.floor(totalAmount / 1000);
  var ptsTag = document.getElementById('loyalty-points');

  if (!ptsTag) {
    ptsTag = document.createElement('span');
    ptsTag.id = 'loyalty-points';
    ptsTag.className = 'text-blue-500 ml-2';
    totalDisplay.appendChild(ptsTag);
  }

  ptsTag.textContent = '(포인트: ' + bonusPoints + ')';
};

function updateStockInfo() {
  var infoMsg = '';

  products.forEach(function (item) {
    if (item.stock < 5) {
      infoMsg +=
        item.name +
        ': ' +
        (item.stock > 0 ? '재고 부족 (' + item.stock + '개 남음)' : '품절') +
        '\n';
    }
  });

  stockDisplay.textContent = infoMsg;
}

main();

addToCartBtn.addEventListener('click', function () {
  var selItem = productSelect.value;
  var itemToAdd = products.find(function (p) {
    return p.id === selItem;
  });

  if (itemToAdd && itemToAdd.stock > 0) {
    var item = document.getElementById(itemToAdd.id);

    if (item) {
      var newQty = parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;

      if (newQty <= itemToAdd.stock) {
        item.querySelector('span').textContent =
          itemToAdd.name + ' - ' + itemToAdd.price + '원 x ' + newQty;
        itemToAdd.stock--;
      } else {
        alert('재고가 부족합니다.');
      }
    } else {
      var newItem = document.createElement('div');

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

      cartContainer.appendChild(newItem);

      itemToAdd.stock--;
    }

    calcCart();

    lastSelectedProduct = selItem;
  }
});

cartContainer.addEventListener('click', function (event) {
  var tgt = event.target;

  if (tgt.classList.contains('quantity-change') || tgt.classList.contains('remove-item')) {
    var prodId = tgt.dataset.productId;
    var itemElem = document.getElementById(prodId);
    var prod = products.find(function (p) {
      return p.id === prodId;
    });

    if (tgt.classList.contains('quantity-change')) {
      var qtyChange = parseInt(tgt.dataset.change);
      var newQty = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]) + qtyChange;

      if (
        newQty > 0 &&
        newQty <= prod.stock + parseInt(itemElem.querySelector('span').textContent.split('x ')[1])
      ) {
        itemElem.querySelector('span').textContent =
          itemElem.querySelector('span').textContent.split('x ')[0] + 'x ' + newQty;
        prod.stock -= qtyChange;
      } else if (newQty <= 0) {
        itemElem.remove();
        prod.stock -= qtyChange;
      } else {
        alert('재고가 부족합니다.');
      }
    } else if (tgt.classList.contains('remove-item')) {
      var remQty = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]);

      prod.stock += remQty;
      itemElem.remove();
    }

    calcCart();
  }
});
