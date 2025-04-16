import { CartLayout } from './components/cartLayout.js';
import { CartItemList } from './components/CartItemList/index.js';
import { ProductSelector } from './components/ProductSelector/index.js';
import { INITIAL_PRODUCTS } from './constants.js';

//util.js
import { saleTimer } from './utils/saleTimer.js';
import { calculateCart } from './utils/cart.js';

// TODO:state로 뺄 변수
let productList;
var lastSelectedProduct, bonusPoints = 0

/* DON 생성 */
const root = document.getElementById('app');
const { cartItemList,
  cartTotal,
  productSelect,
  addToCartButton,
  stockStatus } = CartLayout(root);

/* 상품 데이터 초기화 */
productList = [...INITIAL_PRODUCTS];

/* 장바구니 아이템 */
const safeCalculateCart = () => {
  calculateCart(cartItemList, productList, cartTotal, stockStatus, bonusPoints);
};
CartItemList(cartItemList, productList, safeCalculateCart)

const { updateSelectOptions } = ProductSelector(productSelect, addToCartButton, productList, cartItemList, safeCalculateCart, lastSelectedProduct);

updateSelectOptions();
calculateCart(cartItemList, productList, cartTotal, stockStatus, bonusPoints);

/* 상품 할인 타이머 설정 */
saleTimer(productList, lastSelectedProduct, updateSelectOptions);