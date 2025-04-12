var itemBundle, itemSelectElement, addToCartBtn, cartElement, sumElement, stockStateElement;

var selectLastElement,
  bonusPoint = 0, //보너스 포인트
  totalAmount = 0, //총액
  itemCount = 0;

function main() {
  //전역변수의 prodList로 각 상품을 객체배열로 정의합니다.
  itemBundle = [
    { id: 'p1', name: '상품1', price: 10000, stock: 50 }, //val->price: 가격, q->stock:재고 수량(quantity) ->price로 변경
    { id: 'p2', name: '상품2', price: 20000, stock: 30 },
    { id: 'p3', name: '상품3', price: 30000, stock: 20 },
    { id: 'p4', name: '상품4', price: 15000, stock: 0 },
    { id: 'p5', name: '상품5', price: 25000, stock: 10 },
  ];

  //지역변수를 createElement를 통해 요소로 만듭니다.
  var root = document.getElementById('app');
  let rootChild = document.createElement('div');
  var elementWraller = document.createElement('div'); //요소들을 둘러싸는 컨테이너, wrap
  let header = document.createElement('h1');

  //전역변수를 createElement를 통해 요소로 만듭니다.
  addToCartBtn = document.createElement('button');
  cartElement = document.createElement('div'); //장바구니 , disp: display를 뜻합니다.
  sumElement = document.createElement('div'); //장바구니의 총액
  itemSelectElement = document.createElement('select'); //select를 의미, 상품들이 들어감
  stockStateElement = document.createElement('div'); //재품의 재고상태를 나타냄(품절, 남은개수)

  //전역변수의 elem에 id를 정의합니다.
  addToCartBtn.id = 'add-to-cart';
  cartElement.id = 'cart-items';
  sumElement.id = 'cart-total';
  itemSelectElement.id = 'product-select';
  stockStateElement.id = 'stock-status';

  //지역변수의 className을 정의합니다.
  rootChild.className = 'bg-gray-100 p-8';
  elementWraller.className =
    'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';
  header.className = 'text-2xl font-bold mb-4';

  //전역변수의 className을 정의합니다.
  sumElement.className = 'text-xl font-bold my-4';
  itemSelectElement.className = 'border rounded p-2 mr-2';
  addToCartBtn.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  stockStateElement.className = 'text-sm text-gray-500 mt-2';

  //htxt,addbtn에 텍스트를 추가합니다.
  header.textContent = '장바구니';
  addToCartBtn.textContent = '추가';

  updateSelOpts(); //select인 sel에 option인 opt를 할당

  //컨테이너인 wrap에 요소들을 추가합니다.
  elementWraller.appendChild(header);
  elementWraller.appendChild(cartElement);
  elementWraller.appendChild(sumElement);
  elementWraller.appendChild(itemSelectElement);
  elementWraller.appendChild(addToCartBtn);
  elementWraller.appendChild(stockStateElement);
  rootChild.appendChild(elementWraller);
  root.appendChild(rootChild);

  calcCart();

  //번개세일을 진행합니다.
  setTimeout(function () {
    setInterval(function () {
      var luckyItem = itemBundle[Math.floor(Math.random() * itemBundle.length)];
      if (Math.random() < 0.3 && luckyItem.stock > 0) {
        luckyItem.price = Math.round(luckyItem.price * 0.8);
        alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
        updateSelOpts();
      }
    }, 30000);
  }, Math.random() * 10000);

  //알림으로 구매를 제안합니다.
  setTimeout(function () {
    setInterval(function () {
      if (selectLastElement) {
        var suggest = itemBundle.find(function (item) {
          return item.id !== selectLastElement && item.stock > 0;
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

/**Select인 sel 밑으로 각 상품을 Option으로 넣습니다*/
function updateSelOpts() {
  itemSelectElement.innerHTML = '';

  //각각의 prodList에 대해 option태그를 생성하고 id와 text를 넣어줍니다.
  itemBundle.forEach(function (item) {
    var itemOptionElement = document.createElement('option');
    itemOptionElement.value = item.id;
    itemOptionElement.textContent = item.name + ' - ' + item.price + '원';

    if (item.stock === 0) itemOptionElement.disabled = true; //q는 재고를 의미합니다.

    itemSelectElement.appendChild(itemOptionElement);
  });
}

/**장바구니를 계산합니다.*/
function calcCart() {
  totalAmount = 0;
  itemCount = 0;

  var cartItems = cartElement.children; //장바구니의 자식들을 cartItem으로 담습니다.
  var subTotal = 0;

  for (var i = 0; i < cartItems.length; i++) {
    //모든 장바구니를 순회
    (function () {
      //즉시 실행 함수
      var curItem; //현재 아이템입니다.
      for (var j = 0; j < itemBundle.length; j++) {
        //전체 아이템의 개수만큼 순회
        if (itemBundle[j].id === cartItems[i].id) {
          //전체 아이템와 장바구니의 아이디를 비교하여 같다면
          curItem = itemBundle[j]; //현재 아이템으로 등록
          break;
        }
      }
      //q-> stock:장바구니에 담은 개수
      var stock = parseInt(cartItems[i].querySelector('span').textContent.split('x ')[1]);
      var itemTotal = curItem.price * stock; //itemTot: 장바구니에 담은 개수만큼의 총 금액
      var disc = 0;
      itemCount += stock; //itemCnt는 장바구니 개수
      subTotal += itemTotal; //subTot에 itemTot만큼 업데이트합니다. (장바구니에 담은 개수의 총액)
      if (stock >= 10) {
        //장바구니에 10개 이상 담은 경우 할인(disc) 적용
        if (curItem.id === 'p1') disc = 0.1;
        else if (curItem.id === 'p2') disc = 0.15;
        else if (curItem.id === 'p3') disc = 0.2;
        else if (curItem.id === 'p4') disc = 0.05;
        else if (curItem.id === 'p5') disc = 0.25;
      }
      totalAmount += itemTotal * (1 - disc); //총액 업데이트
    })();
  }

  let discRate = 0;
  if (itemCount >= 30) {
    var bulkDisc = totalAmount * 0.25;
    var itemDisc = subTotal - totalAmount;

    if (bulkDisc > itemDisc) {
      totalAmount = subTotal * (1 - 0.25);
      discRate = 0.25;
    } else {
      discRate = (subTotal - totalAmount) / subTotal;
    }
  } else {
    discRate = (subTotal - totalAmount) / subTotal;
  }

  if (new Date().getDay() === 2) {
    totalAmount *= 1 - 0.1;
    discRate = Math.max(discRate, 0.1);
  }
  sumElement.textContent = '총액: ' + Math.round(totalAmount) + '원';

  if (discRate > 0) {
    //할인이 있을 경우, 할인 적용
    var span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = '(' + (discRate * 100).toFixed(1) + '% 할인 적용)';
    sumElement.appendChild(span);
  }

  updateStockState();
  updateBonusPoint();
}

/**각 아이템의 재고가 5개 미만인 경우 재고부족, 품절을 표시. */
function updateStockState() {
  var infoMsg = '';

  itemBundle.forEach(function (item) {
    if (item.stock < 5) {
      infoMsg +=
        item.name +
        ': ' +
        (item.stock > 0 ? '재고 부족 (' + item.stock + '개 남음)' : '품절') +
        '\n';
    }
  });

  stockStateElement.textContent = infoMsg;
}

/**보너스포인터를 계산합니다.*/
const updateBonusPoint = () => {
  bonusPoint = Math.floor(totalAmount / 1000); //보너스포인트 계산

  var bonusPointElement = document.getElementById('loyalty-points'); //보너스포인트의 elem을 생성

  if (!bonusPointElement) {
    bonusPointElement = document.createElement('span');
    bonusPointElement.id = 'loyalty-points';
    bonusPointElement.className = 'text-blue-500 ml-2';
    sumElement.appendChild(bonusPointElement);
  }

  bonusPointElement.textContent = '(포인트: ' + bonusPoint + ')';
};

main();

//이벤트 헨들러
//추가 버튼 클릭한 경우
addToCartBtn.addEventListener('click', function () {
  //selItem: 선택된 아이템의 아이디, (ex.p1)
  var selectedItemId = itemSelectElement.value; //select태그의 값
  //추가될 아이템(선택된 아이디)
  var itemToAdd = itemBundle.find(function (p) {
    return p.id === selectedItemId;
  });

  if (itemToAdd && itemToAdd.stock > 0) {
    var item = document.getElementById(itemToAdd.id);

    if (item) {
      //추가할 아이디가 있을 경우
      var newQty = parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1; //장바구니에 추가한 개수
      //장바구니에 추가한 개수와 재고를 비교
      if (newQty <= itemToAdd.stock) {
        item.querySelector('span').textContent =
          itemToAdd.name + ' - ' + itemToAdd.price + '원 x ' + newQty;
        itemToAdd.stock--; //재고를 하나 내립니다.
      } else {
        alert('재고가 부족합니다.');
      }
    } //end of 1D if
    else {
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
      cartElement.appendChild(newItem);
      itemToAdd.stock--; //재고를 하나 내립니다.
    } //end of 1D else

    calcCart(); //장바구니 계산

    selectLastElement = selectedItemId;
  }
});

//장바구니 클릭
cartElement.addEventListener('click', function (event) {
  var tgt = event.target; //장바구니 elem의 클릭요소 (target의 준말같음)

  if (tgt.classList.contains('quantity-change') || tgt.classList.contains('remove-item')) {
    var prodId = tgt.dataset.productId; //클릭한 장바구니 요소의 아이디
    var itemElem = document.getElementById(prodId);

    var prod = itemBundle.find(function (p) {
      return p.id === prodId;
    });

    //장바구니 추가되고 나오는 +와 - 버튼의 클래스명
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
    } //end of 1D if
    else if (tgt.classList.contains('remove-item')) {
      //remove-item: 장바구니 추가되고 나오는 삭제의 클래스 명

      //밑에는 그동안 담아둔 장바구니의 개수
      var remQty = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]);
      prod.stock += remQty;

      itemElem.remove();
    }

    calcCart();
  }
});
