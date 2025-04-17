import { AddProductBtn } from "./components/AddProductButton.js";
import { CartContainer } from "./components/CartContainer.js";
import { CartList } from "./components/CartList.js";
import { HeaderTitle } from "./components/HeaderTitle.js";
import { StockInformation } from "./components/StockInformation.js";
import { TotalPrice } from "./components/TotalPrice.js";
import { shoppingState } from "./store/state.js";

function main() {
  let root = document.getElementById("app");
  let mainContainer = document.createElement("div");
  mainContainer.className = "bg-gray-100 p-8";
  let wrapper = document.createElement("div");
  wrapper.className =
    "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8";
  const headerTitle = HeaderTitle();
  const cartContainer = CartContainer();
  const totalPrice = TotalPrice();
  const stockInfo = StockInformation();
  const addProductBtn = AddProductBtn();
  const cartList = CartList();

  updateProductList(cartList, shoppingState.productList);
  useCalcCart(
    shoppingState.totalAmount,
    shoppingState.itemCount,
    cartContainer,
    shoppingState.productList,
    stockInfo,
    totalPrice
  );

  wrapper.appendChild(headerTitle);
  wrapper.appendChild(cartContainer);
  wrapper.appendChild(totalPrice);
  wrapper.appendChild(cartList);
  wrapper.appendChild(addProductBtn);
  wrapper.appendChild(stockInfo);
  mainContainer.appendChild(wrapper);
  root.appendChild(mainContainer);
  setTimeout(function () {
    setInterval(function () {
      let luckyItem =
        shoppingState.productList[Math.floor(Math.random() * shoppingState.productList.length)];
      if (Math.random() < 0.3 && luckyItem.quantity > 0) {
        luckyItem.price = Math.round(luckyItem.price * 0.8);
        alert("번개세일! " + luckyItem.name + "이(가) 20% 할인 중입니다!");
        // updateProductList();
      }
    }, 30000);
  }, Math.random() * 10000);
  setTimeout(function () {
    setInterval(function () {
      if (shoppingState.lastSel) {
        let suggest = shoppingState.productList.find(function (item) {
          return item.id !== shoppingState.lastSel && item.quantity > 0;
        });
        if (suggest) {
          alert(suggest.name + "은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!");
          suggest.price = Math.round(suggest.price * 0.95);
          // updateProductList();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
}

main();
