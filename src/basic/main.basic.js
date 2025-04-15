import { updateSelectOptions, calculateCart } from "./libs";
import { addButtonClickEvent, cartDisplayClickEvent } from "./events";

/** @typedef {import("./types").Product} Product */

// ===============================================

/** @type {Product[]} */
const products = [
  { id: "p1", name: "상품1", price: 10000, stock: 50 },
  { id: "p2", name: "상품2", price: 20000, stock: 30 },
  { id: "p3", name: "상품3", price: 30000, stock: 20 },
  { id: "p4", name: "상품4", price: 15000, stock: 0 },
  { id: "p5", name: "상품5", price: 25000, stock: 10 },
];

// ===============================================

const $select = document.createElement("select");
$select.id = "product-select";
$select.className = "border rounded p-2 mr-2";

// ====================== renderBonusPoints =========================

const $sum = document.createElement("div");
$sum.id = "cart-total";
$sum.className = "text-xl font-bold my-4";

// ===============================================

const $cartDisplay = document.createElement("div");
$cartDisplay.id = "cart-items";

// ===============================================

const $addCartButton = document.createElement("button");
$addCartButton.id = "add-to-cart";
$addCartButton.className = "bg-blue-500 text-white px-4 py-2 rounded";
$addCartButton.textContent = "추가";

// ===============================================

const $stockInfo = document.createElement("div");
$stockInfo.id = "stock-status";
$stockInfo.className = "text-sm text-gray-500 mt-2";

// ===============================================

const lastSel = {
  value: "",
};

// ===============================================

function main() {
  var root = document.getElementById("app");
  let cont = document.createElement("div");
  var wrap = document.createElement("div");
  let hTxt = document.createElement("h1");
  cont.className = "bg-gray-100 p-8";
  wrap.className = "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8";
  hTxt.className = "text-2xl font-bold mb-4";
  hTxt.textContent = "장바구니";
  updateSelectOptions($select, products);
  wrap.appendChild(hTxt);
  wrap.appendChild($cartDisplay);
  wrap.appendChild($sum);
  wrap.appendChild($select);
  wrap.appendChild($addCartButton);
  wrap.appendChild($stockInfo);
  cont.appendChild(wrap);
  root.appendChild(cont);
  calculateCart($cartDisplay, $sum, $stockInfo, products);
  setTimeout(function () {
    setInterval(function () {
      var luckyItem = products[Math.floor(Math.random() * products.length)];
      if (Math.random() < 0.3 && luckyItem.stock > 0) {
        luckyItem.price = Math.round(luckyItem.price * 0.8);
        alert("번개세일! " + luckyItem.name + "이(가) 20% 할인 중입니다!");
        updateSelectOptions($select, products);
      }
    }, 30000);
  }, Math.random() * 10000);
  setTimeout(function () {
    setInterval(function () {
      if (lastSel.value) {
        var suggest = products.find(function (item) {
          return item.id !== lastSel.value && item.stock > 0;
        });
        if (suggest) {
          alert(suggest.name + "은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!");
          suggest.price = Math.round(suggest.price * 0.95);
          updateSelectOptions($select, products);
        }
      }
    }, 60000);
  }, Math.random() * 20000);
}

main();

cartDisplayClickEvent($cartDisplay, $sum, $stockInfo, products, lastSel);
addButtonClickEvent($addCartButton, $cartDisplay, $select, $sum, $stockInfo, products, lastSel);
