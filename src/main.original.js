import { AppComponent } from "./App";
import { productList } from "./stores/store";
import { additionalSale, flashSale } from "./utils/intervalAlerts";

const App = new AppComponent("app");

function init() {
  App.render();

  // sale alert 추가
  flashSale(productList);
  additionalSale(App.lastSelectedProductId, productList);
}

init();
