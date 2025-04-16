import { ElementIds } from "../../../constants.js";
import { handleClickAddBtn, updateSelectOptionsDom } from "./logic.js";

function createSel() {
  const sel = document.createElement("select");
  sel.id = ElementIds.SEL;
  sel.className = "border rounded p-2 mr-2";
  updateSelectOptionsDom(sel);

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

export function createAddProduct() {
  return [createSel(), createAddBtn(), createStockInfo()];
}
