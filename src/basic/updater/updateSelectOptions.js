import $itemSelect from '../components/ItemSelect';
import ITEMS from '../constants/items';

/**Select인 sel 밑으로 각 상품을 Option으로 넣습니다*/
const updateSelectOptions = () => {
  $itemSelect.innerHTML = '';

  ITEMS.forEach((item) => {
    let $selectOption = document.createElement('option');
    $selectOption.value = item.id;
    $selectOption.textContent = item.name + ' - ' + item.price + '원';

    if (item.stock === 0) $selectOption.disabled = true;

    $itemSelect.appendChild($selectOption);
  });
};

export default updateSelectOptions;
