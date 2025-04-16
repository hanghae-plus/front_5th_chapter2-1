import { CartLayout } from './components/cartLayout.js';
import { CartItemList } from './components/CartItemList/index.js';
import { ProductSelector } from './components/ProductSelector/index.js';

//util.js
import { saleTimer } from './utils/saleTimer.js';
import { calculateCart } from './utils/cart.js';

// constants.js
import { INITIAL_PRODUCTS } from './constants.js';

//state.js
import { getState, setState } from './state.js';

/* DON 생성 */
const root = document.getElementById('app');
const { cartItemList,
  cartTotal,
  productSelect,
  addToCartButton,
  stockStatus } = CartLayout(root);

/* 상태 초기화 */
setState({
  productList: [...INITIAL_PRODUCTS],
  lastSelectedProduct: null,
  bonusPoints: 0
});

/* 장바구니 아이템 */
const safeCalculateCart = () => {
  const { productList, bonusPoints } = getState();
  calculateCart(cartItemList, productList, cartTotal, stockStatus, bonusPoints);
};
CartItemList(cartItemList, getState().productList, safeCalculateCart)

const { updateSelectOptions } = ProductSelector(productSelect, addToCartButton, getState().productList,
  cartItemList, safeCalculateCart, getState().lastSelectedProduct);

updateSelectOptions();
calculateCart(cartItemList, getState().productList, cartTotal, stockStatus, getState().bonusPoints);

/* 상품 할인 타이머 설정 */
saleTimer(getState().productList, getState().lastSelectedProduct, updateSelectOptions);