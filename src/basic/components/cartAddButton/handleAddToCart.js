import { ItemStore } from '../../store/itemStore';
import { renderCalcCart } from '../cartTotal/renderCalcCart';
import { renderUpdatedQuantity } from './cartItemRow/renderUpdatedQuantity';
import { CONSTANTS } from '../../constants';
import { CartItemRow } from './cartItemRow/CartItemRow.js';

export function handleAddToCart() {
  const $itemSelect = document.getElementById('product-select');
  const selectItemId = $itemSelect.value;
  const itemStore = ItemStore.getInstance();
  const selectedItem = itemStore.findItem(selectItemId);

  if (!(selectedItem && selectedItem.quantity > 0)) return;

  // 상품이 선택되었고 재고가 있는 경우
  const $item = document.getElementById(selectedItem.id);

  // 이미 장바구니에 있는 상품인지 확인
  if ($item) {
    const curQuantity = parseInt(
      $item.querySelector('span').textContent.split('x ')[1],
    );
    const updatedQuantity = curQuantity + 1;

    // 재고가 충분한 경우 수량 증가
    if (updatedQuantity <= selectedItem.quantity) {
      renderUpdatedQuantity($item, selectedItem, updatedQuantity);
      itemStore.updateItemQuantity(selectedItem.id, -1);
    } else {
      // 재고가 부족하다면 재고 부족 문구 얼럿
      alert(CONSTANTS.OUT_OF_STOCK_MESSAGE);
    }
  } else {
    // 장바구니에 없는 상품인 경우
    // 상품을 장바구니에 추가
    const $newItemRow = CartItemRow(selectedItem);
    const $cart = document.getElementById('cart-items');
    $cart.appendChild($newItemRow);
    itemStore.updateItemQuantity(selectedItem.id, -1);
  }

  // 장바구니 총액 렌더링
  const items = itemStore.getState().items;
  renderCalcCart(items);

  // 마지막으로 선택한 상품 상태 업데이트
  itemStore.setLastSelectedItem(selectItemId);
}
