// 1. 공백으로 분리해보자. 공백을 나눈 과정은 어떻게 그렇게 나누게 되었는가?
// 2. 이게 돔으로 처리 되다보니, 여러군데서 사용되서 이렇게 밖으로 빼낸거 같네 다른 좋은 방안이 없을까?

let products, productSelectedElement, addProductButton, cartItemsElement, totalPayment, stockInfo;
let lastSelectedProduct, earnedPoints = 0, totalAmount = 0, itemQuantity = 0;

function main() {
  products = [
    //id를 수정하는건 어떨까?
    { id: 'p1', name: '상품1', price: 10000, quantity: 50 },
    { id: 'p2', name: '상품2', price: 20000, quantity: 30 },
    { id: 'p3', name: '상품3', price: 30000, quantity: 20 },
    { id: 'p4', name: '상품4', price: 15000, quantity: 0 },
    { id: 'p5', name: '상품5', price: 25000, quantity: 10 },
  ];

  let root = document.getElementById('app');
  let CartContainer = document.createElement('div');
  let CartWrapper = document.createElement('div');
  let pageHeading = document.createElement('h1');

  cartItemsElement = document.createElement('div');
  totalPayment = document.createElement('div');
  productSelectedElement = document.createElement('select');
  addProductButton = document.createElement('button');
  stockInfo = document.createElement('div');

  cartItemsElement.id = 'cart-items';
  totalPayment.id = 'cart-total';
  productSelectedElement.id = 'product-select';
  addProductButton.id = 'add-to-cart';
  stockInfo.id = 'stock-status';

  CartContainer.className = 'bg-gray-100 p-8';
  CartWrapper.className = 'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';
  pageHeading.className = 'text-2xl font-bold mb-4';

  totalPayment.className = 'text-xl font-bold my-4';
  productSelectedElement.className = 'border rounded p-2 mr-2';
  addProductButton.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  stockInfo.className = 'text-sm text-gray-500 mt-2';

  pageHeading.textContent = '장바구니';
  addProductButton.textContent = '추가';

  updateSelOpts();

  CartWrapper.appendChild(pageHeading);
  CartWrapper.appendChild(cartItemsElement);
  CartWrapper.appendChild(totalPayment);
  CartWrapper.appendChild(productSelectedElement);
  CartWrapper.appendChild(addProductButton);
  CartWrapper.appendChild(stockInfo);
  CartContainer.appendChild(CartWrapper);
  root.appendChild(CartContainer);

  calcCart();

  //이 function을 나누는게 효과적일까?
  setTimeout(function() {
    setInterval(function() {
      let luckyItem = products[Math.floor(Math.random() * products.length)];
      if (Math.random() < 0.3 && luckyItem.quantity > 0) {
        luckyItem.price = Math.round(luckyItem.price * 0.8);
        alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
        updateSelOpts();
      }
    }, 30000);
  }, Math.random() * 10000);

  setTimeout(function() {
    setInterval(function() {
      if (lastSelectedProduct) {
        let suggest = products.find(function(item) {
          return item.id !== lastSelectedProduct && item.quantity > 0;
        });
        if (suggest) {
          alert(suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');
          suggest.price = Math.round(suggest.price * 0.95);
          updateSelOpts();
        }
      }
    }, 60000);
  }, Math.random() * 20000);

};

function updateSelOpts() {
  productSelectedElement.innerHTML = '';
  products.forEach(function(item) {
    let opt = document.createElement('option');
    opt.value = item.id;
    opt.textContent = item.name + ' - ' + item.price + '원';
    if (item.quantity === 0) opt.disabled = true;
    productSelectedElement.appendChild(opt);
  });
}

function calcCart() {
  totalAmount = 0;
  //고민해보자.
  itemQuantity = 0;
  let cartItems = cartItemsElement.children;
  let subTot = 0;

  for (let i = 0; i < cartItems.length; i++) {
    //여기는 분리할 필요가 있겠다. 다른 함수로
    (function() {
      let currentItem;
      for (let j = 0; j < products.length; j++) {
        if (products[j].id === cartItems[i].id) {
          currentItem = products[j];
          break;
        }
      }
      let quantity = parseInt(cartItems[i].querySelector('span').textContent.split('x ')[1]);
      let itemTot = currentItem.price * quantity;
      let disc = 0;
      itemQuantity += quantity;
      subTot += itemTot;

      if (quantity >= 10) {
        if (currentItem.id === 'p1') disc = 0.1;
        else if (currentItem.id === 'p2') disc = 0.15;
        else if (currentItem.id === 'p3') disc = 0.2;
        else if (currentItem.id === 'p4') disc = 0.05;
        else if (currentItem.id === 'p5') disc = 0.25;
      }

      totalAmount += itemTot * (1 - disc);
    })();
  }
  let discRate = 0;

  // magin number 분리할 필요 있지 않을까?
  if (itemQuantity >= 30) {
    let bulkDisc = totalAmount * 0.25;
    let itemDisc = subTot - totalAmount;
    if (bulkDisc > itemDisc) {
      totalAmount = subTot * (1 - 0.25);
      // 할인율을 25%로 고정
      discRate = 0.25;
    } else {
      discRate = (subTot - totalAmount) / subTot;
    }
  } else {
    discRate = (subTot - totalAmount) / subTot;
  }

  if (new Date().getDay() === 2) {
    totalAmount *= (1 - 0.1);
    discRate = Math.max(discRate, 0.1);
  }

  totalPayment.textContent = '총액: ' + Math.round(totalAmount) + '원';

  if (discRate > 0) {
    let span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = '(' + (discRate * 100).toFixed(1) + '% 할인 적용)';
    totalPayment.appendChild(span);
  }

  updateStockInfo();
  renderBonusPts();

}

const renderBonusPts = () => {
  earnedPoints = Math.floor(totalAmount / 1000);
  let ptsTag = document.getElementById('loyalty-points');

  if (!ptsTag) {
    ptsTag = document.createElement('span');
    ptsTag.id = 'loyalty-points';
    ptsTag.className = 'text-blue-500 ml-2';
    totalPayment.appendChild(ptsTag);
  }
  ptsTag.textContent = '(포인트: ' + earnedPoints + ')';
};

function updateStockInfo() {
  let infoMsg = '';

  products.forEach(function(item) {
    if (item.quantity < 5) {
      infoMsg += item.name + ': ' + (item.quantity > 0 ? '재고 부족 (' + item.quantity + '개 남음)' : '품절') + '\n';
    }
  });

  stockInfo.textContent = infoMsg;
}

main();

addProductButton.addEventListener('click', function() {
  let selItem = productSelectedElement.value;
  let itemToAdd = products.find(function(p) {
    return p.id === selItem;
  });

  //q가 뭔지 정확히 알 수가 없네.
  if (itemToAdd && itemToAdd.quantity > 0) {
    let item = document.getElementById(itemToAdd.id);
    if (item) {
      let newQty = parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;
      if (newQty <= itemToAdd.quantity) {
        item.querySelector('span').textContent = itemToAdd.name + ' - ' + itemToAdd.price + '원 x ' + newQty;
        itemToAdd.quantity--;
      } else {
        alert('재고가 부족합니다.');
      }
    } else {
      let newItem = document.createElement('div');
      newItem.id = itemToAdd.id;
      newItem.className = 'flex justify-between items-center mb-2';
      newItem.innerHTML = '<span>' + itemToAdd.name + ' - ' + itemToAdd.price + '원 x 1</span><div>' +
        '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' + itemToAdd.id + '" data-change="-1">-</button>' +
        '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' + itemToAdd.id + '" data-change="1">+</button>' +
        '<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' + itemToAdd.id + '">삭제</button></div>';
      cartItemsElement.appendChild(newItem);
      itemToAdd.quantity--;
    }
    calcCart();
    lastSelectedProduct = selItem;
  }
});

cartItemsElement.addEventListener('click', function(event) {
  let tgt = event.target;

  if (tgt.classList.contains('quantity-change') || tgt.classList.contains('remove-item')) {
    let prodId = tgt.dataset.productId;
    let itemElem = document.getElementById(prodId);
    let prod = products.find(function(p) {
      return p.id === prodId;
    });

    if (tgt.classList.contains('quantity-change')) {
      let qtyChange = parseInt(tgt.dataset.change);
      let newQty = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]) + qtyChange;
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
      let remQty = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]);
      prod.quantity += remQty;
      itemElem.remove();
    }
    calcCart();
  }
});