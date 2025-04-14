var bonusPts = 0,
  totalAmt = 0,
  itemCnt = 0;

// 세일 이벤트 상수
const SALE_CONFIG = {
  FLASH_SALE: {
    INTERVAL: 30000, // 30초
    CHANCE: 0.3, // 30% 확률
    DISCOUNT: 0.2, // 20% 할인
  },
  RECOMMENDATION_SALE: {
    INTERVAL: 60000, // 60초
    DISCOUNT: 0.05, // 5% 할인
  },
};

const initialProducts = [
  { id: 'p1', name: '상품1', price: 10000, stock: 50 },
  { id: 'p2', name: '상품2', price: 20000, stock: 30 },
  { id: 'p3', name: '상품3', price: 30000, stock: 20 },
  { id: 'p4', name: '상품4', price: 15000, stock: 0 },
  { id: 'p5', name: '상품5', price: 25000, stock: 10 },
];

const state = {
  lastSelected: null,
  products: [...initialProducts], // 복사본 생성
};

/**
 * 요소 생성 및 속성 추가
 * @param {string} tag 요소 태그
 * @param {Object} properties 요소 속성
 * @returns {Element} 요소
 */
const createElement = (tag, properties = {}) => {
  const element = document.createElement(tag);
  for (const [key, value] of Object.entries(properties)) {
    if (key && value) element[key] = value;
  }
  return element;
};

// 요소 생성
const root = document.getElementById('app');
const container = createElement('div', { className: 'bg-gray-100 p-8' });
const wrapper = createElement('div', {
  className:
    'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8',
});

const elements = {
  header: createElement('h1', {
    className: 'text-2xl font-bold mb-4',
    textContent: '장바구니',
  }),
  cartItems: createElement('div', {
    id: 'cart-items',
    className: 'text-xl font-bold my-4',
  }),
  cartTotal: createElement('div', {
    id: 'cart-total',
    className: 'text-xl font-bold my-4',
  }),
  productSelect: createElement('select', {
    id: 'product-select',
    className: 'border rounded p-2 mr-2',
  }),
  addToCartBtn: createElement('button', {
    id: 'add-to-cart',
    className: 'bg-blue-500 text-white px-4 py-2 rounded',
    textContent: '추가',
  }),
  stockStatus: createElement('div', {
    id: 'stock-status',
    className: 'text-sm text-gray-500 mt-2',
  }),
};

/**
 * 상품 선택 옵션 업데이트
 * @param {Array<{id: string, name: string, price: number, stock: number}>} products 상품 목록
 */
const updateProductOption = (products = state.products) => {
  elements.productSelect.innerHTML = '';
  const selectOptions = products.map((product) =>
    createElement('option', {
      value: product.id,
      disabled: product.stock === 0,
      textContent: `${product.name} - ${product.price}원`,
    }),
  );
  elements.productSelect.append(...selectOptions);
};

/**
 * 세일 이벤트 설정
 * @param {number} interval 이벤트 간격
 * @param {Function} callback 이벤트 콜백
 * @param {number} delay 이벤트 지연 시간
 */
const setupSaleEvents = (interval, callback, delay) => {
  setTimeout(() => {
    setInterval(callback, interval);
  }, delay);
};

const main = () => {
  // 요소 추가
  root.append(container);
  container.append(wrapper);
  wrapper.append(...Object.values(elements));
  updateProductOption();
  calcCart();

  //번개 세일 이벤트 설정
  setupSaleEvents(
    SALE_CONFIG.FLASH_SALE.INTERVAL,
    () => {
      const randomProduct =
        state.products[Math.floor(Math.random() * state.products.length)];
      if (
        Math.random() < SALE_CONFIG.FLASH_SALE.CHANCE &&
        randomProduct.stock > 0
      ) {
        randomProduct.price = Math.round(
          randomProduct.price * (1 - SALE_CONFIG.FLASH_SALE.DISCOUNT),
        );
        alert('번개세일! ' + randomProduct.name + '이(가) 20% 할인 중입니다!');
        updateProductOption();
      }
    },
    Math.random() * 10000,
  );

  //추천 세일 이벤트 설정
  setupSaleEvents(
    SALE_CONFIG.RECOMMENDATION_SALE.INTERVAL,
    () => {
      if (state.lastSelected) {
        var recommendedProduct = state.products.find(function (item) {
          return item.id !== state.lastSelected && item.stock > 0;
        });
        if (recommendedProduct) {
          alert(
            recommendedProduct.name +
              '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!',
          );
          recommendedProduct.price = Math.round(
            recommendedProduct.price *
              (1 - SALE_CONFIG.RECOMMENDATION_SALE.DISCOUNT),
          );
          updateProductOption();
        }
      }
    },
    Math.random() * 20000,
  );
};

