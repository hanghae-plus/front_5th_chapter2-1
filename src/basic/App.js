import { CartTotal, ProductSelect, StockInfo } from "./components/index.js";
/**
 * 최상위 컨테이너 컴포넌트
 */
const App = ({ products = [], totalAmount = 0, discountRate = 0, bonusPoints = 0 }) => {
  return `
    <div class="bg-gray-100 p-8">
      <div class="max-w-md mx-auto bg-white rounded-xrlwhsl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 class="text-2xl font-bold mb-4">장바구니</h1>
        <div id="cart-items"></div>
        ${CartTotal(totalAmount, discountRate, bonusPoints)}
        ${ProductSelect(products)}
        <button id="add-to-cart" class="bg-blue-500 text-white px-4 py-2 rounded">추가</button>
        ${StockInfo(products)}
      </div>
    </div>
  `.replace(/\n\s*/g, "");
};

export default App;
