import { updateCartStatus, updateTotalDiscountRate } from '../sum/Sum.viewmodel.js';
import { createDiscountText, createPointText, createSumText } from '../sum/Sum.js';
import { updateStockInfo } from '../stockInfo/StockInfo.viewmodel.js';
import {
  decreaseCartItem,
  getProductInfo,
  increaseCartItem,
  setLastSelectedItem,
} from './CartDisplay.Model.js';
import { createCartItemElement, updateItemInfo } from './CartDisplay.js';

const MESSAGE_OUT_OF_STOCK = '재고가 부족합니다.';

/**
 * 사용자가 선택한 상품을 장바구니에 담는 기능
 * @param productId 판매 상품 Id
 * @param selectedItem 판매 상품 정보
 */
export function addItem(productId) {
  const selectedItem = getProductInfo(productId);

  // 선택한 item의 재고 존재시
  if (selectedItem && selectedItem.quantity > 0) {
    let $item = document.getElementById(selectedItem.id);
    if ($item) {
      // 이미 장바구니에 존재하는 item

      // 갱신될 상품 수량
      let tempQuantity = parseInt($item.querySelector('span').textContent.split('x ')[1]) + 1;
      if (tempQuantity <= selectedItem.quantity) {
        // 장바구니 수량 UI 갱신
        updateItemInfo($item, selectedItem, tempQuantity);
        // 실제 상품 수량 갱신
        increaseCartItem(productId, 1);
      } else {
        alert(MESSAGE_OUT_OF_STOCK);
      }
    } else {
      // 새로 담는 item

      // 장바구니 목록 UI 추가
      createCartItemElement(selectedItem);
      // 실제 상품 수량 갱신
      increaseCartItem(productId, 1);
    }
    calcCart();
    setLastSelectedItem(productId);
  }
}

/**
 *
 * @param productId 장바구니 목록 id
 * @param change 변경될 개수
 */
export function clickButtonAdd(productId, change) {
  let $itemElem = document.getElementById(productId);
  let selectedItem = getProductInfo(productId);

  let tempQuantity = parseInt($itemElem.querySelector('span').textContent.split('x ')[1]) + change;

  if (
    tempQuantity > 0 &&
    tempQuantity <=
      selectedItem.quantity + parseInt($itemElem.querySelector('span').textContent.split('x ')[1])
  ) {
    // 장바구니 수량 UI 갱신
    updateItemInfo($itemElem, selectedItem, tempQuantity);
    // 실제 상품 수량 갱신
    increaseCartItem(productId, change);
  } else if (tempQuantity <= 0) {
    // 장바구니 수량 UI 갱신
    $itemElem.remove();
    // 실제 상품 수량 갱신
    increaseCartItem(productId, change);
  } else {
    alert(MESSAGE_OUT_OF_STOCK);
  }
}

/**
 *
 * @param productId 장바구니 목록 id
 * @param change 변경될 개수
 */
export function clickButtonRemove(productId, change) {
  let $itemElem = document.getElementById(productId);
  // 장바구니 수량 UI 갱신
  $itemElem.remove();
  // 실제 상품 수량 갱신
  decreaseCartItem(productId, change);
}

/**
 * 장바구니 계산 및 UI 갱신
 * 상품 수량, 할인율, 총액, 포인트, 재고 상태 계산
 * 계산 결과를 화면에 반영
 */
export function calcCart() {
  // 장바구니 정보 계산
  updateCartStatus(); // 사용자의 장바구니 목록의 상태 정보 갱신 ( 기본금액, 할인된금액, 구매한 상품 개수 )
  updateTotalDiscountRate(); // 적용된 할인율 개산

  // 금액 UI Update
  createSumText();
  // 할인율 UI Update
  createDiscountText();

  // 재고 정보 UI Update
  updateStockInfo();
  // 포인트 UI Update
  createPointText();
}
