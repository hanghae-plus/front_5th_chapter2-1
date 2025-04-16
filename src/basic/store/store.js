import { renderCartItems } from "../components/CartList.js";
import { updateProductOptions } from "../components/ProductSelect.js";
import { calculateCart } from "../components/CartTotal.js";
import { updateStockInfo } from "../components/StockInfo.js";
// 초기 상태
let store = {
  products: [
    { id: "p1", name: "상품1", val: 10000, q: 50 },
    { id: "p2", name: "상품2", val: 20000, q: 30 },
    { id: "p3", name: "상품3", val: 30000, q: 20 },
    { id: "p4", name: "상품4", val: 15000, q: 0 },
    { id: "p5", name: "상품5", val: 25000, q: 10 }
  ],
  cartItems: {},
  lastSelected: null,
  bonusPoints: 0,
  totalAmount: 0,
  itemCount: 0
};

// store getter
export const getStore = () => {
  return { ...store };
};

// store updater
export const updateStore = (newState) => {
  store = {
    ...store,
    ...newState
  };

  // 상태 변경 시 UI 업데이트
  renderUI();
};

// UI 업데이트 함수
export const renderUI = () => {
  updateProductOptions();
  renderCartItems();
  calculateCart();
  updateStockInfo();
};

export const initStore = () => {
  updateStore(store);
};
