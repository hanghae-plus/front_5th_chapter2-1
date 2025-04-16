import { App } from "./App";
import { initStore } from "./store/store";
import { initCartEvents } from "./components/CartList";
import { initProductEvents } from "./components/ProductSelect";

const renderApp = () => {
  const root = document.getElementById("app");
  if (!root) return;

  root.innerHTML = App();
  initStore();
  initCartEvents();
  initProductEvents();
};

// 앱 시작
window.addEventListener("DOMContentLoaded", renderApp);
