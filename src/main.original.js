/* 상품 데이터 초기화 */
let productList, productSelect, addToCartButton, cartItemList, cartTotal, stockStatus;
var lastSel, bonusPts = 0, totalAmount = 0, itemCount = 0;

/* 상품 데이터 초기화 함수 */
const initProducts = () => {
  productList = [
    { id: 'p1', name: '상품1', val: 10000, quantity: 50 },
    { id: 'p2', name: '상품2', val: 20000, quantity: 30 },
    { id: 'p3', name: '상품3', val: 30000, quantity: 20 },
    { id: 'p4', name: '상품4', val: 15000, quantity: 0 },
    { id: 'p5', name: '상품5', val: 25000, quantity: 10 }
  ];
}

/* UI 생성 함수 */
const createUI = () => {
  const root = document.getElementById('app');

  const html = `
  <div class="bg-gray-100 p-8">
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
      <h1 class="text-2xl font-bold mb-4">장바구니</h1>
      <div id="cart-items"></div>
      <div id="cart-total" class="text-xl font-bold my-4"></div>
      <select id="product-select" class="border rounded p-2 mr-2"></select>
      <button id="add-to-cart" class="bg-blue-500 text-white px-4 py-2 rounded">추가</button>
      <div id="stock-status" classs="text-sm text-gray-500 mt-2"></div>
    </div>
  </div>`

  root.innerHTML = html;

  // 전역 변수 연결
  cartItemList = document.getElementById('cart-items');
  cartTotal = document.getElementById('cart-total');
  productSelect = document.getElementById('product-select');
  addToCartButton = document.getElementById('add-to-cart');
  stockStatus = document.getElementById('stock-status');
}


