import { AppComponent } from "./App";
import { setAllSale } from "./utils/intervalAlerts";

const App = new AppComponent("app");

function init() {
  App.render();

  // sale alert 추가
  setAllSale(App.lastSelectedProductId);
}

init();
