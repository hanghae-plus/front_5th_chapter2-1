import ITEMS from '../constants/items';
import { $itemSelect } from '../components/getElements';

/**Select인 sel 밑으로 각 상품을 Option으로 넣습니다*/
const updateSelectOptions = () => {
  $itemSelect.innerHTML = '';

  //각각의 prodList에 대해 option태그를 생성하고 id와 text를 넣어줍니다.
  ITEMS.forEach((item) => {
    let $selectOption = document.createElement('option');
    $selectOption.value = item.id;
    $selectOption.textContent = item.name + ' - ' + item.price + '원';

    if (item.stock === 0) $selectOption.disabled = true; //q는 재고를 의미합니다.

    $itemSelect.appendChild($selectOption);
  });
};

export default updateSelectOptions;
