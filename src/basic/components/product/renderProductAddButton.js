import { renderProduct } from './index.js';
import { PRODUCT_LIST } from './ProductList.constant.js';
import { lastSelectState } from '../../utils/index.js';

export default function renderProductAddButton() {
  const addBtn = document.createElement('button');
  addBtn.id = 'add-to-cart';
  addBtn.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  addBtn.textContent = '추가';
  addBtn.addEventListener('click', handleAddProduct);
  return addBtn;
}

function handleAddProduct() {
  const select = document.getElementById('renderProduct-select');
  const newItem = PRODUCT_LIST.find((product) => product.id === selectedItem);
  const selectedItem = select.value;
  const { setLastSelectState } = lastSelectState();

  if (newItem && newItem.quantity > 0) {
    const item = document.getElementById(newItem.id);
    if (item) {
      const newQuantity =
        parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;

      if (newQuantity <= newItem.quantity) {
        item.querySelector('span').textContent =
          `${newItem.name} - ${newItem.price}원 x ${newQuantity}`;
        newItem.quantity--;
      } else {
        alert('재고가 부족합니다.');
      }
    } else {
      const cartItems = document.getElementById('cart-items');
      cartItems.appendChild(renderProduct(newItem));
      newItem.quantity--;
    }
    document.dispatchEvent(new CustomEvent('cartUpdated'));

    // 마지막으로 선택된 상품 state 로 저장
    setLastSelectState(selectedItem);
  }
}
