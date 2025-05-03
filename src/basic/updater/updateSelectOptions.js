import $itemSelect from '../components/ItemSelect';
import ITEMS from '../constants/items';

const updateSelectOptions = () => {
  $itemSelect.innerHTML = '';

  //각 아이템의 option태그를 업데이트합니다.
  ITEMS.forEach((item) => {
    let $selectOption = document.createElement('option');
    $selectOption.value = item.id;
    $selectOption.textContent = `${item.name} - ${item.price}원`;

    if (item.stock === 0) $selectOption.disabled = true;

    $itemSelect.appendChild($selectOption);
  });
};

export default updateSelectOptions;
