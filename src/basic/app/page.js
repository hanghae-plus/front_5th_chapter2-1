import { HeaderTitle } from "./header.js";

function main() {
  let root = document.getElementById("app");

  let mainContainer = document.createElement("div");
  mainContainer.className = "bg-gray-100 p-8";

  let wrapper = document.createElement("div");
  wrapper.className =
    "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8";

  cartContainer = document.createElement("div");
  cartContainer.id = "cart-items";

  totalPrice = document.createElement("div");
  totalPrice.id = "cart-total";
  totalPrice.className = "text-xl font-bold my-4";

  cartList = document.createElement("select");
  cartList.id = "product-select";
  cartList.className = "border rounded p-2 mr-2";

  addProductBtn = document.createElement("button");
  addProductBtn.id = "add-to-cart";
  addProductBtn.className = "bg-blue-500 text-white px-4 py-2 rounded";
  addProductBtn.textContent = "추가";

  stockInfo = document.createElement("div");
  stockInfo.id = "stock-status";
  stockInfo.className = "text-sm text-gray-500 mt-2";

  updateProductList();
  wrapper.appendChild(HeaderTitle());
  wrapper.appendChild(cartContainer);
  wrapper.appendChild(totalPrice);
  wrapper.appendChild(cartList);
  wrapper.appendChild(addProductBtn);
  wrapper.appendChild(stockInfo);
  mainContainer.appendChild(wrapper);
  root.appendChild(mainContainer);
  calcCart();
  setTimeout(function () {
    setInterval(function () {
      let luckyItem =
        productList[Math.floor(Math.random() * productList.length)];
      if (Math.random() < 0.3 && luckyItem.quantity > 0) {
        luckyItem.price = Math.round(luckyItem.price * 0.8);
        alert("번개세일! " + luckyItem.name + "이(가) 20% 할인 중입니다!");
        updateProductList();
      }
    }, 30000);
  }, Math.random() * 10000);
  setTimeout(function () {
    setInterval(function () {
      if (lastSel) {
        let suggest = productList.find(function (item) {
          return item.id !== lastSel && item.quantity > 0;
        });
        if (suggest) {
          alert(
            suggest.name + "은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!",
          );
          suggest.price = Math.round(suggest.price * 0.95);
          updateProductList();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
}
