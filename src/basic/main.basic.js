import { initPromotionService, on, off } from './services/promotion-service.js';
import { updateProductOptions, handleFlashSale, handleRecommendedProduct } from './components/product.js';

// 프로모션 이벤트 초기화 함수
function initPromotions(products, lastSelectedPromotionRef) {
//   이벤트 핸들러 등록 - 번개세일
  on('flashSale', (event) => {
    handleFlashSale(event, () => updateProductOptions(productSelect, products));
  });

//   이벤트 핸들러 등록 - 추천 상품
  on('recommendedProduct', (event) => {
    handleRecommendedProduct(event, () => updateProductOptions(productSelect, products));
  });

//   프로모션 서비스 초기화
  const cleanupPromotion = initPromotionService(products, lastSelectedProductRef);

//   정리 함수 반환
  return () => {
  //   이벤트 리스너 해제
    off('flashSale', handleFlashSale);
    off('recommendedProduct', handleRecommendedProduct);

  //   서비스 정리
    cleanupPromotion();
  };
}


// DOM 관련 상태
let productSelect;
let addButton;
let cartList;
let totalDisplay;
let stockInfoDisplay;

// 장바구니 관련 상태
let lastSelectedProduct = null;
let loyaltyPoints = 0;
let totalAmount = 0;
let totalItemCount = 0;




/*
* 앱 초기화 함수
* */
function initApp() {
  const root = document.getElementById('app');

  /*
  * Template 방식 > 테스트 시 요소가 null 발생
  * */
// //   템플릿 정의
//   const containerTemplate = "<div class='bg-gray-100 p-8'></div>";
//   const wrapperTemplate = "<div class='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8'></div>";
//   const titleTemplate = "<h1 class='text-2xl font-bold mb-4'>장바구니</h1>";
//   const cartListTemplate = "<ul id='cart-items'></ul>";
//   const totalTemplate = "<div id='cart-total' class='text-xl font-bold my-4'></div>";
//   const productSelectTemplate = "<select id='product-select' class='border rounded p-2 mr-2'></select>";
//   const addBtnTemplate = "<button id='add-to-cart' class='bg-blue-500 text-white px-4 py-2 rounded'>추가</button>"
//   const stockInfoTemplate = "<div id='stock-status' class='text-sm text-gray-500 mt-2'></div>";
//
// //   자식 요소부터 순서대로 생성
//   const title = createElementFromTemplate(titleTemplate);
//   cartList = createElementFromTemplate(cartListTemplate);
//   totalDisplay = createElementFromTemplate(totalTemplate);
//
// //   상품 선택 드롭다운 생성 및 옵션 추가
//   productSelect = createElementFromTemplate(productSelectTemplate);
//   updateProductOptions();
//
//   addButton = createElementFromTemplate(addBtnTemplate);
//   stockInfoDisplay = createElementFromTemplate(stockInfoTemplate);
//
// //   요소 조합
//   const wrapper = createElementFromTemplate(wrapperTemplate);
//   wrapper.appendChild(title);
//   wrapper.appendChild(cartList);
//   wrapper.appendChild(totalDisplay);
//   wrapper.appendChild(productSelect);
//   wrapper.appendChild(addButton);
//   wrapper.appendChild(stockInfoDisplay);
//
//   const container = createElementFromTemplate(containerTemplate);

  // 요소 생성
  const title = html`<h1 class="text-2xl font-bold mb-4">장바구니</h1>`;
  cartList = html`<ul id="cart-items"></ul>`;
  totalDisplay = html`<div id="cart-total" class="text-xl font-bold my-4"></div>`;

  // 상품 선택 드롭다운 생성
  productSelect = html`<select id="product-select" class="border rounded p-2 mr-2"></select>`;
  updateProductOptions();

  addButton = html`<button id="add-to-cart" class="bg-blue-500 text-white px-4 py-2 rounded">추가</button>`;
  stockInfoDisplay = html`<div id="stock-status" class="text-sm text-gray-500 mt-2"></div>`;

  // 요소 조합
  const wrapper = html`<div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8"></div>`;
  appendChildren(wrapper, title, cartList, totalDisplay, productSelect, addButton, stockInfoDisplay);

  const container = html`<div class="bg-gray-100 p-8"></div>`;
  appendChildren(container, wrapper);

  container.appendChild(wrapper);

//   루트에 추가
  root.appendChild(container);

//   초기 상태 계산
  updateCart();

//   이벤트 리스너 등록
  regEventListeners();

//   프로모션 이벤트 초기화
  initPromotions();
}

