import { handleDeleteItem } from './handleDeleteItem';
import { handleUpdateQuantity } from './handleUpdateQuantity';

export function handleCartAction({ classList, dataset: { itemId, change } }) {
  // 수량 변경
  if (classList.contains('quantity-change')) {
    const quantityDiff = parseInt(change);
    return handleUpdateQuantity(itemId, quantityDiff);
  }

  // 상품 삭제
  if (classList.contains('remove-item')) {
    return handleDeleteItem(itemId);
  }

  return false;
}
