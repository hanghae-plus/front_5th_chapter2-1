import { $cart } from '../components/getElements';
import {
  isSelectedCartAvailable,
  getSelecteItem,
  isQuantityChange,
  isRemoveButton,
  removeQuanity,
  updateQuanity,
} from './cartUtils';
import updateCart from '../updater/updateCart';

const handleCart = () => {
  $cart.addEventListener('click', (e) => {
    let $selectedCart = e.target;

    if (!isSelectedCartAvailable($selectedCart)) return;

    //장바구니 요소
    let selectedId = $selectedCart.dataset.productId;
    let $selectedItem = document.getElementById(selectedId);
    let selectedItem = getSelecteItem(selectedId);
    //장바구니 수량 변화인 경우
    if (isQuantityChange($selectedCart)) {
      updateQuanity($selectedCart, $selectedItem, selectedItem);
    }

    //장바구니에서 삭제인 경우
    if (isRemoveButton($selectedCart)) {
      removeQuanity($selectedItem, selectedItem);
    }

    updateCart();
  });
};

export default handleCart;
