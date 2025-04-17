import { ElementIds } from '../../../../../shared/app/constants.ts';
import { handleClickAddBtn } from './logic.ts';
import { getProductQuantityMessage } from '../../../../../shared/app/Cart/calculation.ts';
import { getProductList } from '../../../../../shared/store/productList.ts';

interface Product {
  id: string;
  name: string;
  val: number;
  q: number;
}

function createItemOptionDom(item: Product): HTMLOptionElement {
  const opt = document.createElement('option');

  const isSoldOut = item.q === 0;

  opt.value = item.id;
  opt.textContent = item.name + ' - ' + item.val + '원';
  opt.disabled = isSoldOut;

  return opt;
}

function createSelectOptions(selElem: HTMLSelectElement): void {
  const prodList = getProductList();

  prodList.forEach((item) => {
    const opt = createItemOptionDom(item);
    selElem.appendChild(opt);
  });
}

function createSel(): HTMLSelectElement {
  const sel = document.createElement('select');
  sel.id = ElementIds.SEL;

  sel.className = 'border rounded p-2 mr-2';
  createSelectOptions(sel);

  return sel;
}

function createAddBtn(): HTMLButtonElement {
  const addBtn = document.createElement('button');
  addBtn.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  addBtn.id = ElementIds.ADD_BTN;
  addBtn.textContent = '추가';

  addBtn.addEventListener('click', handleClickAddBtn);

  return addBtn;
}

function createStockInfo(): HTMLDivElement {
  const stockInfo = document.createElement('div');
  stockInfo.id = ElementIds.STOCK_INFO;
  stockInfo.className = 'text-sm text-gray-500 mt-2';
  const productList = getProductList();
  stockInfo.textContent = getProductQuantityMessage(productList);

  return stockInfo;
}

export function createAddProduct(): [HTMLSelectElement, HTMLButtonElement, HTMLDivElement] {
  return [createSel(), createAddBtn(), createStockInfo()];
} 