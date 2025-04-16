import { ElementIds } from "../../../constants.js";
import { findProduct, prodList } from "../../../../store/prodList.js";
import { updateCartDom, getCartItemText, getValueFromCardItem } from "../../logics/updateCartDom.js";
import { updateLastSelValue } from "../../../../store/lastSel.js";

function isSoldOut(quantity) {
  return quantity === 0;
}

function createItemOptionDom(item) {
  const opt = document.createElement("option");
  opt.value = item.id;
  opt.textContent = item.name + " - " + item.val + "원";
  opt.disabled = isSoldOut(item.q);
  return opt;
}

export function updateSelectOptionsDom(selElem) {
  const sel = selElem ?? document.getElementById(ElementIds.SEL);

  sel.innerHTML = "";

  prodList.forEach((item) => {
    const opt = createItemOptionDom(item);
    sel.appendChild(opt);
  });
}


function createNewCartItem(itemToAdd) {
  const newItem = document.createElement("div");
  newItem.id = itemToAdd.id;
  newItem.className = "flex justify-between items-center mb-2";
  newItem.innerHTML =
    `<span>${itemToAdd.name} - ${itemToAdd.val}원 x 1</span>` +
    `<div><button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="-1">-</button>` +
    `<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="1">+</button>` +
    `<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${itemToAdd.id}">삭제</button></div>`;

  return newItem;
}

function updateCartItemQuantityDom(item, itemToAdd) {
  const newQty = getValueFromCardItem(item) + 1;
  const { name, val, q } = itemToAdd;

  if (newQty <= q) {
    getCartItemText(item).textContent = `${name} - ${val}원 x ${newQty}`;
    itemToAdd.q--;
  } else {
    alert("재고가 부족합니다.");
  }
}

function addItemToCart(itemToAdd) {
  const cartDisplay = document.getElementById(ElementIds.CART_DISP);

  const newItem = createNewCartItem(itemToAdd);
  cartDisplay.appendChild(newItem);

  itemToAdd.q--;
}


function updateCartDisplay(itemToAdd) {
  const item = document.getElementById(itemToAdd.id);
  item ? updateCartItemQuantityDom(item, itemToAdd) : addItemToCart(itemToAdd);
}

export function handleClickAddBtn() {
  const sel = document.getElementById(ElementIds.SEL);

  const selItem = sel.value;
  const itemToAdd = findProduct(selItem);

  if (!itemToAdd || itemToAdd.q <= 0) {
    return;
  }

  updateCartDisplay(itemToAdd);
  updateCartDom();
  updateLastSelValue(selItem);
}
