import { ItemStore } from '../../store/itemStore';
import { renderCalcCart } from '../cartTotal/renderCalcCart';
import { CONSTANTS } from '../../constants';
import { textUtils } from '../../utils/textUtils';

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
      $item.querySelector('span').textContent = textUtils.getCartItemSummary(
        selectedItem.name,
        selectedItem.price,
        updatedQuantity,
      );

      itemStore.updateItemQuantity(selectedItem.id, -1);
    } else {
      // 재고가 부족하다면 재고 부족 문구 얼럿
      alert(CONSTANTS.OUT_OF_STOCK_MESSAGE);
    }
  } else {
    // 장바구니에 없는 상품인 경우
    // TODO: 렌더링 부분 분리하기
    const $newItemsDiv = document.createElement('div');
    $newItemsDiv.id = selectedItem.id;

    // 상품을 장바구니에 추가
    $newItemsDiv.className = 'flex justify-between items-center mb-2';
    $newItemsDiv.innerHTML = `
        <span>${selectedItem.name} - ${selectedItem.price}원 x 1</span>
        <div>
          <button 
            class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
            data-item-id="${selectedItem.id}"
            data-change="-1"
          >-</button>
          <button 
            class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
            data-item-id="${selectedItem.id}"
            data-change="1"
          >+</button>
          <button 
            class="remove-item bg-red-500 text-white px-2 py-1 rounded"
            data-item-id="${selectedItem.id}"
          >삭제</button>
        </div>
      `;

    const $cart = document.getElementById('cart-items');
    $cart.appendChild($newItemsDiv);
    itemStore.updateItemQuantity(selectedItem.id, -1);
  }

  // 장바구니 총액 렌더링
  const items = itemStore.getState().items;
  renderCalcCart(items);

  // 마지막으로 선택한 상품 상태 업데이트
  itemStore.setLastSelectedItem(selectItemId);
}
