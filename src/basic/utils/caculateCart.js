import { TotalPrice } from '../store';
import ITEMS from '../constant';
import { $cart, $sum } from '../createElements';
import updateBonusPoint from './updateBonusPoint';
import updateStockState from './updateStockState';

const caculateCart = () => {
  let totalPrice = new TotalPrice();
  let itemCount = 0;

  let cartItems = $cart.children; //장바구니의 자식들을 cartItem으로 담습니다.
  let subTotalPrice = 0;

  for (let i = 0; i < cartItems.length; i++) {
    //모든 장바구니를 순회
    (function () {
      //즉시 실행 함수
      let currentItem; //현재 아이템입니다.
      for (let j = 0; j < ITEMS.length; j++) {
        //전체 아이템의 개수만큼 순회
        if (ITEMS[j].id === cartItems[i].id) {
          //전체 아이템와 장바구니의 아이디를 비교하여 같다면
          currentItem = ITEMS[j]; //현재 아이템으로 등록
          break;
        }
      }
      //q-> stock:장바구니에 담은 개수
      let stock = parseInt(cartItems[i].querySelector('span').textContent.split('x ')[1]);
      let itemTotalPrice = currentItem.price * stock; //itemTot: 장바구니에 담은 개수만큼의 총 금액
      let discount = 0;

      itemCount += stock; //itemCnt는 장바구니 개수
      subTotalPrice += itemTotalPrice; //subTot에 itemTot만큼 업데이트합니다. (장바구니에 담은 개수의 총액)

      if (stock >= 10) {
        //장바구니에 10개 이상 담은 경우 할인(disc) 적용
        if (currentItem.id === 'p1') discount = 0.1;
        else if (currentItem.id === 'p2') discount = 0.15;
        else if (currentItem.id === 'p3') discount = 0.2;
        else if (currentItem.id === 'p4') discount = 0.05;
        else if (currentItem.id === 'p5') discount = 0.25;
      }
      // totalPrice += itemTotalPrice * (1 - discount); //총액 업데이트
      // //t = t+ (itemTotalPrice * (1 - discount))
      totalPrice.set(totalPrice.get() + itemTotalPrice * (1 - discount));
    })();
  }

  let discount = 0;
  if (itemCount >= 30) {
    let bulkDiscount = totalPrice.get() * 0.25;
    let itemDiscount = subTotalPrice - totalPrice.get();

    if (bulkDiscount > itemDiscount) {
      // totalPrice = subTotalPrice * (1 - 0.25);
      totalPrice.set(subTotalPrice * (1 - 0.25));
      discount = 0.25;
    } else {
      discount = (subTotalPrice - totalPrice.get()) / subTotalPrice;
    }
  } else {
    discount = (subTotalPrice - totalPrice.get()) / subTotalPrice;
  }

  if (new Date().getDay() === 2) {
    // totalPrice *= 1 - 0.1;
    //totalPrice=totalPrice * (1 - 0.1)
    totalPrice.set(totalPrice.get() * (1 - 0.1));
    discount = Math.max(discount, 0.1);
  }
  $sum.textContent = '총액: ' + Math.round(totalPrice.get()) + '원';

  if (discount > 0) {
    //할인이 있을 경우, 할인 적용
    let span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = '(' + (discount * 100).toFixed(1) + '% 할인 적용)';
    $sum.appendChild(span);
  }
  updateStockState();
  updateBonusPoint(totalPrice);
};

export default caculateCart;
