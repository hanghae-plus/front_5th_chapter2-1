import { CONSTANTS } from '../../constants';
import { ItemStore } from '../../store/itemStore';

export function handleCartAction(target) {
  // TODO: 수량 변경 및 삭제 핸들러 분리하기
  if (
    target.classList.contains('quantity-change') ||
    target.classList.contains('remove-item')
  ) {
    const itemId = target.dataset.itemId;
    const $item = document.getElementById(itemId);

    const itemStore = ItemStore.getInstance();
    const items = itemStore.getState().items;
    const item = items.find(function (i) {
      return i.id === itemId;
    });

    if (target.classList.contains('quantity-change')) {
      const quantityDiff = parseInt(target.dataset.change);
      const curQuantity = parseInt(
        $item.querySelector('span').textContent.split('x ')[1],
      );
      const updatedQuantity = curQuantity + quantityDiff;

      if (
        updatedQuantity > 0 &&
        updatedQuantity <=
          item.quantity +
            parseInt($item.querySelector('span').textContent.split('x ')[1])
      ) {
        $item.querySelector('span').textContent =
          $item.querySelector('span').textContent.split('x ')[0] +
          'x ' +
          updatedQuantity;
        itemStore.updateItemQuantity(item.id, -quantityDiff);
      } else if (updatedQuantity <= 0) {
        $item.remove();
        itemStore.updateItemQuantity(item.id, -quantityDiff);
      } else {
        alert(CONSTANTS.OUT_OF_STOCK_MESSAGE);
      }
    } else if (target.classList.contains('remove-item')) {
      const removeQuantity = parseInt(
        $item.querySelector('span').textContent.split('x ')[1],
      );

      itemStore.updateItemQuantity(item.id, removeQuantity);
      $item.remove();
    }
  }
}
