import ITEMS from '../constant';
import { $addToCartButton, $cart, $itemSelect } from '../createElements';
import { RecentSelectedId } from '../store';
import caculateCart from './caculateCart';

const handleAddToCartButton = () => {
  $addToCartButton.addEventListener('click', function () {
    //selItem: 선택된 아이템의 아이디, (ex.p1)
    let selectedItemId = $itemSelect.value; //select태그의 값
    //추가될 아이템(선택된 아이디)
    let selecedItem = ITEMS.find(function (p) {
      return p.id === selectedItemId;
    });
    if (selecedItem && selecedItem.stock > 0) {
      let item = document.getElementById(selecedItem.id);

      if (item) {
        //추가할 아이디가 있을 경우
        let cartCount = parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1; //장바구니에 추가한 개수
        //장바구니에 추가한 개수와 재고를 비교
        if (cartCount <= selecedItem.stock) {
          item.querySelector('span').textContent =
            selecedItem.name + ' - ' + selecedItem.price + '원 x ' + cartCount;
          selecedItem.stock--; //재고를 하나 내립니다.
        } else {
          alert('재고가 부족합니다.');
        }
      } //end of 1D if
      else {
        let newItem = document.createElement('div');
        newItem.id = selecedItem.id;
        newItem.className = 'flex justify-between items-center mb-2';
        newItem.innerHTML =
          '<span>' +
          selecedItem.name +
          ' - ' +
          selecedItem.price +
          '원 x 1</span><div>' +
          '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
          selecedItem.id +
          '" data-change="-1">-</button>' +
          '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
          selecedItem.id +
          '" data-change="1">+</button>' +
          '<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' +
          selecedItem.id +
          '">삭제</button></div>';
        $cart.appendChild(newItem);

        selecedItem.stock--; //재고를 하나 내립니다.
      } //end of 1D else

      caculateCart(); //장바구니 계산

      let recentSelectedId = new RecentSelectedId();
      recentSelectedId.set(selectedItemId);
    }
  });
};

const handleCart = () => {
  $cart.addEventListener('click', function (event) {
    let selectedCartElement = event.target; //장바구니 elem의 클릭요소 (target의 준말같음)
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

      caculateCart();
    }
  });
};

const eventHandler = () => {
  handleAddToCartButton();
  handleCart();
};

export default eventHandler;