/*
* 상품 옵션 업데이트 함수
* */
function updateProductOptions() {
  productSelect.innerHTML = '';

  PRODUCTS.forEach(product => {
    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = `${product.name} - ${product.price}원`;
    option.disabled = product.stock === 0;
    productSelect.appendChild(option);
  });
}

/*
* 장바구니 계산 함수
* */
function updateCart() {
  totalAmount = 0;
  totalItemCount = 0;
  let subtotal = 0;

//   장바구니 아이템 순회
  Array.from(cartList.children).forEach(cartItem => {
    const product = findProductById(cartItem.id);
    if (!product) return;

    const quantity = parseInt(cartItem.querySelector('span').textContent.split('x ')[1]);
    const itemTotal = product.price * quantity;
    let discount = 0;

    totalItemCount += quantity;
    subtotal += itemTotal;

    //   개별 상품 할인 적용
    if (quantity >= 10) {
      discount = DISCOUNT_RATES[product.id] || 0;
    }
    totalAmount += itemTotal * (1 - discount);
  });

//   대량 구매 할인 적용
  let discountRate = calcDiscountRate(subtotal, totalAmount, totalItemCount);

//   화요일 할인 적용
  if (isTuesday()) {
    totalAmount *= (1 - TUESDAY_DISCOUNT_RATE);
    discountRate = Math.max(discountRate, TUESDAY_DISCOUNT_RATE);
  }

//   금액 표시 업데이트
  updateTotalDisplay(discountRate);

//   재고 정보 업데이트
  updateStockInfo();

//   포인트 업데이트
  updateLoyaltyPoints();
}

/*
* 할인율 계산 함수
* */
function calcDiscountRate(subtotal, totalWithItemDiscount, itemCount) {
  let discountRate = 0;

//   이미 적용된 상품별 할인율 계산
  const itemDiscountTotal = subtotal - totalWithItemDiscount;
  const currDiscountRate = itemDiscountTotal / subtotal || 0;

//   대량 구매 할인 적용 여부 확인
  if (itemCount >= BULK_QUANTITY_THRESHOLD) {
    const bulkDiscount = totalWithItemDiscount * BULK_QUANTITY_THRESHOLD;

  //   더 큰 할인율 적용
    if (bulkDiscount > itemDiscountTotal) {
      totalAmount = subtotal * (1 - BULK_QUANTITY_THRESHOLD);
      discountRate = BULK_DISCOUNT_RATE;
    } else {
      discountRate = currDiscountRate;
    }
  } else {
    discountRate = currDiscountRate;
  }

  return discountRate;
}

/*
* 화요일인지 확인하는 함수
* */
function isTuesday() {
  return new Date().getDay() === 2;
}

/*
* 총액 표시 업데이트 함수
* */
function updateTotalDisplay(discountRate) {
  totalDisplay.textContent = `총액: ${Math.round(totalAmount)}원`;

//   할인율 표시
  if (discountRate > 0) {
    const discountSpan = html`
      <span class="text-green-500 ml-2">(${(discountRate * 100).toFixed(1)}% 할인 적용)</span>
    `;
    totalDisplay.appendChild(discountSpan);
  }
}

/*
* 포인트 업데이트 함수
* */
function updateLoyaltyPoints() {
  loyaltyPoints = Math.floor(totalAmount * POINT_PER_1000_WON);

  let pointsTag = document.getElementById('loyalty-points');
  if (!pointsTag) {
    pointsTag = html`
      <span id="loyalty-points" class="text-blue-500 ml-2"></span>
    `;
    totalDisplay.appendChild(pointsTag);
  }

  pointsTag.textContent = `(포인트: ${loyaltyPoints})`;
}

