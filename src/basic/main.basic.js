import App from "./App.js";
import store from "./store/index.js";
import EventManager from "./utils/eventManager.js";
import DOMManager from "./utils/domManager.js";

// 액션 생성자 가져오기
import { initializeProducts, updateProductStock } from "./store/actions/productActions.js";
import {
  addToCart,
  updateCartItem,
  removeFromCart,
  setLastSelected,
  updateCartTotals
} from "./store/actions/cartActions.js";

// 셀렉터 가져오기
import { getProducts, getProductById, getProductStock } from "./store/selectors/productSelectors.js";

import { getCartItems, getBonusPoints } from "./store/selectors/cartSelectors.js";

// 렌더링 유틸리티 가져오기
import {
  renderCartItem,
  removeCartItem,
  renderCartTotal,
  renderProductSelect,
  renderStockInfo
} from "./utils/renderUtils.js";

/**
 * 앱 초기 렌더링
 */
const renderApp = () => {
  const rootEl = document.getElementById("app");
  const state = store.getState();

  // 컴포넌트 기반 초기 렌더링 (상태 전달)
  rootEl.innerHTML = App(state);

  // DOM 요소 참조 초기화
  DOMManager.initialize();
};

/**
 * 전체 UI 업데이트
 */
const updateUI = () => {
  const state = store.getState();
  const { productSelectEl, cartTotalEl, stockStatusEl } = DOMManager.getAll();

  // 셀렉터 활용하여 데이터 가져오기
  const products = getProducts(state);
  const bonusPoints = getBonusPoints(state);

  // 컴포넌트 기반 UI 업데이트
  renderProductSelect(productSelectEl, products);
  renderCartTotal(cartTotalEl, state.totalAmount, state.discountRate, bonusPoints);
  renderStockInfo(stockStatusEl, products);
};

/**
 * 이벤트 핸들러: 장바구니에 상품 추가
 */
const handleAddToCart = () => {
  const state = store.getState();
  const { productSelectEl, cartItemsEl } = DOMManager.getAll();
  const seletedProduct = productSelectEl.value;
  const productToAdd = getProductById(state, seletedProduct);

  if (productToAdd && productToAdd.quantity > 0) {
    const existingProduct = document.getElementById(productToAdd.id);

    if (existingProduct) {
      // 이미 장바구니에 있는 상품인 경우 수량 증가
      const currentQuantity = parseInt(existingProduct.querySelector("span").textContent.split("x ")[1]);
      const updatedQuantity = currentQuantity + 1;

      // 재고 확인
      const availableStock = getProductStock(state, productToAdd.id) + currentQuantity;

      if (updatedQuantity <= availableStock) {
        // 수량 증가 및 재고 감소
        store.dispatch(updateCartItem(productToAdd.id, updatedQuantity));
        store.dispatch(updateProductStock(productToAdd.id, 1));

        // UI 업데이트
        renderCartItem(cartItemsEl, productToAdd, updatedQuantity, false);
      } else {
        alert("재고가 부족합니다.");
      }
    } else {
      // 새 상품을 장바구니에 추가
      store.dispatch(addToCart(productToAdd, 1));
      store.dispatch(updateProductStock(productToAdd.id, 1));

      // UI 업데이트
      renderCartItem(cartItemsEl, productToAdd, 1, true);
    }

    store.dispatch(setLastSelected(seletedProduct));

    // 장바구니 총액 업데이트
    const updatedState = store.getState();
    const updatedCartItems = getCartItems(updatedState);
    const products = getProducts(updatedState);
    store.dispatch(updateCartTotals(updatedCartItems, products));

    // UI 업데이트
    updateUI();
  }
};

/**
 * 이벤트 핸들러: 수량 변경 버튼 클릭
 */
const handleQuantityChange = (event) => {
  const state = store.getState();
  const { cartItemsEl } = DOMManager.getAll();
  const productId = event.target.dataset.productId;
  const cartItemEl = document.getElementById(productId);
  const product = getProductById(state, productId);

  // 수량 변경
  const quantityChange = parseInt(event.target.dataset.change);
  const currentQuantity = parseInt(cartItemEl.querySelector("span").textContent.split("x ")[1]);
  const updatedQuantity = currentQuantity + quantityChange;

  // 가용 재고를 확인
  const availableStock = getProductStock(state, productId) + currentQuantity;

  if (updatedQuantity > 0 && updatedQuantity <= availableStock) {
    // 수량 변경 및 재고 업데이트
    store.dispatch(updateCartItem(productId, updatedQuantity));
    store.dispatch(updateProductStock(productId, quantityChange));

    // UI 업데이트 - 컴포넌트 사용
    renderCartItem(cartItemsEl, product, updatedQuantity, false);
  } else if (updatedQuantity <= 0) {
    // 아이템 제거
    store.dispatch(removeFromCart(productId));
    store.dispatch(updateProductStock(productId, quantityChange));

    // UI 업데이트 - 컴포넌트 사용
    removeCartItem(productId);
  } else {
    alert("재고가 부족합니다.");
  }

  // 장바구니 총액 업데이트
  const updatedState = store.getState();
  const updatedCartItems = getCartItems(updatedState);
  const products = getProducts(updatedState);
  store.dispatch(updateCartTotals(updatedCartItems, products));

  // UI 업데이트
  updateUI();
};

/**
 * 이벤트 핸들러: 상품 제거 버튼 클릭
 */
const handleRemoveItem = (event) => {
  const productId = event.target.dataset.productId;
  const cartItemEl = document.getElementById(productId);

  // 상품 삭제
  const removeQuantity = parseInt(cartItemEl.querySelector("span").textContent.split("x ")[1]);

  // 상태 업데이트
  store.dispatch(removeFromCart(productId));
  store.dispatch(updateProductStock(productId, -removeQuantity));

  // UI 업데이트
  removeCartItem(productId);

  // 장바구니 총액 업데이트
  const updatedState = store.getState();
  const updatedCartItems = getCartItems(updatedState);
  const products = getProducts(updatedState);
  store.dispatch(updateCartTotals(updatedCartItems, products));

  // UI 업데이트
  updateUI();
};

/**
 * 이벤트 핸들러 등록
 */
const setupEventHandlers = () => {
  // 전역 이벤트 위임 설정
  EventManager.on("click", "#add-to-cart", handleAddToCart);
  EventManager.on("click", ".quantity-change", handleQuantityChange);
  EventManager.on("click", ".remove-item", handleRemoveItem);
};

/**
 * 앱 초기화
 */
const initApp = () => {
  // 스토어 초기화
  store.dispatch(initializeProducts());

  // 앱 렌더링
  renderApp();

  // 이벤트 핸들러 설정
  setupEventHandlers();

  // 스토어 구독 설정 - 상태 변경 시 UI 업데이트
  store.subscribe(() => {
    // 전체 UI 업데이트
    updateUI();
  });
};

// 앱 시작
initApp();
