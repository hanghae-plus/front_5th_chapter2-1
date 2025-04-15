import { CartRenderer } from './components/CartRenderer.js';
// import { CartItemList } from './components/CartItemList.js';
import { CartItemList } from './components/CartItemList/index.js';
import { ProductSelector } from './components/ProductSelector.js';
import { INITIAL_PRODUCTS } from './constants.js';

//util.js
import { saleTimer } from './utils/saleTimer.js';
import { calculateCart } from './utils/cart.js';

// TODO:state로 뺄 변수
let productList;
var lastSelectedProduct, bonusPoints = 0

/* 상품 데이터 초기화 */
const root = document.getElementById('app');
const { cartItemList,
  cartTotal,
  productSelect,
  addToCartButton,
  stockStatus } = CartRenderer(root);

// 초기 상태 세팅
productList = [...INITIAL_PRODUCTS];

const safeCalculateCart = () => {
  calculateCart(cartItemList, productList, cartTotal, stockStatus, bonusPoints);
};

CartItemList(cartItemList, productList, safeCalculateCart)
const { updateSelectOptions } = ProductSelector(productSelect, addToCartButton, productList, cartItemList, safeCalculateCart, lastSelectedProduct);

updateSelectOptions();
calculateCart(cartItemList, productList, cartTotal, stockStatus, bonusPoints);

// 상품 할인 타이머 설정
saleTimer(productList, lastSelectedProduct, updateSelectOptions);