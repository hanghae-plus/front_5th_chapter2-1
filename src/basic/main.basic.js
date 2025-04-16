// 상수 정의
const DISCOUNT_RATES = {
  p1: 0.1,    // 상품1 10% 할인
  p2: 0.15,   // 상품2 15% 할인
  p3: 0.2,    // 상품3 20% 할인
  p4: 0.05,   // 상품4 5% 할인
  p5: 0.25,   // 상품5 25% 할인
};

const BULK_DISCOUNT_RATE = 0.25;
const BULK_QUANTITY_THRESHOLD = 30;
const TUESDAY_DISCOUNT_RATE = 0.1;
const FLASH_SALE_DISCOUNT_RATE = 0.2;
const RECOMMENDED_DISCOUNT_RATE = 0.05;
const POINT_PER_1000_WON = 1;

// 상품 데이터
const PRODUCTS = [
  { id: 'p1', name: '상품1', price: 10000, stock: 50 },
  { id: 'p2', name: '상품2', price: 20000, stock: 30 },
  { id: 'p3', name: '상품3', price: 30000, stock: 20 },
  { id: 'p4', name: '상품4', price: 15000, stock: 0 },
  { id: 'p5', name: '상품5', price: 25000, stock: 10 }
];

// DOM 관련 상태
let productSelect;
let addButton;
let cartList;
let totalDisplay;
let stockInfiDisplay;

// 장바구니 관련 상태
let lastSelectedProduct = null;
let loyaltyPoints = 0;
let totalAmount = 0;
let titalItemCount = 0;

/*
* 문자열 템플릿을 DOM 요소로 변환하는 함수
* @param {string}
* @param {string}
* @return {HTMLElement}
* */
function createElementFromTemplate(template, children = '') {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = template.replace('{{__Children__}}', children || '');
  // TODO: 왜 firstChild 만 반환하는지 알아보기
  return tempDiv.firstChild;
}

