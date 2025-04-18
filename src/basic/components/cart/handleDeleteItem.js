import { ItemStore } from '../../store/itemStore';
export function handleDeleteItem(itemId) {
  const $item = document.getElementById(itemId);
  const itemStore = ItemStore.getInstance();
  const selectedItem = itemStore.findItem(itemId);

  const removeQuantity = parseInt(
    $item.querySelector('span').textContent.split('x ')[1],
  );
  itemStore.updateItemQuantity(selectedItem.id, removeQuantity);
  $item.remove();

  return true;
}
