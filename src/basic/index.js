import { PRODUCTS, getCarts, setCarts } from './service';
import CartItem from './components/CartItem.js';
import Option from './components/Options.js';
import StockList from './components/StockList.js';

const createStore = () => {
  const INITIAL_STATE = {
    carts: getCarts(),
    totalPrice: 0,
    rewardPoints: 0,
    outOfStocks: PRODUCTS.filter((v) => v.stock === 0 || v.stock < 5),
  };

  let state = { ...INITIAL_STATE };

  const getState = () => state;
  const setState = (newState) => {
    state = { ...state, ...newState };
  };

  return { getState, setState };
};

const store = createStore();

/**
 * 상품 추가 이벤트 핸들러
 * @param {Event} e - 클릭 이벤트 객체
 */
const handleAddProd = (e) => {
  e.preventDefault();
  try {
    const wrapper = e.target.closest('#select-box-wrapper');
    const selectBox = wrapper.querySelector('#product-select-box');
    const selectedOption = selectBox.options[selectBox.selectedIndex];
    const id = selectedOption.dataset.id;

    setCarts({ id, carts: getCarts() });
    store.setState({ carts: getCarts() });
    renderCartItems();
  } catch (e) {
    console.error(e);
  }
};

/**
 * 상품 삭제 이벤트 핸들러
 * @param {Event} e - 클릭 이벤트 객체
 */
const handleDeleteProd = (e) => {
  e.preventDefault();
  const id = e.target.dataset.productId;
  const carts = JSON.parse(localStorage.getItem('carts')) || [];

  const updatedCarts = carts.filter((item) => item.id !== id);
  localStorage.setItem('carts', JSON.stringify(updatedCarts));
  store.setState({ carts: updatedCarts });
  renderCartItems();
};

/**
 * 상품 수량 변경 이벤트 핸들러
 * @param {Event} e - 클릭 이벤트 객체
 */
const handleChangeQuantity = (e) => {
  const action = e.target.dataset.action;
  const id = e.target.dataset.productId;
  const carts = JSON.parse(localStorage.getItem('carts')) || [];

  const product = carts.find((item) => item.id === id);
  const stockProduct = PRODUCTS.find((p) => p.id === id);

  if (!product || !stockProduct) return;

  let updatedCarts = [];
  switch (action) {
    case 'add':
      if (product.counts + 1 > stockProduct.stock) {
        alert('재고가 부족합니다.');
        return;
      }
      updatedCarts = carts.map((item) =>
        item.id === id ? { ...item, counts: item.counts + 1 } : item,
      );
      break;
    case 'subtract':
      updatedCarts = carts
        .map((item) => (item.id === id ? { ...item, counts: item.counts - 1 } : item))
        .filter((item) => item.counts > 0);
      break;
    default:
      return;
  }

  localStorage.setItem('carts', JSON.stringify(updatedCarts));
  store.setState({ carts: updatedCarts });
  renderCartItems();
};

/**
 * 장바구니 아이템 렌더링 함수
 */
const renderCartItems = () => {
  const $cartItems = document.querySelector('#cart-items');
  const { carts } = store.getState();

  $cartItems.innerHTML = carts
    .map((item) => {
      const product = PRODUCTS.find((p) => p.id === item.id);
      return CartItem({
        id: item.id,
        name: product?.name || '이름 없음',
        price: product?.price || 0,
        counts: item.counts,
      });
    })
    .join('');
};

/**
 * 메인 애플리케이션 컴포넌트
 * @returns {HTMLElement} 루트 엘리먼트
 */
const App = () => {
  const root = document.querySelector('#app');
  const { carts, totalPrice, rewardPoints, outOfStocks } = store.getState();

  const template = /* html */ `
    <div id="container" class="bg-gray-100 p-8">
      <div id="wrapper" class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 class="text-2xl font-bold mb-4">장바구니</h1>
        <div id="cart-items">
          ${carts.map(CartItem).join('')}
        </div>
        <div id="total-price-wrapper">
          <span class="text-xl font-bold my-4">총액: ${totalPrice || '0'}원 </span>
          <span id="total-discounts" class="text-green-500 ml-2">${''}</span>
          <span class="text-blue-500 ml-2">(포인트: ${rewardPoints || '0'})</span>
        </div>
        <div id="select-box-wrapper">
          <select id="product-select-box" class="border rounded p-2 mr-2">
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

  // 이벤트 리스너 등록
  const $addToCart = document.querySelector('#add-to-cart');
  $addToCart.addEventListener('click', handleAddProd);

  // 이벤트 위임
  root.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
      handleDeleteProd(e);
    } else if (e.target.classList.contains('quantity-change')) {
      handleChangeQuantity(e);
    }
  });

  return root;
};

// 앱 실행
App();
