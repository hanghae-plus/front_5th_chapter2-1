import { TotalPrice } from '../stores';
import ITEMS from '../constants/items';
import $cart from '../components/Cart';
import $cartTotal from '../components/CartTotal';
import updateStockState from './updateStockState';
import updatePoint from './updatePoint';

//FIXME: code refactoring 필요
const updateCart = () => {
  let totalPrice = new TotalPrice();
  let itemCount = 0;

  let cartItems = $cart.children;
  let subTotalPrice = 0;

  for (let i = 0; i < cartItems.length; i++) {
    (() => {
      let currentItem;
      for (let j = 0; j < ITEMS.length; j++) {
        if (ITEMS[j].id === cartItems[i].id) {
          currentItem = ITEMS[j];
          break;
        }
      }
      let stock = parseInt(cartItems[i].querySelector('span').textContent.split('x ')[1]);
      let itemTotalPrice = currentItem.price * stock;
      let discount = 0;

      itemCount += stock;
      subTotalPrice += itemTotalPrice;

      if (stock >= 10) {
        if (currentItem.id === 'p1') discount = 0.1;
        else if (currentItem.id === 'p2') discount = 0.15;
        else if (currentItem.id === 'p3') discount = 0.2;
        else if (currentItem.id === 'p4') discount = 0.05;
        else if (currentItem.id === 'p5') discount = 0.25;
      }
      totalPrice.set(totalPrice.get() + itemTotalPrice * (1 - discount));
    })();
  }

  let discount = 0;
  if (itemCount >= 30) {
    let bulkDiscount = totalPrice.get() * 0.25;
    let itemDiscount = subTotalPrice - totalPrice.get();

    if (bulkDiscount > itemDiscount) {
      totalPrice.set(subTotalPrice * (1 - 0.25));
      discount = 0.25;
    } else {
      discount = (subTotalPrice - totalPrice.get()) / subTotalPrice;
    }
  } else {
    discount = (subTotalPrice - totalPrice.get()) / subTotalPrice;
  }

  if (new Date().getDay() === 2) {
    totalPrice.set(totalPrice.get() * (1 - 0.1));
    discount = Math.max(discount, 0.1);
  }

  $cartTotal.textContent = '총액: ' + Math.round(totalPrice.get()) + '원';

  if (discount > 0) {
    let span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = '(' + (discount * 100).toFixed(1) + '% 할인 적용)';
    $cartTotal.appendChild(span);
  }

  updateStockState();
  updatePoint(totalPrice);
};

export default updateCart;
