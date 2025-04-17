import { ItemListType, ItemType } from '../../types/ItemType.js';
import { textUtils } from '../../utils/textUtils.js';

// 재고 부족 경고 수량
const STOCK_WARNING_LIMIT = 5;

// 재고 부족 여부 확인
const isStockWarning = (quantity: ItemType['quantity']) =>
  quantity < STOCK_WARNING_LIMIT;

// 재고 정보 문구 업데이트
export const getInfoText = (itemList: ItemListType) => {
  const infoText = itemList.reduce((text, { quantity, name }) => {
    if (!isStockWarning(quantity)) {
      return text;
    }
    // eslint-disable-next-line sonarjs/no-nested-template-literals
    return `${text}${textUtils.getWarningText(name, quantity)}`;
  }, '');

  return infoText;
};
