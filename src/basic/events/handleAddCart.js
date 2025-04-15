import ITEMS from '../constants/items';
import { $addCartButton, $cart, $itemSelect } from '../createElements';
import { RecentSelectedId } from '../stores';
import updateCart from '../utils/updateCart';

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
  // 새 아이템 생성
  const newItem = document.createElement('div');
  newItem.id = selectedItem.id;
  newItem.className = 'flex justify-between items-center mb-2';

  // 템플릿 리터럴을 사용하여 HTML 가독성 개선
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
//TODO: handler 완전 분리 후, 호출
const handleAddCart = () => {
  $addCartButton.addEventListener('click', () => {
    let selectedItemId = $itemSelect.value;

    let selectedItem = getSelectedItem(selectedItemId);

    if (!isItemAvailable(selectedItem)) return;

    let item = document.getElementById(selectedItem.id);

    item ? updateCartItem(item, selectedItem) : createCartItem(selectedItem, $cart);

    updateCart(); //장바구니 계산
    updateRecentSelectedId(selectedItemId);
  });
};

export default handleAddCart;
