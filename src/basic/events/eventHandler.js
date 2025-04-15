import ITEMS from '../constants/items';
import { $cart } from '../createElements';
import updateCart from '../utils/updateCart';
import handleAddCart from './handleAddCart';

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
  handleAddCart();
  handleCart();
};

export default eventHandler;
