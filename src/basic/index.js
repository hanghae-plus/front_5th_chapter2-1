/**
 * todo
 * -[v] 초기 createElement된 요소들은 template으로 관리
 * -[v] 만들 수 있는 부분은 component로 만들기 -> 진행중
 * -[v] 장바구니 같은 아이디값 여러개 렌더링 되는 문제
 * -[v] 재고 확인하는 함수
 * -[v] 재고 확인하고 재고량에 맞춰서 업데이트하기 -> 재고가 부족합니다.
 * -[v] totalPrice 소수점 맞추기
 * -[v] 재고 상태 ( = stocksState ) 확인하는 ui 컴포넌트 만들기
 * -[ ] 시간별 랜덤 상품 할인 alert
 * -[ ] 최근 장바구니에 담은 상품 할인 alert
 * -[ ] alert뜬 값 기반으로 options에 products 가격도 업데이트 되어야함.
 * -[ ] 로컬 스토리지에 products도 저장해버리기
 * -[ ] 화요일 할인 분기 수정하기
 *
 * -[ ] Store 필요
 *
 *
 *
 * - 필요한 상태값
 *  - 최근 담긴 상품 : lastAddedItem? lastAddedItemected?
 *  - 특가 적용된 상품
 *  - 특가 적용된 새로운 option 상태
 *  - 장바구니 목록
 *  - 총 가격
 *  - 총 할인률
 */

import {
  getCarts,
  getStorageItem,
  setStorageItem,
  updateQuantity,
  updateCarts,
  deleteCart,
  PRODUCTS,
} from './services/cartsService';

let lastAddedItem = null;

const App = () => {
  const root = document.getElementById('app');

  const carts = getCarts();

  const { finalPrice, appliedDiscountRate, rewardPoints } = calculateCartTotal();
  const outOfStocks = PRODUCTS.filter((v) => v.stock === 0 || v.stock < 5);

  const template = () => /* html */ `
    <div id="container" class="bg-gray-100 p-8">
      <div id="wrapper" class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 id="title" class="text-2xl font-bold mb-4">장바구니</h1>
        <div id="cart-items"> 
        ${carts.map(CartItem).join('')}
        </div>
        <div id="total-price-wrapper">
        ${totalPrice({ finalPrice, appliedDiscountRate, rewardPoints })}
        </div>
        <div id="products-wrapper" >
          <select id="product-select" class="border rounded p-2 mr-2">
          ${PRODUCTS.map(Options).join('')}
          </select>
        <button id="add-to-cart" class="bg-blue-500 text-white px-4 py-2 rounded">추가</button>
        </div>
        <div id="stock-state" class="flex flex-col text-sm text-gray-500 mt-2 fx">
        ${outOfStocks.map(StockList).join('')}
        </div>
    </div>
  `;

  root.innerHTML = template();

  const $addToCartBtn = document.querySelector('#add-to-cart');
  $addToCartBtn.addEventListener('click', handleAddCartItem);
  const $updatedQuantityBtn = document.querySelector('#cart-items');
  $updatedQuantityBtn.addEventListener('click', handleUpdateCartItem);

  const $cartsWrapper = document.querySelector('#cart-items');
  $cartsWrapper.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item')) {
      handleDeleteCartItem(e);
    }
  });

  // // 광고 alert
  // setTimeout(() => {
  //   setInterval(() => {
  //     // 랜덤으로 특가 상품 alert 실행
  //     const luckyItem = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
  //     if (Math.random() < 0.3 && luckyItem.quantity > 0) {
  //       luckyItem.val = Math.round(luckyItem.val * 0.8);
  //       alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');

  //       // 특가 적용된 select-option으로 변경
  //       Options();
  //     }
  //   }, 30000);
  // }, Math.random() * 10000);

  // setTimeout(() => {
  //   setInterval(() => {
  //     // 마지막으로 구매한 상품 cta alert 실행
  //     if (lastAddedItem) {
  //       const suggest = PRODUCTS.find((item) => {
  //         return item.id !== lastAddedItem && item.q > 0;
  //       });

  //       if (suggest) {
  //         alert(suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');

  //         // alert 띄운 상품의 select-option에 가격(=val) 수정
  //         suggest.val = Math.round(suggest.val * 0.95);
  //         Options();
  //       }
  //     }
  //   }, 60000);
  // }, Math.random() * 20000);
};

