import $stock from '../components/Stock';
import ITEMS from '../constants/items';

/**각 아이템의 재고가 5개 미만인 경우 재고부족, 품절을 표시. */
const updateStockState = () => {
  let stockState = '';

  ITEMS.forEach((item) => {
    if (item.stock < 5) {
      stockState +=
        item.name +
        ': ' +
        (item.stock > 0 ? '재고 부족 (' + item.stock + '개 남음)' : '품절') +
        '\n';
    }
  });

  $stock.textContent = stockState;
};

export default updateStockState;