/*
* 재고 정보 업데이트 함수
* */
function updateStockInfo() {
  let infoText = '';

  PRODUCTS.forEach(product => {
    if (product.stock < 5) {
      infoText += `${product.name}: ${
        product.stock > 0
          ? `재고 부족 (${product.stock}개 남음`
          : '품절'
      }\n`;
    }
  });

  stockInfoDisplay.textContent = infoText;
}

/*
* ID로 상품 찾기
* */
function findProductById(id) {
  return PRODUCTS.find(product => product.id === id);
}

/*
* 장바구니에 상품 추가 함수
* */
function addProductToCart() {
  const selectedProductId = productSelect.value;
  const product = findProductById(selectedProductId);

  if (!product || product.stock <= 0) return;

//   이미 장바구니에 있는 경우 수량 증가
  const existingItem = document.getElementById(product.id);

  if (existingItem) {
    const currQuantity = parseInt(existingItem.querySelector('span').textContent.split('x ')[1]);
    const newQuantity = currQuantity + 1;

    if (newQuantity <= product.stock + currQuantity) {
      existingItem.querySelector('span').textContent = `${product.name} - ${product.price}원 x ${newQuantity}`;
      product.stock--;
    } else {
      alert('재고가 부족합니다.');
    }
  } else {
    //   새 아이템 추가
    const newItem = html`
      <li id="${product.id}" class="flex justify-between items-center mb-2">
        <span>${product.name} - ${product.price}원 x 1</span>
        <div>
          <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${product.id}" data-change="-1">-</button>
          <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${product.id}" data-change="1">+</button>
          <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${product.id}">삭제</button>
        </div>
      </li>
    `;
    cartList.appendChild(newItem);
    product.stock--;
  }

  lastSelectedProduct = selectedProductId;
  updateCart();
  updateProductOptions();
}

/*
* 수랑 변경 처리 함수
* */
function changeQuantity(productId, changeAmount) {
  const itemElement = document.getElementById(productId);
  const product = findProductById(productId);

  if (!itemElement || !product) return;

  const currQuantity = parseInt(itemElement.querySelector('span').textContent.split('x ')[1]);
  const newQuantity = currQuantity + changeAmount;

//   수량이 0 이하면 아이템 제거
  if (newQuantity <= 0) {
    removeCartItem(productId);
    return;
  }

//   재고 확인
  if (changeAmount > 0 && newQuantity > currQuantity + product.stock) {
    alert('재고가 부족합니다.');
    return;
  }

//   수량 업데이트
  itemElement.querySelector('span').textContent =
    `${itemElement.querySelector('span').textContent.split('x ')[0]}x ${newQuantity}`;

//   재고 업데이트
  product.stock  -= changeAmount;

  updateCart();
  updateProductOptions();
}

/*
* 장바구니에서 상품 제거 함수
* */
function removeCartItem(productId) {
  const itemElement = document.getElementById(productId);
  const product = findProductById(productId);

  if (!itemElement || !product) return;

//   현재 수량 확인
  const currQuantity = parseInt(itemElement.querySelector('span').textContent.split('x ')[1]);

//   재고 복구
  product.stock += currQuantity;

//   아이템 제거
  itemElement.remove();

  updateCart();
  updateProductOptions();
}

/*
* 장바구니 이벤트 처리 함수
* */
function handleCartAction(event) {
  const target = event.target;
  const productId = target?.dataset?.productId || '';

  if (!productId) return;

  if (target.classList.contains('quantity-change')) {
    const change = parseInt(target.dataset.change);
    changeQuantity(productId, change);;
  } else if (target.classList.contains('remove-item')) {
    removeCartItem(productId);
  }
}

/*
* 이벤트 리스너 등록 함수
* */
function regEventListeners() {
  addButton.addEventListener('click', addProductToCart);
  cartList.addEventListener('click', handleCartAction);
}

/*
* 프로모션 초기화 함수
* */
function initPromotions() {
//   번개 세일 프로모션
  setTimeout(() => {
    setInterval(() => {
      const randomIndex = Math.floor(Math.random() * PRODUCTS.length);
      const luckyItem = PRODUCTS[randomIndex];

      if (Math.random() < 0.3 && luckyItem.stock > 0) {
        luckyItem.price = Math.round(luckyItem.price * (1 - FLASH_SALE_DISCOUNT_RATE));
        alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);
        updateProductOptions();
      }
    }, 30000);
  }, Math.random() * 10000);

//   추천 상품 프로모션
  setTimeout(() => {
    setInterval(() => {
      if (lastSelectedProduct) {
        const suggest = PRODUCTS.find(
          item => item.id !== lastSelectedProduct && item.stock > 0
        );

        if (suggest) {
          alert(`${suggest.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
          suggest.price = Math.round(suggest.price * (1 - RECOMMENDED_DISCOUNT_RATE));
          updateProductOptions();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
}

initApp();

/*
* 왜 이 부분이 await loadFile(); 이후 동작하지 않았는지 알아보기!
* 일단 loadFile() 의 기준이 html 파일인 것 같고,
* DOMContentLoaded 이벤트는 index.html 파일이 로드 된 이후 동작하게 지연하는거라
* null 이 발생한 것 같음.
* */
// document.addEventListener('DOMContentLoaded', initApp);