const Options = ({ id, name, price, stock }) => `
  <option id="${id}" ${stock === 0 ? 'disabled' : ''} value="${id}">${name} - ${price}원</option>
`;

/** 장바구니에 담긴 총 가격 계산 함수 */
function calculateCartTotal() {
  let totalQuantity = 0;
  /** 할인 전 총합 */
  let rawTotal = 0;
  /** 상품별 할인 적용 후 총합 */
  let discountedTotal = 0;

  const carts = getCarts();

  for (const cart of carts) {
    const product = PRODUCTS.find((p) => p.id === cart.id);
    if (!product) continue;

    const { price, discount = 0 } = product;
    const quantity = cart.quantity;

    const itemTotal = price * quantity;
    let itemDiscountRate = 0;

    // 상품 개별 할인 (10개 이상일 경우)
    if (quantity >= 10) {
      itemDiscountRate = discount;
    }

    const itemFinal = itemTotal * (1 - itemDiscountRate);

    totalQuantity += quantity;
    rawTotal += itemTotal;
    discountedTotal += itemFinal;
  }

  /** 계산된 총액 */
  let finalPrice = discountedTotal;
  /** 적용된 할인율 */
  let appliedDiscountRate = (rawTotal - discountedTotal) / rawTotal;

  // 대량 구매 할인 적용 여부
  if (totalQuantity >= 30) {
    /** 대량 구매 할인된 가격 */
    const bulkDiscountedPrice = rawTotal * (1 - 0.25); // 25% 할인
    /** 대량 구매 할인 금액 */
    const bulkDiscountAmount = rawTotal - bulkDiscountedPrice;
    /** 총 할인전 금액 - 할인된 금액 */
    const itemDiscountAmount = rawTotal - discountedTotal;

    if (bulkDiscountAmount > itemDiscountAmount) {
      finalPrice = bulkDiscountedPrice;
      appliedDiscountRate = 0.25;
    }
  }

  /** 적립 예정 포인트 */
  const rewardPoints = Math.floor(finalPrice / 1000);

  return {
    finalPrice: Math.round(finalPrice),
    appliedDiscountRate: isNaN(appliedDiscountRate) ? 0 : appliedDiscountRate,
    rawTotal: rawTotal,
    rewardPoints: rewardPoints,
  };
}

/** 총액 컴포넌트 ui */
function totalPrice({ finalPrice, appliedDiscountRate, rewardPoints }) {
  return /* html */ `
  <div id="cart-total" class="text-xl font-bold my-4">총액: ${finalPrice}원${
    appliedDiscountRate === 0
      ? ''
      : `<span class="text-green-500 ml-2">( ${(appliedDiscountRate * 100).toFixed(1)}% 할인 적용 )</span>`
  }<span id="loyalty-points" class="text-blue-500 ml-2">(포인트: ${rewardPoints})</span></div>`;
}
// // todo troubleshooting : 화요일일때 에러 발생
// // 화요일 할인 적용함수
// if (new Date().getDay() === 2) {
//   price *= 1 - 0.1;
//   discountRate = Math.max(discountRate, 0.1);
// }
// // 총 할인가 적용된 금액 출력
// // sum.textContent = '총액: ' + Math.round(price) + '원';

// // 할인가 ui
// if (discountRate > 0) {
//   const span = document.createElement('span');
//   span.className = 'text-green-500 ml-2';
//   span.textContent = '(' + (discountRate * 100).toFixed(1) + '% 할인 적용)';

//   sum.appendChild(span);
// }

// updatestocksWrapper();
// expectedPointsComponent();

