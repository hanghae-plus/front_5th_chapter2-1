import { updateSelectOptions, calculateCart } from "./libs";
import { addButtonClickEvent, cartDisplayClickEvent } from "./events";
import { createElement } from "./libs/utils/createElement";

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

const $select = createElement("select", {
  id: "product-select",
  class: "border rounded p-2 mr-2",
});

// ====================== renderBonusPoints =========================

const $sum = createElement("div", {
  id: "cart-total",
  class: "text-xl font-bold my-4",
});

// ===============================================

const $cartDisplay = createElement("div", {
  id: "cart-items",
});

// ===============================================

const $addCartButton = createElement(
  "button",
  {
    id: "add-to-cart",
    class: "bg-blue-500 text-white px-4 py-2 rounded",
  },
  "추가",
);

// ===============================================

const $stockInfo = createElement("div", {
  id: "stock-status",
  class: "text-sm text-gray-500 mt-2",
});

// ===============================================

const lastSel = {
  value: "",
};

// ===============================================

function main() {
  const $title = createElement(
    "h1",
    {
      class: "text-2xl font-bold mb-4",
    },
    "장바구니",
  );

  const $wrapper = createElement(
    "div",
    {
      class: "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8",
    },
    $title,
    $cartDisplay,
    $sum,
    $select,
    $addCartButton,
    $stockInfo,
  );

  const $count = createElement(
    "div",
    {
      class: "bg-gray-100 p-8",
    },
    $wrapper,
  );

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
