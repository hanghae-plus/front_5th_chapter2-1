import { App } from "./App.js";
import { initStore, getStore } from "./store/store.js";
import { setupCartEvents } from "./hooks/cartHooks.js";
import { setupProductEvents } from "./hooks/productHooks.js";
import { renderCartItems, renderCartTotal } from "./renderers/cartRenderer.js";
import { renderProductOptions } from "./renderers/productRenderer.js";
import { renderStockInfo } from "./renderers/stockRenderer.js";

/**
 * 앱 렌더링 및 초기화
 */
const renderApp = () => {
  const root = document.getElementById("app");
  if (!root) return;

  // 앱 템플릿 렌더링
  root.innerHTML = App();

  // 스토어 초기화
  initStore();

  // 초기 데이터로 UI 렌더링
  const state = getStore();
  renderCartItems(state);
  renderCartTotal(state);
  renderProductOptions(state.products);
  renderStockInfo(state);

  // 이벤트 핸들러 설정
  setupCartEvents();
  setupProductEvents();
};

// 앱 시작
window.addEventListener("DOMContentLoaded", renderApp);
