import { CartList } from "./components/CartList";
import { CartTotal } from "./components/CartTotal";
import { Header } from "./components/Header";
import { ProductSelect } from "./components/ProductSelect";
import { StockInfo } from "./components/StockInfo";

export const App = () => {
  return `
        <div class="bg-gray-100 p-8">
        <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
          ${Header()}
          ${CartList()}
          ${CartTotal()}
          <div class="flex items-center">
            ${ProductSelect()}
            <button id="add-to-cart" class="bg-blue-500 text-white px-4 py-2 rounded">추가</button>
          </div>
          ${StockInfo()}
        </div>
      </div
    `;
};
