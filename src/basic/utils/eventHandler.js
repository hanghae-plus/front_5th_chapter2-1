import ITEMS from '../constants/items';
import { $addCartButton, $cart, $itemSelect } from '../createElements';
import { RecentSelectedId } from '../stores';
import updateCart from './updateCart';

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
const handleAddCartButton = () => {
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

const handleCart = () => {
  $cart.addEventListener('click', function (event) {
    let selectedCartElement = event.target;
    if (
      selectedCartElement.classList.contains('quantity-change') ||
      selectedCartElement.classList.contains('remove-item')
    ) {
      let selectedItemId = selectedCartElement.dataset.productId; //클릭한 장바구니 요소의 아이디
      let itemElem = document.getElementById(selectedItemId);

      let item = ITEMS.find(function (p) {
        return p.id === selectedItemId;
      });
      //장바구니 추가되고 나오는 +와 - 버튼의 클래스명
      if (selectedCartElement.classList.contains('quantity-change')) {
        let qtyChange = parseInt(selectedCartElement.dataset.change); //FIXME: 변수명 변경
        let newQty =
          parseInt(itemElem.querySelector('span').textContent.split('x ')[1]) + qtyChange; //FIXME: 변수명 변경
        if (
          newQty > 0 &&
          newQty <= item.stock + parseInt(itemElem.querySelector('span').textContent.split('x ')[1])
        ) {
          itemElem.querySelector('span').textContent =
            itemElem.querySelector('span').textContent.split('x ')[0] + 'x ' + newQty;
          item.stock -= qtyChange;
        } else if (newQty <= 0) {
          itemElem.remove();
          item.stock -= qtyChange;
        } else {
          alert('재고가 부족합니다.');
        }
      } //end of 1D if
      else if (selectedCartElement.classList.contains('remove-item')) {
        //remove-item: 장바구니 추가되고 나오는 삭제의 클래스 명

        //밑에는 그동안 담아둔 장바구니의 개수
        let remQty = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]);
        item.stock += remQty;

        itemElem.remove();
      }

      updateCart();
    }
  });
};

const eventHandler = () => {
  handleAddCartButton();
  handleCart();
};

export default eventHandler;
