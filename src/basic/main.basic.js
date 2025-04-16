import { setupAddButtonEvent, setupCartButtonEvents } from "./components/Cart";
import renderProductOptions from "./components/ProductOptions";
import renderStockInfo from "./components/StockInfo";
import renderTotal from "./components/TotalDisplay";
import { createUIElements } from "./components/UIElements";
import PRODUCTS from "./product";
import createStore from "./store";
import { appendUIElements } from "./utils/domUtils";
import {
  startLightningSale,
  startRecommendation,
} from "./utils/promotionUtils";

// 초기 상태 설정 및 UI 요소들 생성하는 함수
function main() {
  const store = createStore({
    products: [...PRODUCTS],
  });

  const updateSelOpts = () => {
    renderStockInfo(elements.stockInfo, store.getState().products);
  };
  const root = document.getElementById("app");

  const elements = createUIElements();

  appendUIElements(root, elements);

  renderProductOptions(elements.productSelect, store.getState().products);

  renderTotal(0, elements.total);

  renderStockInfo(elements.stockInfo, store.getState().products);

  setupAddButtonEvent(elements, store);

  setupCartButtonEvents(elements, store);

  startLightningSale(store.getState().products, updateSelOpts);

  startRecommendation(store.getState().products, null, updateSelOpts);
}

main();
