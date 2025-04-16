import { CONSTANTS } from '../../constants';
import { ItemStore } from '../../store/itemStore';
import { renderUpdatedQuantity } from '../cartAddButton/cartItemRow/renderUpdatedQuantity';

export function handleUpdateQuantity(itemId, diff) {
  const $item = document.getElementById(itemId);
  const itemStore = ItemStore.getInstance();
  const selectedItem = itemStore.findItem(itemId);

  const curQuantity = parseInt(
    $item.querySelector('span').textContent.split('x ')[1],
  );
  const updatedQuantity = curQuantity + diff;

  // 리렌더링 및 상태 변경
  if (
    updatedQuantity > 0 &&
    updatedQuantity <= selectedItem.quantity + curQuantity
  ) {
    renderUpdatedQuantity($item, selectedItem, updatedQuantity);
    itemStore.updateItemQuantity(selectedItem.id, -diff);
    return true;
  }

  // 수량이 남지 않는 경우 상품을 삭제
  if (updatedQuantity <= 0) {
    $item.remove();
    itemStore.updateItemQuantity(selectedItem.id, -diff);
    return true;
  }

  // 재고 부족 시 알림
  alert(CONSTANTS.OUT_OF_STOCK_MESSAGE);
  return false;
}
