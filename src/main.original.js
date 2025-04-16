import { AppComponent } from "./App";
import { flashSale } from "./utils/intervalAlerts";

const App = new AppComponent("app");

function init() {
  App.render();
  flashSale();
}
