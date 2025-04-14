export default function ItemSelect() {
  const $itemSelect = document.createElement('select');
  $itemSelect.id = 'product-select';
  $itemSelect.className = 'border rounded p-2 mr-2';

  return $itemSelect;
}
