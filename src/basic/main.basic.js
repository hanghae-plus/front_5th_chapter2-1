let itemSelectElement, addToCartBtn, cartElement, sumElement, stockStateElement;

const items = [
  { id: 'p1', name: '상품1', price: 10000, stock: 50 }, //val->price: 가격, q->stock:재고 수량(quantity) ->price로 변경
  { id: 'p2', name: '상품2', price: 20000, stock: 30 },
  { id: 'p3', name: '상품3', price: 30000, stock: 20 },
  { id: 'p4', name: '상품4', price: 15000, stock: 0 },
  { id: 'p5', name: '상품5', price: 25000, stock: 10 },
];

let recentSelectedItemId,
  totalPrice = 0; //총액

const main = () => {
  //NOTE: UI APDATE
  //지역변수를 createElement를 통해 요소로 만듭니다.
  const app = document.getElementById('app');
  const root = document.createElement('div');
  const elementWrapper = document.createElement('div'); //요소들을 둘러싸는 컨테이너, wrap
  const header = document.createElement('h1');

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
  root.className = 'bg-gray-100 p-8';
  elementWrapper.className =
    'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';
  header.className = 'text-2xl font-bold mb-4';

  //전역변수의 className을 정의합니다.
  addToCartBtn.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  sumElement.className = 'text-xl font-bold my-4';
  itemSelectElement.className = 'border rounded p-2 mr-2';
  stockStateElement.className = 'text-sm text-gray-500 mt-2';

  //htxt,addbtn에 텍스트를 추가합니다.
  header.textContent = '장바구니';
  addToCartBtn.textContent = '추가';

  updateItemOption(); //select인 sel에 option인 opt를 할당

  //컨테이너인 wrap에 요소들을 추가합니다.
  elementWrapper.appendChild(header);
  elementWrapper.appendChild(cartElement);
  elementWrapper.appendChild(sumElement);
  elementWrapper.appendChild(itemSelectElement);
  elementWrapper.appendChild(addToCartBtn);
  elementWrapper.appendChild(stockStateElement);

  root.appendChild(elementWrapper);
  app.appendChild(root);

  calcCart();

  //NOTE: ALERT
  //번개세일을 진행합니다.
  setTimeout(function () {
    setInterval(function () {
      let luckyItem = items[Math.floor(Math.random() * items.length)];
      if (Math.random() < 0.3 && luckyItem.stock > 0) {
        luckyItem.price = Math.round(luckyItem.price * 0.8);
        alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
        updateItemOption();
      }
    }, 30000);
  }, Math.random() * 10000);

  //알림으로 구매를 제안합니다.
  setTimeout(function () {
    setInterval(function () {
      if (recentSelectedItemId) {
        let suggest = items.find(function (item) {
          return item.id !== recentSelectedItemId && item.stock > 0;
        });
        if (suggest) {
          alert(suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');
          suggest.price = Math.round(suggest.price * 0.95);
          updateItemOption();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
};

//NOTE: UI UPDATE
/**Select인 sel 밑으로 각 상품을 Option으로 넣습니다*/
const updateItemOption = () => {
  itemSelectElement.innerHTML = '';

  //각각의 prodList에 대해 option태그를 생성하고 id와 text를 넣어줍니다.
  items.forEach(function (item) {
    let itemOptionElement = document.createElement('option');
    itemOptionElement.value = item.id;
    itemOptionElement.textContent = item.name + ' - ' + item.price + '원';

    if (item.stock === 0) itemOptionElement.disabled = true; //q는 재고를 의미합니다.

    itemSelectElement.appendChild(itemOptionElement);
  });
};

/**장바구니를 계산합니다.*/
const calcCart = () => {
  totalPrice = 0;
  let itemCount = 0;

  let cartItems = cartElement.children; //장바구니의 자식들을 cartItem으로 담습니다.
  let subTotalPrice = 0;

  for (let i = 0; i < cartItems.length; i++) {
    //모든 장바구니를 순회
    (function () {
      //즉시 실행 함수
      let currentItem; //현재 아이템입니다.
      for (let j = 0; j < items.length; j++) {
        //전체 아이템의 개수만큼 순회
        if (items[j].id === cartItems[i].id) {
          //전체 아이템와 장바구니의 아이디를 비교하여 같다면
          currentItem = items[j]; //현재 아이템으로 등록
          break;
        }
      }
      //q-> stock:장바구니에 담은 개수
      let stock = parseInt(cartItems[i].querySelector('span').textContent.split('x ')[1]);
      let itemTotalPrice = currentItem.price * stock; //itemTot: 장바구니에 담은 개수만큼의 총 금액
      let discount = 0;

      itemCount += stock; //itemCnt는 장바구니 개수
      subTotalPrice += itemTotalPrice; //subTot에 itemTot만큼 업데이트합니다. (장바구니에 담은 개수의 총액)

      if (stock >= 10) {
        //장바구니에 10개 이상 담은 경우 할인(disc) 적용
        if (currentItem.id === 'p1') discount = 0.1;
        else if (currentItem.id === 'p2') discount = 0.15;
        else if (currentItem.id === 'p3') discount = 0.2;
        else if (currentItem.id === 'p4') discount = 0.05;
        else if (currentItem.id === 'p5') discount = 0.25;
      }
      totalPrice += itemTotalPrice * (1 - discount); //총액 업데이트
    })();
  }

  let discount = 0;
  if (itemCount >= 30) {
    let bulkDiscount = totalPrice * 0.25;
    let itemDiscount = subTotalPrice - totalPrice;

    if (bulkDiscount > itemDiscount) {
      totalPrice = subTotalPrice * (1 - 0.25);
      discount = 0.25;
    } else {
      discount = (subTotalPrice - totalPrice) / subTotalPrice;
    }
  } else {
    discount = (subTotalPrice - totalPrice) / subTotalPrice;
  }

  if (new Date().getDay() === 2) {
    totalPrice *= 1 - 0.1;
    discount = Math.max(discount, 0.1);
  }
  sumElement.textContent = '총액: ' + Math.round(totalPrice) + '원';

  if (discount > 0) {
    //할인이 있을 경우, 할인 적용
    let span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = '(' + (discount * 100).toFixed(1) + '% 할인 적용)';
    sumElement.appendChild(span);
  }

  updateStockState();
  updateBonusPoint();
};

/**각 아이템의 재고가 5개 미만인 경우 재고부족, 품절을 표시. */
const updateStockState = () => {
  let stockState = '';

  items.forEach(function (item) {
    if (item.stock < 5) {
      stockState +=
        item.name +
        ': ' +
        (item.stock > 0 ? '재고 부족 (' + item.stock + '개 남음)' : '품절') +
        '\n';
    }
  });

  stockStateElement.textContent = stockState;
};

/**보너스포인터를 계산합니다.*/
const updateBonusPoint = () => {
  const bonusPoint = Math.floor(totalPrice / 1000); //보너스포인트 계산

  let bonusPointElement = document.getElementById('loyalty-points'); //보너스포인트의 elem을 생성

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
  let selectedItemId = itemSelectElement.value; //select태그의 값
  //추가될 아이템(선택된 아이디)
  let selecedItem = items.find(function (p) {
    return p.id === selectedItemId;
  });
  console.log(selecedItem);
  if (selecedItem && selecedItem.stock > 0) {
    let item = document.getElementById(selecedItem.id);

    if (item) {
      //추가할 아이디가 있을 경우
      let cartCount = parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1; //장바구니에 추가한 개수
      //장바구니에 추가한 개수와 재고를 비교
      if (cartCount <= selecedItem.stock) {
        item.querySelector('span').textContent =
          selecedItem.name + ' - ' + selecedItem.price + '원 x ' + cartCount;
        selecedItem.stock--; //재고를 하나 내립니다.
      } else {
        alert('재고가 부족합니다.');
      }
    } //end of 1D if
    else {
      let newItem = document.createElement('div');
      newItem.id = selecedItem.id;
      newItem.className = 'flex justify-between items-center mb-2';
      newItem.innerHTML =
        '<span>' +
        selecedItem.name +
        ' - ' +
        selecedItem.price +
        '원 x 1</span><div>' +
        '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
        selecedItem.id +
        '" data-change="-1">-</button>' +
        '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
        selecedItem.id +
        '" data-change="1">+</button>' +
        '<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' +
        selecedItem.id +
        '">삭제</button></div>';
      cartElement.appendChild(newItem);
      selecedItem.stock--; //재고를 하나 내립니다.
    } //end of 1D else

    calcCart(); //장바구니 계산

    recentSelectedItemId = selectedItemId;
  }
});

//장바구니 클릭
cartElement.addEventListener('click', function (event) {
  let selectedCartElement = event.target; //장바구니 elem의 클릭요소 (target의 준말같음)
  if (
    selectedCartElement.classList.contains('quantity-change') ||
    selectedCartElement.classList.contains('remove-item')
  ) {
    let selectedItemId = selectedCartElement.dataset.productId; //클릭한 장바구니 요소의 아이디
    console.log(selectedItemId);
    let itemElem = document.getElementById(selectedItemId);

    let item = items.find(function (p) {
      return p.id === selectedItemId;
    });
    console.log(item);
    //장바구니 추가되고 나오는 +와 - 버튼의 클래스명
    if (selectedCartElement.classList.contains('quantity-change')) {
      let qtyChange = parseInt(selectedCartElement.dataset.change); //FIXME: 변수명 변경
      let newQty = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]) + qtyChange; //FIXME: 변수명 변경
      if (
        newQty > 0 &&
        newQty <= item.stock + parseInt(itemElem.querySelector('span').textContent.split('x ')[1])
      ) {
        itemElem.querySelector('span').textContent =
          itemElem.querySelector('span').textContent.split('x ')[0] + 'x ' + newQty;
        item.stock -= qtyChange;
      } else if (newQty <= 0) {
        itemElem.remove();
        item.stock -= qtyChange;
      } else {
        alert('재고가 부족합니다.');
      }
    } //end of 1D if
    else if (selectedCartElement.classList.contains('remove-item')) {
      //remove-item: 장바구니 추가되고 나오는 삭제의 클래스 명

      //밑에는 그동안 담아둔 장바구니의 개수
      let remQty = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]);
      item.stock += remQty;

      itemElem.remove();
    }

    calcCart();
  }
});
