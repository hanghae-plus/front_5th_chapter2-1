import { textUtils } from '../../utils/textUtils';

// 제품 선택 옵션을 렌더링
export function updateSelectOptions(items) {
  const $itemSelect = document.getElementById('product-select');
  $itemSelect.innerHTML = '';

  items.forEach(function (item) {
    const $option = document.createElement('option');

    $option.value = item.id;
    $option.textContent = textUtils.getSelectOptionText(item.name, item.price);
    if (item.quantity === 0) {
      $option.disabled = true;
    }

    $itemSelect.appendChild($option);
  });
}
