import App from "./App";
import { setupEventListeners } from "./event";
import { setupPromotions } from "./promotion";

const initializeApp = () => {
  const rootElement = document.getElementById("app");

  if (!rootElement) {
    console.error("Root Element가 없습니다.");
    return;
  }

  App(rootElement);
  setupEventListeners();
  setupPromotions();
};

if (typeof window !== "undefined" && document.getElementById("app")) {
  initializeApp();
}
