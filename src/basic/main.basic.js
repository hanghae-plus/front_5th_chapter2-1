import { updateSelectOptions, calculateCart } from "./libs";

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

// ===============================================

var addBtn, stockInfo;
var lastSel;

function main() {
  var root = document.getElementById("app");
  let cont = document.createElement("div");
  var wrap = document.createElement("div");
  let hTxt = document.createElement("h1");
  addBtn = document.createElement("button");
  stockInfo = document.createElement("div");
  addBtn.id = "add-to-cart";
  stockInfo.id = "stock-status";
  cont.className = "bg-gray-100 p-8";
  wrap.className = "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8";
  hTxt.className = "text-2xl font-bold mb-4";
  addBtn.className = "bg-blue-500 text-white px-4 py-2 rounded";
  stockInfo.className = "text-sm text-gray-500 mt-2";
  hTxt.textContent = "장바구니";
  addBtn.textContent = "추가";
  updateSelectOptions($select, products);
  wrap.appendChild(hTxt);
  wrap.appendChild($cartDisplay);
  wrap.appendChild($sum);
  wrap.appendChild($select);
  wrap.appendChild(addBtn);
  wrap.appendChild(stockInfo);
  cont.appendChild(wrap);
  root.appendChild(cont);
  calculateCart($cartDisplay, $sum, stockInfo, products);
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
      if (lastSel) {
        var suggest = products.find(function (item) {
          return item.id !== lastSel && item.stock > 0;
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
addBtn.addEventListener("click", function () {
  var selItem = $select.value;
  var itemToAdd = products.find(function (p) {
    return p.id === selItem;
  });
  if (itemToAdd && itemToAdd.stock > 0) {
    var item = document.getElementById(itemToAdd.id);
    if (item) {
      var newQty = parseInt(item.querySelector("span").textContent.split("x ")[1]) + 1;
      if (newQty <= itemToAdd.stock) {
        item.querySelector("span").textContent = itemToAdd.name + " - " + itemToAdd.price + "원 x " + newQty;
        itemToAdd.stock--;
      } else {
        alert("재고가 부족합니다.");
      }
    } else {
      var newItem = document.createElement("div");
      newItem.id = itemToAdd.id;
      newItem.className = "flex justify-between items-center mb-2";
      newItem.innerHTML =
        "<span>" +
        itemToAdd.name +
        " - " +
        itemToAdd.price +
        "원 x 1</span><div>" +
        '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
        itemToAdd.id +
        '" data-change="-1">-</button>' +
        '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
        itemToAdd.id +
        '" data-change="1">+</button>' +
        '<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' +
        itemToAdd.id +
        '">삭제</button></div>';
      $cartDisplay.appendChild(newItem);
      itemToAdd.stock--;
    }
    calculateCart($cartDisplay, $sum, stockInfo, products);
    lastSel = selItem;
  }
});
$cartDisplay.addEventListener("click", function (event) {
  var tgt = event.target;
  if (tgt.classList.contains("quantity-change") || tgt.classList.contains("remove-item")) {
    var prodId = tgt.dataset.productId;
    var itemElem = document.getElementById(prodId);
    var prod = products.find(function (p) {
      return p.id === prodId;
    });
    if (tgt.classList.contains("quantity-change")) {
      var qtyChange = parseInt(tgt.dataset.change);
      var newQty = parseInt(itemElem.querySelector("span").textContent.split("x ")[1]) + qtyChange;
      if (newQty > 0 && newQty <= prod.stock + parseInt(itemElem.querySelector("span").textContent.split("x ")[1])) {
        itemElem.querySelector("span").textContent =
          itemElem.querySelector("span").textContent.split("x ")[0] + "x " + newQty;
        prod.stock -= qtyChange;
      } else if (newQty <= 0) {
        itemElem.remove();
        prod.stock -= qtyChange;
      } else {
        alert("재고가 부족합니다.");
      }
    } else if (tgt.classList.contains("remove-item")) {
      var remQty = parseInt(itemElem.querySelector("span").textContent.split("x ")[1]);
      prod.stock += remQty;
      itemElem.remove();
    }
    calculateCart($cartDisplay, $sum, stockInfo, products);
  }
});
