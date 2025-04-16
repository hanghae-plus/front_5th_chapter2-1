import $addCartButton from '../components/AddCartButton';
import $itemSelect from '../components/ItemSelect';
import $cart from '../components/Cart';
import updateCart from '../updater/updateCart';
import {
  createCartItem,
  getSelectedItem,
  isItemAvailable,
  updateCartItem,
  updateRecentSelectedId,
} from './addCartUtils';

const handleAddCart = () => {
  $addCartButton.addEventListener('click', () => {
    let selectedItemId = $itemSelect.value;
    let selectedItem = getSelectedItem(selectedItemId);

    if (!isItemAvailable(selectedItem)) return;

    let item = document.getElementById(selectedItem.id);
    item ? updateCartItem(item, selectedItem) : createCartItem(selectedItem, $cart);

    updateCart();
    updateRecentSelectedId(selectedItemId);
  });
};

export default handleAddCart;
