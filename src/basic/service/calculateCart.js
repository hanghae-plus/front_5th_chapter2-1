import { renderBonusPoints } from '../ui/renderBonusPoints';
import { updateStockInfo } from '../ui/updateStockInfo';
import { createElement } from '../utils/createElement';
import { globalStore } from '../store/globalStore';
import { DISCOUNT } from '../constant/randomNumber';

const isTuesday = () => {
  return new Date().getDay() === 2;
};

export const calculateCart = () => {
  const { getState, setState } = globalStore;
  const { prodList } = getState();

  const orderedList = document.getElementById('cart-items');
  const paymentInfo = document.getElementById('cart-total');
  const soldOutInfo = document.getElementById('stock-status');

  if (!orderedList || !paymentInfo || !soldOutInfo) return;

  const cartItems = Array.from(orderedList.children);

  // 임시 변수로 계산 결과 저장
  let newTotalAmount = 0;
  let newItemCount = 0;
  let preDiscountTotal = 0;

  // 각 아이템 계산
  cartItems.forEach((cartItem) => {
    const currentItem = prodList.find((prodItem) => prodItem.id === cartItem.id);
    const currentQuantity = parseInt(cartItem.querySelector('span').textContent.split('x ')[1]);
    const currentItemTotalPrice = currentItem.price * currentQuantity;

    let discount = 0;
    newItemCount += currentQuantity;
    preDiscountTotal += currentItemTotalPrice;

    if (currentQuantity >= DISCOUNT.FOR_MIN_QUANTITY) {
      discount = DISCOUNT.ITEM_RATIO[currentItem.id];
    }

    newTotalAmount += currentItemTotalPrice * (DISCOUNT.FULL_PRICE_RATIO - discount);
  });

  // 할인율 계산
  let discountRate = 0;

  if (newItemCount >= DISCOUNT.BULK_DISCOUNT.QUANTITY) {
    const bulkDiscount = newTotalAmount * DISCOUNT.BULK_DISCOUNT.RATIO;
    const itemDiscount = preDiscountTotal - newTotalAmount;
    if (bulkDiscount > itemDiscount) {
      newTotalAmount = preDiscountTotal * (DISCOUNT.FULL_PRICE_RATIO - DISCOUNT.BULK_DISCOUNT.RATIO);
      discountRate = DISCOUNT.BULK_DISCOUNT.RATIO;
    } else {
      discountRate = (preDiscountTotal - newTotalAmount) / preDiscountTotal;
    }
  } else {
    discountRate = (preDiscountTotal - newTotalAmount) / preDiscountTotal;
  }

  // 화요일 할인
  if (isTuesday()) {
    newTotalAmount *= DISCOUNT.FULL_PRICE_RATIO - DISCOUNT.TUESDAY_RATIO;
    discountRate = Math.max(discountRate, DISCOUNT.TUESDAY_RATIO);
  }

  // 상태 한 번에 업데이트
  setState({
    totalAmount: newTotalAmount,
    itemCount: newItemCount,
  });

  // UI 업데이트
  paymentInfo.textContent = `총액: ${Math.round(newTotalAmount)}원`;
  if (discountRate > 0) {
    const span = createElement('span', {
      className: 'text-green-500 ml-2',
      textContent: `(${(discountRate * 100).toFixed(1)}% 할인 적용)`,
    });
    paymentInfo.appendChild(span);
  }

  updateStockInfo();
  renderBonusPoints();
};
