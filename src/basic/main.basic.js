import { createCartDisplayElement } from './component/cartDisplay/CartDisplay.js';
import {
  createSelElement,
  createAddBtnElement,
  getSelElement,
  getAddBtnElement,
} from './component/sel/Sel.js';
import { createStockInfoElement } from './component/stockInfo/StockInfo.js';
import {
  alertItemSale,
  alertItemSuggest,
  updateSelectProductList,
} from './component/sel/Sel.viewmodel.js';
import { createSumElement } from './component/sum/Sum.js';
import createTitleElement from './component/title/Title.js';
import ProductModel from './component/sel/Sel.Model.js';
import {
  addItem,
  calcCart,
  clickButtonAdd,
  clickButtonRemove,
} from './component/cartDisplay/CartDisplay.viewmodel.js';

/**
 * 화면을 구성하는 기본 element를 만든다.
 */
const DomUtil = {
  getRootElement: () => {
    const $root = document.getElementById('app');
    return $root;
  },
  createContentElement: () => {
    const $content = document.createElement('div');
    $content.className = 'bg-gray-100 p-8';
    return $content;
  },
  createWrapperElement: () => {
    const $wrap = document.createElement('div');
    $wrap.className =
      'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';
    return $wrap;
  },
};

/**
 * 화면을 구성하는 element 생성
 */
function createElements() {
  const $root = DomUtil.getRootElement();
  const $content = DomUtil.createContentElement();
  const $wrap = DomUtil.createWrapperElement();

  $wrap.appendChild(createTitleElement());
  $wrap.appendChild(createCartDisplayElement());
  $wrap.appendChild(createSumElement());
  $wrap.appendChild(createSelElement());
  $wrap.appendChild(createAddBtnElement());
  $wrap.appendChild(createStockInfoElement());

  $content.appendChild($wrap);
  $root.appendChild($content);
}

function main() {
  // 화면의 element 구성
  createElements();

  // 상품목록 업데이트
  updateSelectProductList(ProductModel.getList());

  calcCart();

  // 상품 세일 제안 기능
  alertItemSale();

  // 상품 제안 기능
  alertItemSuggest();
}

main();

document.addEventListener('click', (event) => {
  const $target = event.target;

  // '추가' 버튼 클릭 이벤트
  if ($target.id === getAddBtnElement().id) {
    let productId = getSelElement().value;
    let selectedItem = ProductModel.findList(productId);

    // 상품 담기
    addItem(productId, selectedItem);
  }

  if ($target.classList.contains('quantity-change') || $target.classList.contains('remove-item')) {
    let productId = $target.dataset.productId;
    let $itemElem = document.getElementById(productId);
    let change;

    // 장바구니 + 버튼
    if ($target.classList.contains('quantity-change')) {
      change = parseInt($target.dataset.change);

      clickButtonAdd(productId, change);
    }

    // 장바구니 - 버튼
    if ($target.classList.contains('remove-item')) {
      change = parseInt($itemElem.querySelector('span').textContent.split('x ')[1]);

      clickButtonRemove(productId, change);
    }

    calcCart();
  }
});
