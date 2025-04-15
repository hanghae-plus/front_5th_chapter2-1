import ITEMS from '../constants/items';
import { RecentSelectedId } from '../stores';

const isSelectedItem = (p, selectedItemId) => {
  return p.id === selectedItemId;
};

const getSelectedItem = (selectedItemId) => {
  return ITEMS.find((id) => isSelectedItem(id, selectedItemId));
};

const isItemAvailable = (selecedItem) => {
  return selecedItem && selecedItem.stock > 0;
};

const updateCartItem = (item, selectedItem) => {
  const currentCartText = item.querySelector('span').textContent;
  let cartCount = parseInt(currentCartText.split('x ')[1]) + 1;

  if (cartCount <= selectedItem.stock) {
    item.querySelector('span').textContent =
      `${selectedItem.name} - ${selectedItem.price}원 x ${cartCount}`;
    selectedItem.stock--;
  } else {
    alert('재고가 부족합니다.');
  }
};

const createCartItem = (selectedItem, $cart) => {
  const newItem = document.createElement('div');
  newItem.id = selectedItem.id;
  newItem.className = 'flex justify-between items-center mb-2';

  newItem.innerHTML = `
		<span>${selectedItem.name} - ${selectedItem.price}원 x 1</span>
		<div>
		  <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" 
				  data-product-id="${selectedItem.id}" 
				  data-change="-1">-</button>
		  <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" 
				  data-product-id="${selectedItem.id}" 
				  data-change="1">+</button>
		  <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" 
				  data-product-id="${selectedItem.id}">삭제</button>
		</div>
	  `;

  $cart.appendChild(newItem);
  selectedItem.stock--; // 재고 감소
};

const updateRecentSelectedId = (selectedItemId) => {
  let recentSelectedId = new RecentSelectedId();
  recentSelectedId.set(selectedItemId);
};

export { getSelectedItem, isItemAvailable, updateCartItem, createCartItem, updateRecentSelectedId };
