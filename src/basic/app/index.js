import { ElementIds } from "../../constants.js";
import { calcCart } from "../calcCart.js";
import {
  handleClickAddBtn,
  handleClickCartDisp,
  setSaleAlert,
  setSuggestionAlert,
  updateSelOpts,
} from "./logic.js";

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
  updateSelOpts(sel);

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
  const wrap = createWrap([
    createHeaderTxt(),
    createCartDisp(),
    createSum(),
    createSel(),
    createAddBtn(),
    createStockInfo(),
  ]);

  return createContent(wrap);
}

export function setUp() {
  calcCart();
  setSaleAlert();
  setSuggestionAlert();
}
