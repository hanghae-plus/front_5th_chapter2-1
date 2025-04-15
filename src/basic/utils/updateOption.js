import ITEMS from '../constants/items';
import { $itemSelect } from '../createElements';

/**Select인 sel 밑으로 각 상품을 Option으로 넣습니다*/
const updateItemOption = () => {
  $itemSelect.innerHTML = '';

  //각각의 prodList에 대해 option태그를 생성하고 id와 text를 넣어줍니다.
  ITEMS.forEach(function (item) {
    let itemOptionElement = document.createElement('option');
    itemOptionElement.value = item.id;
    itemOptionElement.textContent = item.name + ' - ' + item.price + '원';

    if (item.stock === 0) itemOptionElement.disabled = true; //q는 재고를 의미합니다.

    $itemSelect.appendChild(itemOptionElement);
  });
};

export default updateItemOption;
