import calculatePrice from '../calculatePrice.js';
import { PRODUCTS } from '../productList.constant.js';
import cartItem from './cartItem.js';
import { setLastSelectState } from '../utils/lastSelectState.js';

export default function addButton() {
  const addBtn = document.createElement('button');
  addBtn.id = 'add-to-cart';
  addBtn.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  addBtn.textContent = '추가';
  addBtn.addEventListener('click', handleAddItem);
  return addBtn;
}

function handleAddItem() {
  const select = document.getElementById('product-select');
  const selectedItem = select.value;
  const newItem = PRODUCTS.find((product) => product.id === selectedItem);

  if (newItem && newItem.quantity > 0) {
    const item = document.getElementById(newItem.id);
    if (item) {
      const newQty =
        parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;
      if (newQty <= newItem.quantity) {
        item.querySelector('span').textContent =
          `${newItem.name} - ${newItem.price}원 x ${newQty}`;
        newItem.quantity--;
      } else {
        alert('재고가 부족합니다.');
      }
    } else {
      const cartItems = document.getElementById('cart-items');
      cartItems.appendChild(cartItem(newItem));
      newItem.quantity--;
    }
    calculatePrice();
    setLastSelectState(selectedItem);
  }
}