/** 재고 업데이트 함수 */
function updatestocksWrapper() {
  let message = '';
  PRODUCTS.forEach((item) => {
    if (item.q < 5) {
      message +=
        item.name + ': ' + (item.q > 0 ? '재고 부족 (' + item.q + '개 남음)' : '품절') + '\n';
    }
  });
  $stocksWrapper.textContent = message;
}

/** 재고 확인 */
const StockList = ({ id, name, stock }) =>
  `<span id="${id}">
  ${name}: ${stock === 0 ? '품절' : `재고 부족 (${stock}개 남음)`}
</span>`;

/** 상품 추가 이벤트 핸들러 */
const handleAddCartItem = (e) => {
  e.preventDefault();
  if (e.target.id !== 'add-to-cart') return;
  try {
    const wrapper = e.target.closest('#products-wrapper');
    const selectBox = wrapper.querySelector('#product-select');
    const targetId = selectBox.value;

    const carts = getStorageItem('carts') || [];

    const isAlreadyInclude = carts.find((cart) => targetId === cart.id);
    const stockProduct = PRODUCTS.find((p) => p.id === targetId);

    let updateCarts = [];
    // 추가되는 로직 없으면 삼항연산자로 변경하기
    if (isAlreadyInclude) {
      if (isAlreadyInclude.quantity + 1 > stockProduct.stock) {
        alert('재고가 부족합니다.');
        return;
      }
      const { id, quantity } = isAlreadyInclude;
      updateCarts = carts.map((cart) =>
        cart.id === id ? { id: id, quantity: quantity + 1 } : cart,
      );
    } else {
      updateCarts = [...carts, { id: targetId, quantity: 1 }];
    }

    setStorageItem('carts', JSON.stringify(updateCarts));
    reRender();
  } catch (e) {
    console.error(e);
  }
};

/** 상품 삭제 이벤트 핸들러 */
const handleDeleteCartItem = (e) => {
  e.preventDefault();
  const targetId = e.target.closest('.cart').id;
  const carts = getStorageItem('carts') || [];
  const updateCarts = carts.filter((item) => item.id !== targetId);
  setStorageItem('carts', JSON.stringify(updateCarts));
  reRender();
};

