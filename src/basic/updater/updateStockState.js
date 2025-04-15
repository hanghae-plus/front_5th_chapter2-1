import ITEMS from '../constants/items';
import { $stockState } from '../components/getElements';

/**각 아이템의 재고가 5개 미만인 경우 재고부족, 품절을 표시. */
const updateStockState = () => {
  let stockState = '';

  ITEMS.forEach(function (item) {
    if (item.stock < 5) {
      stockState +=
        item.name +
        ': ' +
        (item.stock > 0 ? '재고 부족 (' + item.stock + '개 남음)' : '품절') +
        '\n';
    }
  });

  $stockState.textContent = stockState;
};

export default updateStockState;
