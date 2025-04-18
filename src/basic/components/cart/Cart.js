import { ItemStore } from '../../store/itemStore';
import { renderCalcCart } from '../cartTotal/renderCalcCart';
import { handleCartAction } from './handleCartAction';

export default function Cart() {
  const $cartItemsDiv = document.createElement('div');
  $cartItemsDiv.id = 'cart-items';

  // 장바구니에서 상품 수량을 변경하거나 삭제하는 이벤트 리스너
  $cartItemsDiv.addEventListener('click', function (event) {
    const $target = event.target;
    if (!$target.dataset.itemId) return;

    const isUpdated = handleCartAction($target);
    if (isUpdated) {
      const itemStore = ItemStore.getInstance();
      renderCalcCart(itemStore.getState().items);
    }
  });

  return $cartItemsDiv;
}
