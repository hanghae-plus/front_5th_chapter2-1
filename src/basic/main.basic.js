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
  const $title = document.createElement("h1");
  $title.className = "text-2xl font-bold mb-4";
  $title.textContent = "장바구니";

  const $wrapper = document.createElement("div");
  $wrapper.className = "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8";
  $wrapper.appendChild($title);
  $wrapper.appendChild($cartDisplay);
  $wrapper.appendChild($sum);
  $wrapper.appendChild($select);
  $wrapper.appendChild($addCartButton);
  $wrapper.appendChild($stockInfo);

  const $count = document.createElement("div");
  $count.className = "bg-gray-100 p-8";
  $count.appendChild($wrapper);

  const $root = document.getElementById("app");
  $root.appendChild($count);

  updateSelectOptions($select, products);
  calculateCart($cartDisplay, $sum, $stockInfo, products);

  // TODO: 번개세일 이벤트 추가
  // setTimeout(function () {
  //   setInterval(function () {
  //     var luckyItem = products[Math.floor(Math.random() * products.length)];
  //     if (Math.random() < 0.3 && luckyItem.stock > 0) {
  //       luckyItem.price = Math.round(luckyItem.price * 0.8);
  //       alert("번개세일! " + luckyItem.name + "이(가) 20% 할인 중입니다!");
  //       updateSelectOptions($select, products);
  //     }
  //   }, 30000);
  // }, Math.random() * 10000);

  // setTimeout(function () {
  //   setInterval(function () {
  //     if (lastSel.value) {
  //       var suggest = products.find(function (item) {
  //         return item.id !== lastSel.value && item.stock > 0;
  //       });
  //       if (suggest) {
  //         alert(suggest.name + "은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!");
  //         suggest.price = Math.round(suggest.price * 0.95);
  //         updateSelectOptions($select, products);
  //       }
  //     }
  //   }, 60000);
  // }, Math.random() * 20000);
}

main();

cartDisplayClickEvent($cartDisplay, $sum, $stockInfo, products, lastSel);
addButtonClickEvent($addCartButton, $cartDisplay, $select, $sum, $stockInfo, products, lastSel);
