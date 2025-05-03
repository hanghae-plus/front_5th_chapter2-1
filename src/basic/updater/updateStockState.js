import $stock from '../components/Stock';
import ITEMS from '../constants/items';

const STOCK_LIMIT = 5;

/**각 아이템의 재고가 5개 미만인 경우 재고부족, 품절을 표시. */
const updateStockState = () => {
  let stockState = '';

  //재고 상태 업데이트
  ITEMS.forEach((item) => {
    if (item.stock < STOCK_LIMIT) {
      stockState += `${item.name}: ${item.stock > 0 ? '재고 부족 (' + item.stock + '개 남음)' : '품절'}\n`;
    }
  });
  $stock.textContent = stockState;
};

export default updateStockState;