/* DOM 삽입 */
function main() {
  initProducts();
  createUI()
  updateSelectOptions();
  calculationCart();
  setTimeout(function () {
    setInterval(function () {
      var luckyItem = productList[Math.floor(Math.random() * productList.length)];
      if (Math.random() < 0.3 && luckyItem.quantity > 0) {
        luckyItem.val = Math.round(luckyItem.val * 0.8);
        alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
        updateSelectOptions();
      }
    }, 30000);
  }, Math.random() * 10000);
  setTimeout(function () {
    setInterval(function () {
      if (lastSel) {
        var suggest = productList.find(function (item) { return item.id !== lastSel && item.quantity > 0; });
        if (suggest) {
          alert(suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');
          suggest.val = Math.round(suggest.val * 0.95);
          updateSelectOptions();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
};

function createProductOption(product) {
  const option = document.createElement('option');
  option.value = product.id;
  option.textContent = `${product.name} - ${product.val}원`;
  if (product.quantity === 0) {
    option.disabled = true;
  }
  return option;

}
/* 상품 선택 옵션 업데이트 */
function updateSelectOptions() {
  productSelect.innerHTML = ''; // 기존 옵션 제거
  const fragment = document.createDocumentFragment();// 미리 fragment에 담아 한 번에 추가(리플로우 최소화)
  productList.forEach(product => {
    fragment.appendChild(createProductOption(product));
  })
  productSelect.appendChild(fragment); // 새로운 옵션 추가
}

/* 장바구니 계산 */
function calculationCart() {

  const cartItems = cartItemList.children;
  // const productMap = Object.fromEntries(productList.map(p => [p.id, p]));

  let itemCount = 0;
  let subTotal = 0;
  let totalAmount = 0;

  /* 항목 별 토탈 계산 */
  for (let i = 0; i < cartItems.length; i++) { }

  for (var i = 0; i < cartItems.length; i++) {
    (function () {
      var curItem;
      for (var j = 0; j < productList.length; j++) {
        if (productList[j].id === cartItems[i].id) {
          curItem = productList[j];
          break;
        }
      }
      var quantity = parseInt(cartItems[i].querySelector('span').textContent.split('x ')[1]);
      var itemTotal = curItem.val * quantity;
      var discount = 0;
      itemCount += quantity;
      subTotal += itemTotal;
      // 할인율 적용
      if (quantity >= 10) {
        if (curItem.id === 'p1') discount = 0.1;
        else if (curItem.id === 'p2') discount = 0.15;
        else if (curItem.id === 'p3') discount = 0.2;
        else if (curItem.id === 'p4') discount = 0.05;
        else if (curItem.id === 'p5') discount = 0.25;
      }
      totalAmount += itemTotal * (1 - discount);
    })();
  }
  let discountRate = 0;
  /* 전체 할인율 적용 */
  if (itemCount >= 30) {
    var bulkDiscount = totalAmount * 0.25;
    var itemDiscount = subTotal - totalAmount;
    if (bulkDiscount > itemDiscount) {
      totalAmount = subTotal * (1 - 0.25);
      discountRate = 0.25;
    } else {
      discountRate = (subTotal - totalAmount) / subTotal;
    }
  } else {
    discountRate = (subTotal - totalAmount) / subTotal;
  }
  /* 특정 요일 할인 적용 */
  if (new Date().getDay() === 2) {
    totalAmount *= (1 - 0.1);
    discountRate = Math.max(discountRate, 0.1);
  }
  /* 특정 시간대 할인 적용 */
  cartTotal.textContent = '총액: ' + Math.round(totalAmount) + '원';
  if (discountRate > 0) {
    var span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = '(' + (discountRate * 100).toFixed(1) + '% 할인 적용)';
    cartTotal.appendChild(span);
  }
  updateStockInfo();
  renderBonusPts();
}
/* 포인트 계산 */
const renderBonusPts = () => {
  bonusPts = Math.floor(totalAmount / 1000);
  var ptsTag = document.getElementById('loyalty-points');
  if (!ptsTag) {
    ptsTag = document.createElement('span');
    ptsTag.id = 'loyalty-points';
    ptsTag.className = 'text-blue-500 ml-2';
    cartTotal.appendChild(ptsTag);
  }
  ptsTag.textContent = '(포인트: ' + bonusPts + ')';
};
/* 재고 상태 업데이트 */
function updateStockInfo() {
  var infoMsg = '';
  productList.forEach(function (item) {
    if (item.quantity < 5) {
      infoMsg += item.name + ': ' + (item.quantity > 0 ? '재고 부족 (' + item.quantity + '개 남음)' : '품절') + '\n';
    }
  });
  stockStatus.textContent = infoMsg;
}
main();
addToCartButton.addEventListener('click', function () {
  var selItem = productSelect.value;
  var itemToAdd = productList.find(function (p) { return p.id === selItem; });
  if (itemToAdd && itemToAdd.quantity > 0) {
    var item = document.getElementById(itemToAdd.id);
    if (item) {
      var newQty = parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;
      if (newQty <= itemToAdd.quantity) {
        item.querySelector('span').textContent = itemToAdd.name + ' - ' + itemToAdd.val + '원 x ' + newQty;
        itemToAdd.quantity--;
      } else { alert('재고가 부족합니다.'); }
    } else {
      var newItem = document.createElement('div');
      newItem.id = itemToAdd.id;
      newItem.className = 'flex justify-between items-center mb-2';
      newItem.innerHTML = '<span>' + itemToAdd.name + ' - ' + itemToAdd.val + '원 x 1</span><div>' +
        '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' + itemToAdd.id + '" data-change="-1">-</button>' +
        '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' + itemToAdd.id + '" data-change="1">+</button>' +
        '<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' + itemToAdd.id + '">삭제</button></div>';
      cartItemList.appendChild(newItem);
      itemToAdd.quantity--;
    }
    calculationCart();
    lastSel = selItem;
  }
});
cartItemList.addEventListener('click', function (event) {
  var tgt = event.target;
  if (tgt.classList.contains('quantity-change') || tgt.classList.contains('remove-item')) {
    var prodId = tgt.dataset.productId;
    var itemElem = document.getElementById(prodId);
    var prod = productList.find(function (p) { return p.id === prodId; });
    if (tgt.classList.contains('quantity-change')) {
      var qtyChange = parseInt(tgt.dataset.change);
      var newQty = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]) + qtyChange;
      if (newQty > 0 && newQty <= prod.quantity + parseInt(itemElem.querySelector('span').textContent.split('x ')[1])) {
        itemElem.querySelector('span').textContent = itemElem.querySelector('span').textContent.split('x ')[0] + 'x ' + newQty;
        prod.quantity -= qtyChange;
      } else if (newQty <= 0) {
        itemElem.remove();
        prod.quantity -= qtyChange;
      } else {
        alert('재고가 부족합니다.');
      }
    } else if (tgt.classList.contains('remove-item')) {
      var remQty = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]);
      prod.quantity += remQty;
      itemElem.remove();
    }
    calculationCart();
  }
});