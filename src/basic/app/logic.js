import { ElementIds } from "../../constants.js";
import { findProduct, prodList } from "../store/prodList.js";
import {
  calcCart,
  getCartItemText,
  getQuantityFromCardItem,
} from "../calcCart.js";
import { lastSel, updateLastSelValue } from "../store/lastSel.js";

function isSoldOut(quantity) {
  return quantity === 0;
}

function createOptionFromItem(item) {
  const opt = document.createElement("option");
  opt.value = item.id;
  opt.textContent = item.name + " - " + item.val + "원";
  opt.disabled = isSoldOut(item.q);
  return opt;
}

export function updateSelOpts(selElem) {
  const sel = selElem ?? document.getElementById(ElementIds.SEL);

  sel.innerHTML = "";

  prodList.forEach((item) => {
    const opt = createOptionFromItem(item);
    sel.appendChild(opt);
  });
}

function createNewCartItem(itemToAdd) {
  const newItem = document.createElement("div");
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
  return newItem;
}

function updateQuantityFromCardItem(item, itemToAdd) {
  const newQty = getQuantityFromCardItem(item) + 1;
  if (newQty <= itemToAdd.q) {
    const newTextContent =
      itemToAdd.name + " - " + itemToAdd.val + "원 x " + newQty;

    getCartItemText(item).textContent = newTextContent;
    itemToAdd.q--;
  } else {
    alert("재고가 부족합니다.");
  }
}

export function handleClickAddBtn() {
  const sel = document.getElementById(ElementIds.SEL);
  const cartDisp = document.getElementById(ElementIds.CART_DISP);
  const selItem = sel.value;
  const itemToAdd = findProduct(selItem);

  if (!itemToAdd || itemToAdd.q <= 0) {
    return;
  }

  const item = document.getElementById(itemToAdd.id);
  if (item) {
    updateQuantityFromCardItem(item, itemToAdd);
  } else {
    const newItem = createNewCartItem(itemToAdd);
    cartDisp.appendChild(newItem);
    itemToAdd.q--;
  }

  calcCart();
  updateLastSelValue(selItem);
}

function changeCardItemQuantity(tgt, itemElem, prod) {
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
      itemElem.querySelector("span").textContent.split("x ")[0] + "x " + newQty;
    prod.q -= qtyChange;
  } else if (newQty <= 0) {
    itemElem.remove();
    prod.q -= qtyChange;
  } else {
    alert("재고가 부족합니다.");
  }
}

function removeCardItem(itemElem, prod) {
  var remQty = parseInt(
    itemElem.querySelector("span").textContent.split("x ")[1],
  );
  prod.q += remQty;
  itemElem.remove();
}

function isValidTarget(tgt) {
  return (
    tgt.classList.contains("quantity-change") ||
    tgt.classList.contains("remove-item")
  );
}

export function handleClickCartDisp(event) {
  const tgt = event.target;

  if (!isValidTarget(tgt)) {
    return;
  }

  const productId = tgt.dataset.productId;
  const itemElem = document.getElementById(productId);
  const prod = findProduct(productId);

  if (tgt.classList.contains("quantity-change")) {
    changeCardItemQuantity(tgt, itemElem, prod);
  } else {
    removeCardItem(itemElem, prod);
  }

  calcCart();
}

function getRandomProduct() {
  return prodList[Math.floor(Math.random() * prodList.length)];
}
export function setSaleAlert() {
  const INTERVAL_TIME = 30000;

  setTimeout(() => {
    setInterval(() => {
      const luckyItem = getRandomProduct();
      if (Math.random() < 0.3 && luckyItem.q > 0) {
        luckyItem.val = Math.round(luckyItem.val * 0.8);
        alert("번개세일! " + luckyItem.name + "이(가) 20% 할인 중입니다!");
        // updateSelOpts(); //selectOptions 을 수정하는 액션이 없으므로 없어도 될것으로 예상
      }
    }, INTERVAL_TIME);
  }, Math.random() * 10000);
}

export function setSuggestionAlert() {
  const INTERVAL_TIME = 60000;

  setTimeout(() => {
    setInterval(() => {
      if (!lastSel) {
        return;
      }

      const suggest = prodList.find(function (item) {
        return item.id !== lastSel && item.q > 0;
      });

      if (suggest) {
        alert(suggest.name + "은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!");
        suggest.val = Math.round(suggest.val * 0.95);
        // updateSelOpts(); //selectOptions 을 수정하는 액션이 없으므로 없어도 될것으로 예상
      }
    }, INTERVAL_TIME);
  }, Math.random() * 20000);
}
