import { App } from "./App";

const renderApp = () => {
  const root = document.getElementById("app");
  if (!root) return;

  root.innerHTML = App();
};

// 앱 시작
window.addEventListener("DOMContentLoaded", renderApp);