function calcCart() {
  totalAmt = 0;
  itemCnt = 0;
  const cartItems = elements.cartItems.children;
  let subTot = 0;
  for (let i = 0; i < cartItems.length; i++) {
    (function () {
      var curItem;
      for (var j = 0; j < state.products.length; j++) {
        if (state.products[j].id === cartItems[i].id) {
          curItem = state.products[j];
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
  elements.cartTotal.textContent = `총액: ${Math.round(totalAmt)}원`;
  if (discRate > 0) {
    const span = createElement('span', {
      className: 'text-green-500 ml-2',
    });
    span.textContent = '(' + (discRate * 100).toFixed(1) + '% 할인 적용)';
    elements.cartTotal.appendChild(span);
  }
  updateStockInfo();
  renderBonusPts();
}
const renderBonusPts = () => {
  bonusPts = Math.floor(totalAmt / 1000);
  var ptsTag = document.getElementById('loyalty-points');
  if (!ptsTag) {
    ptsTag = document.createElement('span');
    ptsTag.id = 'loyalty-points';
    ptsTag.className = 'text-blue-500 ml-2';
    elements.cartTotal.appendChild(ptsTag);
  }
  ptsTag.textContent = '(포인트: ' + bonusPts + ')';
};
function updateStockInfo() {
  var infoMsg = '';
  state.products.forEach(function (item) {
    if (item.stock < 5) {
      infoMsg +=
        item.name +
        ': ' +
        (item.stock > 0 ? '재고 부족 (' + item.stock + '개 남음)' : '품절') +
        '\n';
    }
  });
  elements.stockStatus.textContent = infoMsg;
}

main();

elements.addToCartBtn.addEventListener('click', function () {
  const selItem = elements.productSelect.value;
  const itemToAdd = state.products.find(function (p) {
    return p.id === selItem;
  });
  if (itemToAdd && itemToAdd.stock > 0) {
    var item = document.getElementById(itemToAdd.id);
    if (item) {
      var newQty =
        parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;
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
      elements.cartItems.appendChild(newItem);
      itemToAdd.stock--;
    }
    calcCart();
    state.lastSelected = selItem;
  }
});

elements.cartItems.addEventListener('click', function (event) {
  var tgt = event.target;
  if (
    tgt.classList.contains('quantity-change') ||
    tgt.classList.contains('remove-item')
  ) {
    var prodId = tgt.dataset.productId;
    var itemElem = document.getElementById(prodId);
    var prod = state.products.find(function (p) {
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
          prod.stock +
            parseInt(itemElem.querySelector('span').textContent.split('x ')[1])
      ) {
        itemElem.querySelector('span').textContent =
          itemElem.querySelector('span').textContent.split('x ')[0] +
          'x ' +
          newQty;
        prod.stock -= qtyChange;
      } else if (newQty <= 0) {
        itemElem.remove();
        prod.stock -= qtyChange;
      } else {
        alert('재고가 부족합니다.');
      }
    } else if (tgt.classList.contains('remove-item')) {
      var remQty = parseInt(
        itemElem.querySelector('span').textContent.split('x ')[1],
      );
      prod.stock += remQty;
      itemElem.remove();
    }
    calcCart();
  }

  updateProductOption();
});