/** 상품 수량 변경 이벤트 핸들러 */
const handleUpdateCartItem = (e) => {
  e.preventDefault();
  if (e.target.nodeName !== 'BUTTON') return;
  if (!e.target.classList.contains('quantity-change')) return;

  const carts = getStorageItem('carts') || [];
  const targetId = e.target.closest('.cart').id;

  const product = carts.find((cart) => cart.id === targetId);
  const stockProduct = PRODUCTS.find((p) => p.id === targetId);

  if (!product || !stockProduct) return;

  let updateCarts = [];

  const action = e.target.dataset.action;

  switch (action) {
    case 'add':
      if (product.quantity + 1 > stockProduct.stock) {
        alert('재고가 부족합니다.');
        return;
      }
      updateCarts = carts.map((item) =>
        item.id === targetId ? { ...item, quantity: item.quantity + 1 } : item,
      );
      break;
    case 'subtract':
      updateCarts = carts
        .map((item) => (item.id === targetId ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0);

      console.log(updateCarts);
      break;
    default:
      console.log('not found action');
      return;
  }

  setStorageItem('carts', JSON.stringify(updateCarts));
  reRender();
};

/** 장바구니 아이템 */
const CartItem = ({ id, name, price, quantity }) => `
  <div id="${id}" class="cart flex justify-between items-center mb-2" >
      <span>${name} - ${price}원 x ${quantity}</span>
      <div>
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-action="subtract" data-change="-1">-</button>
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-action="add" data-change="1">+</button>
        <button class="remove-item bg-red-500 text-white px-2 py-1 rounded mr-1">삭제</button>
      </div>
  </div>
`;

const renderCarts = () => {
  const $carts = document.querySelector('#cart-items');
  const carts = getCarts();
  $carts.innerHTML = carts.map(CartItem).join('');
};

const renderTotalPrice = () => {
  const $totalPriceWrapper = document.querySelector('#total-price-wrapper');
  const { finalPrice, appliedDiscountRate, rewardPoints } = calculateCartTotal();
  $totalPriceWrapper.innerHTML = totalPrice({ finalPrice, appliedDiscountRate, rewardPoints });
};

const reRender = () => {
  renderCarts();
  renderTotalPrice();
};

App();

// 장바구니 추가 버튼 클릭 이벤트
// $addCartBtn.addEventListener('click', () => {
//   // 선택된 옵션
//   const selectedItem = $selectBox.value;
//   const currentAddedItem = PRODUCTS.find((p) => {
//     return p.id === selectedItem;
//   });

//   // todo : 장바구니에 추가되어있는 경우와 중복 로직
//   if (currentAddedItem && currentAddedItem.quantity > 0) {
//     const item = document.getElementById(currentAddedItem.id);

//     if (item) {
//       const newQuantity = parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;
//       // 가격 * 업데이트된 수량
//       if (newQuantity <= currentAddedItem.quantity) {
//         item.querySelector('span').textContent =
//           currentAddedItem.name + ' - ' + currentAddedItem.val + '원 x ' + newQuantity;
//         currentAddedItem.quantity--;
//       } else {
//         // todo : 재고 계산해서 부족할 경우 alert로 출력하는 함수 만들기
//         alert('재고가 부족합니다.');
//       }
//     } else {
//       // 새로운 장바구니 항목 추가
//       const newItem = document.createElement('div');
//       newItem.id = currentAddedItem.id;
//       newItem.className = 'flex justify-between items-center mb-2';

//       // cart - ui
//       newItem.innerHTML =
//         '<span>' +
//         currentAddedItem.name +
//         ' - ' +
//         currentAddedItem.val +
//         '원 x 1</span><div>' +
//         '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
//         currentAddedItem.id +
//         '" data-change="-1">-</button>' +
//         '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
//         currentAddedItem.id +
//         '" data-change="1">+</button>' +
//         '<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' +
//         currentAddedItem.id +
//         '">삭제</button></div>';
//       $cartsWrapper.appendChild(newItem);
//       currentAddedItem.quantity--;
//     }

//     // 총 가격 계산
//     calculateCartTotal();
//     // 마지막 담은 상품 업데이트
//     lastAddedItem = selectedItem;
//   }
// });

// 장바구니 수량 변경 및 삭제 클릭 이벤트
// $cartsWrapper.addEventListener('click', (e) => {
//   const target = e.target;

//   // className에 quantity-change이 포함된 경우
//   if (target.classList.contains('quantity-change') || target.classList.contains('remove-item')) {
//     // 장바구니 내역 삭제
//     const id = target.dataset.productId;
//     const $tagetItem = document.getElementById(id);

//     const product = PRODUCTS.find((p) => {
//       return p.id === id;
//     });

//     // 장바구니에 담긴 quantity값을 가져옴
//     if (target.classList.contains('quantity-change')) {
//       console.log(target.dataset.change);
//       const quantityChange = parseInt(target.dataset.change);
//       const newQuantity =
//         parseInt($tagetItem.querySelector('span').textContent.split('x ')[1]) + quantityChange;

//       // 재고 눌린 버튼에 따라 quantity 수량 변경
//       if (
//         newQuantity > 0 &&
//         newQuantity <=
//           product.quantity + parseInt($tagetItem.querySelector('span').textContent.split('x ')[1])
//       ) {
//         $tagetItem.querySelector('span').textContent =
//           $tagetItem.querySelector('span').textContent.split('x ')[0] + 'x ' + newQuantity;
//         product.quantity -= quantityChange;
//       } else if (newQuantity <= 0) {
//         $tagetItem.remove();
//         product.quantity -= quantityChange;
//       } else {
//         // 재고가 부족하면 alert 실행
//         alert('재고가 부족합니다.');
//       }
//     } else if (target.classList.contains('remove-item')) {
//       // remove-item이면 삭제
//       const remQty = parseInt($tagetItem.querySelector('span').textContent.split('x ')[1]);
//       product.quantity += remQty;
//       $tagetItem.remove();
//     }
//     calculateCartTotal();
//   }
// });
