import { ElementIds } from '../../../../../shared/app/constants.js';
import { handleClickAddBtn } from './logic.js';

import { getProductQuantityMessage } from '../../../../../shared/app/Cart/calculation.js';
import { getProductList } from '../../../../../shared/store/productList.js';

function createItemOptionDom(item) {
  const opt = document.createElement('option');

  const isSoldOut = item.q === 0;

  opt.value = item.id;
  opt.textContent = item.name + ' - ' + item.val + '원';
  opt.disabled = isSoldOut;

  return opt;
}

function createSelectOptions(selElem) {
  const prodList = getProductList();

  prodList.forEach((item) => {
    const opt = createItemOptionDom(item);
    selElem.appendChild(opt);
  });
}

function createSel() {
  const sel = document.createElement('select');
  sel.id = ElementIds.SEL;

  sel.className = 'border rounded p-2 mr-2';
  createSelectOptions(sel);

  return sel;
}

function createAddBtn() {
  const addBtn = document.createElement('button');
  addBtn.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  addBtn.id = ElementIds.ADD_BTN;
  addBtn.textContent = '추가';

  addBtn.addEventListener('click', handleClickAddBtn);

  return addBtn;
}

function createStockInfo() {
  const stockInfo = document.createElement('div');
  stockInfo.id = ElementIds.STOCK_INFO;
  stockInfo.className = 'text-sm text-gray-500 mt-2';
  const productList = getProductList();
  stockInfo.textContent = getProductQuantityMessage(productList);

  return stockInfo;
}

export function createAddProduct() {
  return [createSel(), createAddBtn(), createStockInfo()];
}
