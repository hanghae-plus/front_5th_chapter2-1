import { ItemListType, ItemType } from 'src/advanced/types/ItemType.js';

// 재고 부족 경고 수량
const STOCK_WARNING_LIMIT = 5;

// 재고 부족 여부 확인
const isStockWarning = (quantity: ItemType['quantity']) =>
  quantity < STOCK_WARNING_LIMIT;
const isStockExist = (quantity: ItemType['quantity']) => quantity > 0;

// 재고 정보 문구 업데이트
export const getInfoText = (itemList: ItemListType) => {
  const infoText = itemList.reduce((text, { quantity, name }) => {
    if (!isStockWarning(quantity)) {
      return text;
    }
    // eslint-disable-next-line sonarjs/no-nested-template-literals
    return `${text}${name}: ${isStockExist(quantity) ? `재고 부족 (${quantity}개 남음)` : '품절'}\n`;
  }, '');

  return infoText;
};
