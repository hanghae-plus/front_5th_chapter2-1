// 애플리케이션 진입점
import PRODUCTS from './data/products.js';

// UI 컴포넌트 가져오기
import { createAllUIElements } from './components/common.js';
import { updateLoyaltyPoints, updateTotalDisplay, handleCartAction } from './components/cart.js';
import { updateProductOptions, updateStockInfo, handleFlashSale, handleRecommendedProduct } from './components/product.js';

// 서비스 가져오기
import { calcCart, addProductToCart, changeQuantity, removeCartItem } from './services/cart-service.js';
import { initPromotionService, on, off } from './services/promotion-service.js';

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

// 상태를 참조 객체로 관리
const lastSelectedProductRef = {
  get current() {
    return lastSelectedProduct;
  },
  set current(value) {
    lastSelectedProduct = value;
  }
};

/*
* 프로모션 이벤트 초기화 함수
* */
function initPromotions() {
  // 이벤트 핸들러 등록 - 번개세일
  on('flashSale', (event) => {
    handleFlashSale(event, () => updateProductOptions(productSelect, PRODUCTS));
  });

  // 이벤트 핸들러 등록 - 추천 상품
  on('recommendedProduct', (event) => {
    handleRecommendedProduct(event, () => updateProductOptions(productSelect, PRODUCTS));
  });

  // 프로모션 서비스 초기화
  const cleanupPromotion = initPromotionService(PRODUCTS, lastSelectedProductRef);

  // 정리 함수 반환
  return () => {
    // 이벤트 리스너 해제
    off('flashSale', handleFlashSale);
    off('recommendedProduct', handleRecommendedProduct);

    // 서비스 정리
    cleanupPromotion();
  };
}

/*
* 장바구니 계산 결과를 UI에 반영하는 함수
* */
function updateCart() {
  const { totalAmount: newTotal, totalItemCount: newCount, discountRate } = calcCart(cartList, PRODUCTS);

  // 상태 업데이트
  totalAmount = newTotal;
  totalItemCount = newCount;

  // UI 업데이트
  updateTotalDisplay(totalDisplay, totalAmount, discountRate);
  updateStockInfo(stockInfoDisplay, PRODUCTS);
  loyaltyPoints = updateLoyaltyPoints(totalDisplay, totalAmount);
}

/*
* 장바구니에 상품 추가 핸들러
* */
function handleAddProductToCart() {
  const selectedProductId = productSelect.value;
  const result = addProductToCart(selectedProductId, cartList, PRODUCTS);

  if (result) {
    lastSelectedProductRef.current = selectedProductId;
    updateCart();
    updateProductOptions(productSelect, PRODUCTS);
  }
}

/*
* 수량 변경 핸들러
* */
function handleChangeQuantity(productId, changeAmount) {
  if (changeQuantity(productId, changeAmount, cartList, PRODUCTS)) {
    updateCart();
    updateProductOptions(productSelect, PRODUCTS);
  }
}

/*
* 상품 제거 핸들러
* */
function handleRemoveCartItem(productId) {
  if (removeCartItem(productId, cartList, PRODUCTS)) {
    updateCart();
    updateProductOptions(productSelect, PRODUCTS);
  }
}

/*
* 장바구니 액션 핸들러
* */
function handleCartActionWrapper(event) {
  handleCartAction(event, handleChangeQuantity, handleRemoveCartItem);
}

/*
* 이벤트 리스너 등록 함수
* */
function registerEventListeners() {
  addButton.addEventListener('click', handleAddProductToCart);
  cartList.addEventListener('click', handleCartActionWrapper);
}

/*
* 앱 초기화 함수
* */
function initApp() {
  const root = document.getElementById('app');

  // UI 요소 생성
  const uiElements = createAllUIElements();

  // DOM 요소 참조 설정
  cartList = uiElements.cartList;
  totalDisplay = uiElements.totalDisplay;
  productSelect = uiElements.productSelect;
  addButton = uiElements.addButton;
  stockInfoDisplay = uiElements.stockInfoDisplay;

  // 루트에 추가
  root.appendChild(uiElements.container);

  // 상품 옵션 초기화
  updateProductOptions(productSelect, PRODUCTS);

  // 초기 상태 계산
  updateCart();

  // 이벤트 리스너 등록
  registerEventListeners();

  // 프로모션 이벤트 초기화
  initPromotions();
}

// 앱 초기화
initApp();
