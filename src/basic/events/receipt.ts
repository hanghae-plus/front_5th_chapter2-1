import { Discount } from "../component/utils/Discount";
import { AMOUNT_OF_STOCKS, DISCOUNTS, PRODUCTS } from "../context/product";
import { bonusPoint } from "./point";
import { updateStockInfo } from "./stock";


//품목 별 가격 계산 함수
function updateReceipt() {
    const cartItems = document.getElementById(`cart-items`)!.children;
    let totalBeforeDiscount = 0;
    let totalAfterDiscount = 0;
    let itemCount = 0;

    //기본 계산 함수 처리
    for (let i=0; i < cartItems.length; i++) {

      (function () {
        let currentItem;

        for (let j=0; j < PRODUCTS.length; j++) {
          if(PRODUCTS[j].id === cartItems[i].id) {
            currentItem = PRODUCTS[j];
            break;
          }
        }

        const qty = parseInt(cartItems[i].querySelector('span').textContent.split(AMOUNT_OF_STOCKS)[1]);
        const totalItem = currentItem.price * qty;
        const discount = discountPrice(currentItem.id, qty);


        totalBeforeDiscount += totalItem;
        totalAfterDiscount += totalItem * (1 - discount);
        itemCount += qty;
      })();
    }

    let discountRate=0;

    //대량 구매 할인
    if(itemCount >= 30) {
      const bulkDiscount = totalAfterDiscount * 0.25;
      const itemDiscount = totalBeforeDiscount - totalAfterDiscount;

      if(bulkDiscount > itemDiscount) {
        totalAfterDiscount = totalBeforeDiscount * (1 - 0.25);
        discountRate = 0.25;
      } else {
        discountRate = (totalBeforeDiscount - totalAfterDiscount) / totalBeforeDiscount;
      }
    } else {
      discountRate = (totalBeforeDiscount - totalAfterDiscount) / totalBeforeDiscount;
    }


    //화요일 특별 할인
    if(new Date().getDay() === 2) {
      totalAfterDiscount *= (1 - 0.1);
      discountRate = Math.max(discountRate, 0.1);
    }


    const totalCart = document.getElementById('cart-total');
    totalCart.textContent = `총액: ${Math.round(totalAfterDiscount)}원`;


    //할인 경우
    if(discountRate > 0) {
      totalCart?.appendChild(Discount(discountRate));
    }


    //재고 함수 실시간 렌더링 
    updateStockInfo();
    
    //적립금 함수 실행
    bonusPoint(totalAfterDiscount);
  }
  
//품목 별 할인 적용 함수
function discountPrice(id, qty){
  if(qty < 10 ){
    return 0;
  }

  return DISCOUNTS[id] || 0;
}

export { updateReceipt };