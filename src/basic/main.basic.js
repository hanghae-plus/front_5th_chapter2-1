/**
 * todo
 * -[ ] 초기 createElement된 요소들은 template으로 관리
 * -[ ] 만들 수 있는 부분은 component로 만들기
 *
 * - 필요한 상태값
 *  - 최근 담긴 상품 : lastAddedItem? lastAddedItemected?
 *  - 특가 적용된 상품
 *  - 특가 적용된 새로운 option 상태
 *  - 장바구니 목록
 *  - 총 가격
 *  - 총 할인률
 */

let lastAddedItem = null;

/** 등록된 상품 목록 */
const PRODUCTS_BY_ID = {
  p1: { id: 'p1', name: '상품1', price: 10000, quantity: 50, discount: 0.1 },
  p2: { id: 'p2', name: '상품2', price: 20000, quantity: 30, disconnt: 0.15 },
  p3: { id: 'p3', name: '상품3', price: 30000, quantity: 20, disconnt: 0.2 },
  p4: { id: 'p4', name: '상품4', price: 15000, quantity: 0, disconnt: 0.05 },
  p5: { id: 'p5', name: '상품5', price: 25000, quantity: 10, disconnt: 0.25 },
};

function main() {
  const root = document.getElementById('app');

  const template = () => /* html */ `
    <div id="container" class="bg-gray-100 p-8">
      <div id="wrapper" class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 id="title" class="text-2xl font-bold mb-4">장바구니</h1>
        <div id="carts"></div>
        <div id="cart-total" class="text-xl font-bold my-4">
        </div>
        <div id="products-select-box" class="border rounded p-2 mr-2"></div>
        <button id="add-cart-btn" class="bg-blue-500 text-white px-4 py-2 rounded">추가</button>
        <div id="stock-state" class="text-sm text-gray-500 mt-2">
      </div>
    </div>
  `;

  const $container = document.createElement('div');
  $container.className = 'bg-gray-100 p-8';

  const $wrapper = document.createElement('div');
  $wrapper.className =
    'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';

  const $title = document.createElement('h1');
  $title.className = 'text-2xl font-bold mb-4';
  $title.textContent = '장바구니';

  /** 장바구니 목록 ui */
  const $cartsWrapper = document.createElement('div');
  $cartsWrapper.id = 'cart-items'; // carts 변경

  /** 장바구니에 담은 상품 총 가격 ui */
  const $totalPriceWrapper = document.createElement('div');
  $totalPriceWrapper.id = 'cart-total';
  $totalPriceWrapper.className = 'text-xl font-bold my-4';

  /** select-box ui */
  const $selectBox = document.createElement('select');
  $selectBox.id = 'product-select'; // products-select-box 변경
  $selectBox.className = 'border rounded p-2 mr-2';

  /** 장바구니 추가 버튼 */
  const $addCartBtn = document.createElement('button');
  $addCartBtn.id = 'add-to-cart'; // add-cart-btn 변경
  $addCartBtn.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  $addCartBtn.textContent = '추가';

  /** 재고 현황 ui */
  const $stocksWrapper = document.createElement('div');
  $stocksWrapper.id = 'stock-status'; // stock-state 변경
  $stocksWrapper.className = 'text-sm text-gray-500 mt-2';

  Options();

  // ui
  $wrapper.appendChild($title);
  $wrapper.appendChild($cartsWrapper);
  $wrapper.appendChild($totalPriceWrapper);
  $wrapper.appendChild($selectBox);
  $wrapper.appendChild($addCartBtn);
  $wrapper.appendChild($stocksWrapper);
  $container.appendChild($wrapper);
  root.appendChild($container);

  calcCart();

  // 광고 alert
  setTimeout(function () {
    setInterval(function () {
      // 랜덤으로 특가 상품 alert 실행
      const luckyItem = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
      if (Math.random() < 0.3 && luckyItem.quantity > 0) {
        luckyItem.val = Math.round(luckyItem.val * 0.8);
        alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');

        // 특가 적용된 select-option으로 변경
        Options();
      }
    }, 30000);
  }, Math.random() * 10000);

  setTimeout(function () {
    setInterval(function () {
      // 마지막으로 구매한 상품 cta alert 실행
      if (lastAddedItem) {
        const suggest = PRODUCTS.find(function (item) {
          return item.id !== lastAddedItem && item.q > 0;
        });

        if (suggest) {
          alert(suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');

          // alert 띄운 상품의 select-option에 가격(=val) 수정
          suggest.val = Math.round(suggest.val * 0.95);
          Options();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
}

/** option태그 업데이트 함수 */
function Options() {
  $selectBox.innerHTML = '';
  PRODUCTS.forEach(function (item) {
    const opt = document.createElement('option');
    opt.value = item.id;
    opt.textContent = item.name + ' - ' + item.val + '원';
    if (item.q === 0) opt.disabled = true;
    $selectBox.appendChild(opt);
  });
}

/** 장바구니에 담긴 총 가격 계산 함수 */
function calcCart() {
  /** 장바구니 상품들의 총 가격 */
  let price = 0;
  /** 장바구니에 담긴 상품 총 개수 */
  let quantity = 0;

  /** 장바구니 상품 목록 todo - carts로 수정하기 */
  const cartItems = $cartsWrapper.children;
  console.log(cartItems);

  /** 할인전 가격 */
  const totalPrice = 0;

  // for문으로 cartItems( = carts )에 있는 상품들 가격 더하기
  for (let i = 0; i < cartItems.length; i++) {
    (function () {
      let currentProduct;

      for (let j = 0; j < PRODUCTS.length; j++) {
        if (PRODUCTS[j].id === cartItems[i].id) {
          currentProduct = PRODUCTS[j];
          break;
        }
      }

      /** 개수 */
      const q = parseInt(cartItems[i].querySelector('span').textContent.split('x ')[1]);

      /** 상품 * 개수의 가격 originalPrice? basePrice? */
      const itemTot = currentProduct.val * q;

      /** 할인율 todo - 상수변수로 분리 */
      let disc = 0;

      // 장바구니에 담긴 상품 총 개수
      quantity += q;
      // 총 상품의 가격 ( 할인전 )
      totalPrice += itemTot;

      // 상품별 10개이상일 경우 할인률 조건문
      if (q >= 10) {
        if (currentProduct.id === 'p1') disc = 0.1;
        else if (currentProduct.id === 'p2') disc = 0.15;
        else if (currentProduct.id === 'p3') disc = 0.2;
        else if (currentProduct.id === 'p4') disc = 0.05;
        else if (currentProduct.id === 'p5') disc = 0.25;
      }
      // 상품별 할인 적용된 가격
      price += itemTot * (1 - disc);
    })();
  }
  let discountRate = 0;

  // todo : early return으로 수정
  // 장바구니 추가 30개 이상일 경우 적용할인가
  if (quantity >= 30) {
    /** 대량 구매시 할인률 */
    const bulkDiscount = price * 0.25;

    /**  */
    const productDiscount = totalPrice - price;

    if (bulkDiscount > productDiscount) {
      price = totalPrice * (1 - 0.25);
      discountRate = 0.25;
    } else {
      discountRate = (totalPrice - price) / totalPrice;
    }
  } else {
    discountRate = (totalPrice - price) / totalPrice;
  }

  // todo troubleshooting : 화요일일때 에러 발생
  // 화요일 할인 적용함수
  if (new Date().getDay() === 2) {
    price *= 1 - 0.1;
    discountRate = Math.max(discountRate, 0.1);
  }
  // 총 할인가 적용된 금액 출력
  sum.textContent = '총액: ' + Math.round(price) + '원';

  // 할인가 ui
  if (discountRate > 0) {
    const span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = '(' + (discountRate * 100).toFixed(1) + '% 할인 적용)';

    sum.appendChild(span);
  }

  updatestocksWrapper();
  expectedPointsComponent();
}

/** 보너스 포인트 함수 */
const expectedPointsComponent = () => {
  const bonusPoint = Math.floor(price / 1000);
  const $expectedPoints = document.getElementById('loyalty-points');
  if (!$expectedPoints) {
    $expectedPoints = document.createElement('span');
    $expectedPoints.id = 'loyalty-points';
    $expectedPoints.className = 'text-blue-500 ml-2';
    sum.appendChild($expectedPoints);
  }
  $expectedPoints.textContent = '(포인트: ' + bonusPoint + ')';
};

/** 재고 업데이트 함수 */
function updatestocksWrapper() {
  let message = '';
  PRODUCTS.forEach(function (item) {
    if (item.q < 5) {
      message +=
        item.name + ': ' + (item.q > 0 ? '재고 부족 (' + item.q + '개 남음)' : '품절') + '\n';
    }
  });
  $stocksWrapper.textContent = message;
}

main();

// 장바구니 추가 버튼 클릭 이벤트
$addCartBtn.addEventListener('click', function () {
  // 선택된 옵션
  const selectedItem = $selectBox.value;
  const currentAddedItem = PRODUCTS.find(function (p) {
    return p.id === selectedItem;
  });

  // todo : 장바구니에 추가되어있는 경우와 중복 로직
  if (currentAddedItem && currentAddedItem.quantity > 0) {
    const item = document.getElementById(currentAddedItem.id);

    if (item) {
      const newQuantity = parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;
      // 가격 * 업데이트된 수량
      if (newQuantity <= currentAddedItem.quantity) {
        item.querySelector('span').textContent =
          currentAddedItem.name + ' - ' + currentAddedItem.val + '원 x ' + newQuantity;
        currentAddedItem.quantity--;
      } else {
        // todo : 재고 계산해서 부족할 경우 alert로 출력하는 함수 만들기
        alert('재고가 부족합니다.');
      }
    } else {
      // 새로운 장바구니 항목 추가
      const newItem = document.createElement('div');
      newItem.id = currentAddedItem.id;
      newItem.className = 'flex justify-between items-center mb-2';

      // cartItem - ui
      newItem.innerHTML =
        '<span>' +
        currentAddedItem.name +
        ' - ' +
        currentAddedItem.val +
        '원 x 1</span><div>' +
        '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
        currentAddedItem.id +
        '" data-change="-1">-</button>' +
        '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
        currentAddedItem.id +
        '" data-change="1">+</button>' +
        '<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' +
        currentAddedItem.id +
        '">삭제</button></div>';
      $cartsWrapper.appendChild(newItem);
      currentAddedItem.quantity--;
    }

    // 총 가격 계산
    calcCart();
    // 마지막 담은 상품 업데이트
    lastAddedItem = selectedItem;
  }
});

// 장바구니 수량 변경 및 삭제 클릭 이벤트
$cartsWrapper.addEventListener('click', function (e) {
  const target = e.target;

  // className에 quantity-change이 포함된 경우
  if (target.classList.contains('quantity-change') || target.classList.contains('remove-item')) {
    // 장바구니 내역 삭제
    const id = target.dataset.productId;
    const $tagetItem = document.getElementById(id);

    const product = PRODUCTS.find(function (p) {
      return p.id === id;
    });

    // 장바구니에 담긴 quantity값을 가져옴
    if (target.classList.contains('quantity-change')) {
      console.log(target.dataset.change);
      const quantityChange = parseInt(target.dataset.change);
      const newQuantity =
        parseInt($tagetItem.querySelector('span').textContent.split('x ')[1]) + quantityChange;

      // 재고 눌린 버튼에 따라 quantity 수량 변경
      if (
        newQuantity > 0 &&
        newQuantity <=
          product.quantity + parseInt($tagetItem.querySelector('span').textContent.split('x ')[1])
      ) {
        $tagetItem.querySelector('span').textContent =
          $tagetItem.querySelector('span').textContent.split('x ')[0] + 'x ' + newQuantity;
        product.quantity -= quantityChange;
      } else if (newQuantity <= 0) {
        $tagetItem.remove();
        product.quantity -= quantityChange;
      } else {
        // 재고가 부족하면 alert 실행
        alert('재고가 부족합니다.');
      }
    } else if (target.classList.contains('remove-item')) {
      // remove-item이면 삭제
      const remQty = parseInt($tagetItem.querySelector('span').textContent.split('x ')[1]);
      product.quantity += remQty;
      $tagetItem.remove();
    }
    calcCart();
  }
});
