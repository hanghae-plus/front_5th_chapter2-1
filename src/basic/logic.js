import { ElementIds } from "../constants.js";
import { calcCart } from "./calcCart.js";
import { prodList } from "./store/prodList.js";
import { lastSel, updateLastSelValue } from "./store/lastSel.js";

function updateSelOpts(selElem) {
  const sel = selElem ?? document.getElementById(ElementIds.SEL);

  sel.innerHTML = "";
  prodList.forEach(function (item) {
    const opt = document.createElement("option");
    opt.value = item.id;
    opt.textContent = item.name + " - " + item.val + "원";
    if (item.q === 0) opt.disabled = true;
    sel.appendChild(opt);
  });
}

export function setSaleAlert() {
  setTimeout(function () {
    setInterval(function () {
      var luckyItem = prodList[Math.floor(Math.random() * prodList.length)];
      if (Math.random() < 0.3 && luckyItem.q > 0) {
        luckyItem.val = Math.round(luckyItem.val * 0.8);
        alert("번개세일! " + luckyItem.name + "이(가) 20% 할인 중입니다!");
        updateSelOpts();
      }
    }, 30000);
  }, Math.random() * 10000);
}

export function setSuggestionAlert() {
  setTimeout(function () {
    setInterval(function () {
      if (lastSel) {
        var suggest = prodList.find(function (item) {
          return item.id !== lastSel && item.q > 0;
        });
        if (suggest) {
          alert(
            suggest.name + "은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!",
          );
          suggest.val = Math.round(suggest.val * 0.95);
          updateSelOpts();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
}

function handleClickAddBtn() {
  const sel = document.getElementById(ElementIds.SEL);
  const cartDisp = document.getElementById(ElementIds.CART_DISP);
  var selItem = sel.value;
  var itemToAdd = prodList.find(function (p) {
    return p.id === selItem;
  });
  if (itemToAdd && itemToAdd.q > 0) {
    var item = document.getElementById(itemToAdd.id);
    if (item) {
      var newQty =
        parseInt(item.querySelector("span").textContent.split("x ")[1]) + 1;
      if (newQty <= itemToAdd.q) {
        item.querySelector("span").textContent =
          itemToAdd.name + " - " + itemToAdd.val + "원 x " + newQty;
        itemToAdd.q--;
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
        itemToAdd.val +
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
      cartDisp.appendChild(newItem);
      itemToAdd.q--;
    }
    calcCart();
    updateLastSelValue(selItem);
  }
}

function createContent(wrap) {
  const cont = document.createElement("div");
  cont.className = "bg-gray-100 p-8";
  cont.appendChild(wrap);

  return cont;
}

function createHeaderTxt() {
  const hTxt = document.createElement("h1");
  hTxt.className = "text-2xl font-bold mb-4";
  hTxt.textContent = "장바구니";

  return hTxt;
}

function handleClickCartDisp(event) {
  var tgt = event.target;
  if (
    tgt.classList.contains("quantity-change") ||
    tgt.classList.contains("remove-item")
  ) {
    var prodId = tgt.dataset.productId;
    var itemElem = document.getElementById(prodId);
    var prod = prodList.find(function (p) {
      return p.id === prodId;
    });
    if (tgt.classList.contains("quantity-change")) {
      var qtyChange = parseInt(tgt.dataset.change);
      var newQty =
        parseInt(itemElem.querySelector("span").textContent.split("x ")[1]) +
        qtyChange;
      if (
        newQty > 0 &&
        newQty <=
          prod.q +
            parseInt(itemElem.querySelector("span").textContent.split("x ")[1])
      ) {
        itemElem.querySelector("span").textContent =
          itemElem.querySelector("span").textContent.split("x ")[0] +
          "x " +
          newQty;
        prod.q -= qtyChange;
      } else if (newQty <= 0) {
        itemElem.remove();
        prod.q -= qtyChange;
      } else {
        alert("재고가 부족합니다.");
      }
    } else if (tgt.classList.contains("remove-item")) {
      var remQty = parseInt(
        itemElem.querySelector("span").textContent.split("x ")[1],
      );
      prod.q += remQty;
      itemElem.remove();
    }

    calcCart();
  }
}

function createCartDisp() {
  const cartDisp = document.createElement("div");
  cartDisp.id = ElementIds.CART_DISP;
  cartDisp.addEventListener("click", handleClickCartDisp);

  return cartDisp;
}
function createSum() {
  const sum = document.createElement("div");
  sum.id = ElementIds.SUM;
  sum.className = "text-xl font-bold my-4";

  return sum;
}

function createSel() {
  const sel = document.createElement("select");
  sel.id = ElementIds.SEL;
  sel.className = "border rounded p-2 mr-2";

  return sel;
}

function createAddBtn() {
  const addBtn = document.createElement("button");
  addBtn.className = "bg-blue-500 text-white px-4 py-2 rounded";
  addBtn.id = ElementIds.ADD_BTN;
  addBtn.textContent = "추가";
  addBtn.addEventListener("click", handleClickAddBtn);

  return addBtn;
}

function createStockInfo() {
  const stockInfo = document.createElement("div");
  stockInfo.id = ElementIds.STOCK_INFO;
  stockInfo.className = "text-sm text-gray-500 mt-2";

  return stockInfo;
}

function createWrap(children) {
  const wrap = document.createElement("div");
  wrap.className =
    "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8";
  children.map((child) => wrap.appendChild(child));

  return wrap;
}

export function createRootChildren() {
  const hTxt = createHeaderTxt();
  const cartDisp = createCartDisp();
  const sum = createSum();
  const sel = createSel();
  const addBtn = createAddBtn();
  const stockInfo = createStockInfo();

  updateSelOpts(sel);

  const wrap = createWrap([hTxt, cartDisp, sum, sel, addBtn, stockInfo]);
  return createContent(wrap);
}
