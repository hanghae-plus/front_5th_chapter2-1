import { globalState } from "../state/globalState";
import { TotalPrice } from "./cart";
import { Header } from "./common";

export function App() {
  const app = document.getElementById("app");
  const container = document.createElement("div");
  const wrapper = document.createElement("div");

  this.state = globalState;

  this.init = () => {
    container.className = "bg-gray-100 p-8";
    wrapper.className = "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8";
    container.appendChild(wrapper);
    app?.appendChild(container);
  };

  new Header({ target: wrapper });
  new TotalPrice({ target: wrapper, initialState: this.state });
  console.log("hihi2");

  this.init();
}