/*
* 앱 초기화 함수
* */
function initApp() {
  const root = document.getElementById('app');

//   템플릿 정의
  const containerTemplate = "<div class='bg-gray-100 p-8'>{{__Children__}}</div>";
  const wrapperTemplate = "<div class='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8'>{{__Children__}}</div>";
  const titleTemplate = "<h1 class='text-2xl font-bold mb-4'>장바구니</h1>";
  const cartListTemplate = "<ul id='cart-items'>{{__Children__}}</ul>";
  const totalTemplate = "<div id='cart-total' class='text-xl font-bold my-4'>{{__Children__}}</div>";
  const productSelectTemplate = "<select id='product-select' class='border rounded p-2 mr-2'>{{__Children__}}</select>";
  const addBtnTemplate = "<button id='add-to-cart' class='bg-blue-500 text-white px-4 py-2 rounded'>추가</button>"
  const stockInfoTemplate = "<div id='stock-status' class='text-sm text-gray-500 mt-2'>{{__Children__}}</div>";

//   자식 요소부터 순서대로 생성
  const title = createElementFromTemplate(titleTemplate);
  cartList = createElementFromTemplate(cartListTemplate);
  totalDisplay = createElementFromTemplate(totalTemplate);

//   상품 선택 드롭다운 생성 및 옵션 추가
  productSelect = createElementFromTemplate(productSelectTemplate);
  updateProductOptions();

  addButton = createElementFromTemplate(addBtnTemplate);
  stockInfoDisplay = createElementFromTemplate(stockInfoTemplate);

//   요소 조합
  const wrapper = createElementFromTemplate(wrapperTemplate);
  wrapper.appendChild(title);
  wrapper.appendChild(cartList);
  wrapper.appendChild(totalDisplay);
  wrapper.appendChild(productSelect);
  wrapper.appendChild(addButton);
  wrapper.appendChild(stockInfoDisplay);

  const container = createElementFromTemplate(containerTemplate);
  container.appendChild(wrapper);

//   루트에 추가
  root.appendChild(container);

//   초기 상태 계산
  updateCart();

//   이벤트 리스너 등록
  registerEventListeners();

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

    totalITemCount += quantity;
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
* @param {number}
* @param {number}
* @param {number}
* @return {number}
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
* @return {boolean}
* */
function isTuesday() {
  return new Date().getDay() === 2;
}

/*
* 총액 표시 업데이트 함수
* @param {number}
* */
function updateTotalDisplay(discountRate) {
  totalDisplay.textContent = `총액: ${Math.round(totalAmount)}원`;

//   할인율 표시
  if (discountRate > 0) {
    const discountSpan = document.createElement('span');
    discountSpan.className = 'text-green-500 ml-2';
    discountSpan.textContent = `(${(discountRate * 100).toFixed(1)}% 할인 적용)`;
    totalDisplay.appendChild(discountSpan);
  }
}

/*
* 포인트 업데이트 함수
* */
function updateLoyaltyPoints() {
  loyaltyPoints = Math.floor((totalAmount / 1000) * POINT_PER_1000_WON);

  let pointsTag = document.getElementById('loyalty-points');
  if (!pointsTag) {
    pointsTag = document.createElement('span');
    pointsTag.id = 'loyalty-points';
    pointsTag.className = 'text-blue-500 ml-2';
    totalDisplay.appendChild(pointsTag);
  }

  pointTag.textContent = `(포인트: ${loyaltyPoints})`;
}

/*
* 재고 정보 업데이트 함수
* */
function updateStockInfo() {
  let infoText = '';

  PRODUCTS.forEach(product => {
    if (product.stock < 5) {
      infoText += `${product.name}L ${
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
* @param {string}
* @return {Object|null}
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
    const currQuantity = parseInt(existingItem.querySelector('span').textContext.split('x '[1]));
    const newQuantity = currQuantity + 1;

    if (newQuantity <= product.stock + currQuantity) {
      existingItem.querySelector('span').textContent = `${product.name} - ${product.price}원 x ${newQuantity}`;
      product.stock--;
    } else {
      alert('재고가 부족합니다.');
    }
  } else {
    //   새 아이템 추가
    const newItem = document.createElement('li');
    newItem.id = product.id;
    newItem.className = 'flex justify-between items-center mb-2';
    newItem.innerHTML = `
      <span>${product.name} - ${product.price}원 x 1</span>
      <div>
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${product.id}" data-change="-1">-</button>
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${product.id}" data-change="1">+</button>
        <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${product.id}">삭제</button>
      </div>
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
* @param {string}
* @return {number}
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
* @param {string}
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
* @param {Event}
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

document.addEventListener('DOMContentLoaded', initApp);


// function main() {
//
//   const root = document.getElementById("app");
//   const cont = "<div class='bg-gray-100 p-8'>{{__Children__}}</div>";
//   const elWrap = "<div class='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8'>{{__Children__}}</div>";
//   const elTitle = "<h1 class='text-2xl font-bold mb-4'>장바구니</h1>";
//   const elCart = "<ul id='cart-items'>{{__Children__}}</ul>";
//   const sum = "<div id='cart-total' class='text-xl font-bold my-4'>{{__Children__}}</div>";
//   const product_list = "<select id='product-select' class='border rounded p-2 mr-2'>{{__Children__}}</select>";
//   const addBtn = "<button id='add-to-cart' class='bg-blue-500 text-white px-4 py-2 rounded'>추가</button>"
//   const stockInfo = "<div id='stock-status' class='text-sm text-gray-500 mt-2'>{{__Children__}}</div>";
//
//   // updateSelOpts();
//   updateProductList();
//
//   elWrap.appendChild(elTitle);
//   elWrap.appendChild(elCart);
//   elWrap.appendChild(sum);
//   elWrap.appendChild(product_list);
//   elWrap.appendChild(addBtn);
//   elWrap.appendChild(stockInfo);
//   cont.appendChild(elWrap);
//   root.appendChild(cont);
//
//   calcCart();
//
//   setTimeout(() => {
//     setInterval(() => {
//       const luckyItem = PRODUCTSINFO[Math.floor(Math.random() * Object.keys(PRODUCTSINFO).length)];
//       if (Math.random() < 0.3 && luckyItem.stock > 0) {
//         luckyItem.price = Math.round(luckyItem.price * 0.8);
//         alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);
//         updateSelOpts();
//       }
//     }, 30000);
//   }, Math.random() * 10000);
//
//   setTimeout(() => {
//     setInterval(() => {
//       if (lastSel) {
//         var suggest = productList.find((item) => item.id !== lastSel && item.stock > 0);
//         if (suggest) {
//           alert(`${suggest.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
//           suggest.price = Math.round(suggest.price * 0.95);
//           updateSelOpts();
//         }
//       }
//     }, 60000);
//   }, Math.random() * 20000);
//
//
// }
//
// function updateProductList() {
//   product_list.innerHTML = "";
//   productList.forEach((item) => {
//     var opt = document.createElement("option");
//     opt.value = item.id;
//     opt.textContent = `${item.name} - ${item.price}원`;
//     if (item.stock === 0) opt.disabled = true;
//     product_list.appendChild(opt);
//   });
// }
//
// function calcCart() {
//   totalAmt = 0;
//   itemCnt = 0;
//   var cartItems = elCart.children;
//   var subTot = 0;
//   for (var i = 0; i < cartItems.length; i++) {
//     (function() {
//       var curItem;
//       for (var j = 0; j < productList.length; j++) {
//         if (productList[j].id === cartItems[i].id) {
//           curItem = productList[j];
//           break;
//         }
//       }
//       var q = parseInt(cartItems[i].querySelector("span").textContent.split("x ")[1]);
//       var itemTot = curItem.price * q;
//       var disc = 0;
//       itemCnt += q;
//       subTot += itemTot;
//       if (q >= 10) {
//         if (curItem.id === "p1") disc = 0.1; else if (curItem.id === "p2") disc = 0.15; else if (curItem.id === "p3") disc = 0.2; else if (curItem.id === "p4") disc = 0.05; else if (curItem.id === "p5") disc = 0.25;
//       }
//       totalAmt += itemTot * (1 - disc);
//     }());
//   }
//   let discRate = 0;
//   if (itemCnt >= 30) {
//     var bulkDisc = totalAmt * 0.25;
//     var itemDisc = subTot - totalAmt;
//     if (bulkDisc > itemDisc) {
//       totalAmt = subTot * (1 - 0.25);
//       discRate = 0.25;
//     } else {
//       discRate = (subTot - totalAmt) / subTot;
//     }
//   } else {
//     discRate = (subTot - totalAmt) / subTot;
//   }
//   if (new Date().getDay() === 2) {
//     totalAmt *= (1 - 0.1);
//     discRate = Math.max(discRate, 0.1);
//   }
//   sum.textContent = `총액: ${Math.round(totalAmt)}원`;
//   if (discRate > 0) {
//     var span = document.createElement("span");
//     span.className = "text-green-500 ml-2";
//     span.textContent = `(${(discRate * 100).toFixed(1)}% 할인 적용)`;
//     sum.appendChild(span);
//   }
//   updateStockInfo();
//   renderBonusPts();
// }
//
// const renderBonusPts = () => {
//   bonusPts = Math.floor(totalAmt / 1000);
//   var ptsTag = document.getElementById("loyalty-points");
//   if (!ptsTag) {
//     ptsTag = document.createElement("span");
//     ptsTag.id = "loyalty-points";
//     ptsTag.className = "text-blue-500 ml-2";
//     sum.appendChild(ptsTag);
//   }
//   ptsTag.textContent = `(포인트: ${bonusPts})`;
// };
//
// function updateStockInfo() {
//   var infoMsg = "";
//   productList.forEach((item) => {
//     if (item.stock < 5) {
//       infoMsg += `${item.name}: ${item.stock > 0 ? `재고 부족 (${item.stock}개 남음)` : "품절"}\n`;
//     }
//   });
//   stockInfo.textContent = infoMsg;
// }
//
// main();
//
// addBtn.addEventListener("click", () => {
//   var selItem = product_list.value;
//   var itemToAdd = productList.find((p) => p.id === selItem);
//   if (itemToAdd && itemToAdd.stock > 0) {
//     var item = document.getElementById(itemToAdd.id);
//     if (item) {
//       var newQty = parseInt(item.querySelector("span").textContent.split("x ")[1]) + 1;
//       if (newQty <= itemToAdd.stock) {
//         item.querySelector("span").textContent = `${itemToAdd.name} - ${itemToAdd.price}원 x ${newQty}`;
//         itemToAdd.stock--;
//       } else {
//         alert("재고가 부족합니다.");
//       }
//     } else {
//       var newItem = document.createElement("div");
//       newItem.id = itemToAdd.id;
//       newItem.className = "flex justify-between items-center mb-2";
//       newItem.innerHTML = `<li>${itemToAdd.name} - ${itemToAdd.price}원 x 1</li><div>` + `<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="-1">-</button>` + `<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="1">+</button>` + `<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${itemToAdd.id}">삭제</button></div>`;
//       elCart.appendChild(newItem);
//       itemToAdd.stock--;
//     }
//     calcCart();
//     lastSel = selItem;
//   }
// });
//
// elCart.addEventListener("click", (event) => {
//   var tgt = event.target;
//   if (tgt.classList.contains("quantity-change") || tgt.classList.contains("remove-item")) {
//     var prodId = tgt.dataset.productId;
//     var itemElem = document.getElementById(prodId);
//     var prod = productList.find((p) => p.id === prodId);
//     if (tgt.classList.contains("quantity-change")) {
//       var qtyChange = parseInt(tgt.dataset.change);
//       var newQty = parseInt(itemElem.querySelector("span").textContent.split("x ")[1]) + qtyChange;
//       if (newQty > 0 && newQty <= prod.stock + parseInt(itemElem.querySelector("span").textContent.split("x ")[1])) {
//         itemElem.querySelector("span").textContent = `${itemElem.querySelector("span").textContent.split("x ")[0]}x ${newQty}`;
//         prod.stock -= qtyChange;
//       } else if (newQty <= 0) {
//         itemElem.remove();
//         prod.stock -= qtyChange;
//       } else {
//         alert("재고가 부족합니다.");
//       }
//     } else if (tgt.classList.contains("remove-item")) {
//       var remQty = parseInt(itemElem.querySelector("span").textContent.split("x ")[1]);
//       prod.stock += remQty;
//       itemElem.remove();
//     }
//     calcCart();
//   }
// });
