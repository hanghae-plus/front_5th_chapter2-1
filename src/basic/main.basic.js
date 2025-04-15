import { PRODUCTS, getCarts, setCarts } from './service';

const App = () => {
  const root = document.querySelector('#app');

  const totalPrice = 0;
  const rewardPoints = 0;
  const outOfStocks = PRODUCTS.filter((v) => v.stock === 0 || v.stock < 5);

  /** 선택 옵션 - main에 그냥 넣기 */
  const Option = ({ id, name, price, stock }) => `
<option data-id="${id}" ${stock === 0 ? `disabled` : ''}>
  ${name} - ${price}원
</option>`;

  /** 재고 현황 컴포넌트 */
  const StockList = ({ id, name, stock }) =>
    `<span id="${id}">
    ${name}: ${stock === 0 ? '품절' : `재고 부족 (${stock}개 남음)`}
 </span>`;

  const template = /* html */ `
  <div id="container" class="bg-gray-100 p-8">
    <div id="wrapper" class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
      <h1 class="text-2xl font-bold mb-4">장바구니</h1>
      <div id="cart-items">
        ${Carts()}
      </div>
      <div id="total-price-wrapper">
        <span class="text-xl font-bold my-4">총액: ${totalPrice | '0'}원 </span>
        <span id="total-discounts" class="text-green-500 ml-2">${''}</span>
        <span class="text-blue-500 ml-2">(포인트: ${rewardPoints | '0'})</span>
      </div>
      <div id="select-box-wrapper">
        <select id="product-select-box" class="border rounded p-2 mr-2" >
         ${PRODUCTS.map(Option).join('')}
        </select>
        <button id="add-to-cart" class="bg-blue-500 text-white px-4 py-2 rounded">추가</button>
      </div>
      <div id="stock-status" class="flex flex-col text-sm text-gray-500 mt-2 fx">
        ${outOfStocks.map(StockList).join('')}
      </div>
    </div>
  </div>

  
`;

  root.innerHTML = template;

  const $addToCart = document.querySelector('#add-to-cart');
  const $deleteBtn = document.querySelectorAll('.delete-btn');
  const $quantityBtn = document.querySelectorAll('.quantity-change');

  $addToCart.addEventListener('click', handleAddProd);

  // 이벤트 위임 방식으로 변경 -> target -> buttonTag이면 className에 따라서 동작이 변경되게
  $deleteBtn.forEach((btn) => btn.addEventListener('click', handleDeleteProd));
  $quantityBtn.forEach((btn) => btn.addEventListener('click', handleChangeQuantity));

  return root;
};

App();

Carts();

const $container = document.querySelector('#container');
const $totalPrice = document.querySelector('#total-price');
const $cartItems = document.querySelector('#cart-items');
const $stockStatus = document.querySelector('#stock-status');
const $selectBox = document.querySelector('#product-select-box');

/** 장바구니 목록 컴포넌트 */
function Carts() {
  const carts = getCarts();
  const cartItem = ({ id, name, price, counts }) =>
    `
  <div id ="${id}" class="flex justify-between items-center mb-1">
    <span>${name} - ${price} x ${counts}</span>
    <div class="flex justify-between items-center mb-2">
      <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${id}" data-action="subtract" data-action="add">-</button>
      <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${id}">+</button>
      <button class="delete-btn bg-red-500 text-white px-2 py-1 rounded" data-product-id="${id}">삭제</button>
    </div>
  </div>`;

  const template = carts.map(cartItem).join('');
  return template;
}

/** 장바구니 아이템 삭제 */
function handleDeleteProd(e) {
  e.preventDefault();
  const id = e.target.dataset.productId;
  let carts = JSON.parse(localStorage.getItem('carts')) || [];

  carts = carts.filter((item) => item.id !== id);
  localStorage.setItem('carts', JSON.stringify(carts));

  App();
}

/** 장바구니에 새 상품 추가 */
function handleAddProd(e) {
  e.preventDefault();
  const carts = getCarts();

  try {
    const wrapper = e.target.closest('#select-box-wrapper'); // button → wrapper
    const selectBox = wrapper.querySelector('#product-select-box'); // wrapper → select

    const selectedOption = selectBox.options[selectBox.selectedIndex];
    const id = selectedOption.dataset.id;

    setCarts({ id, carts });
    Carts();
  } catch (e) {
    console.error(e);
  }
}

/** 장바구니 수량 조절 */
function handleChangeQuantity(e) {
  const action = e.target.dataset.action;
  const id = e.target.dataset.productId;
  let carts = JSON.parse(localStorage.getItem('carts')) || [];

  const product = carts.find((item) => item.id === id);
  if (!product) return;

  if (action === 'add') {
    product.counts += 1;
  } else if (action === 'subtract') {
    product.counts -= 1;
    // 0개 이하로 떨어지면 삭제
    // 마이너스 된 값 carts에 업데이트하기
    if (product.counts <= 0) {
      carts = carts.filter((item) => item.id !== id);
    }
  }

  localStorage.setItem('carts', JSON.stringify(carts));
  Carts();
}
