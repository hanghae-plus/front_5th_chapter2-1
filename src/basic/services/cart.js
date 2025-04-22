import { CONSTANTS } from '../constants/constant';
import ERROR_MESSAGES from '../constants/errorMessages';
import createEl from '../ utils/createEl';
import { state } from '../state';
import { elements } from '../ui/element';
import { renderBonusPoints, updateStockInfo } from '../ui/render';
import { applyBulkDiscount, applyTuesdayDiscount } from './discount';

export function calculateCartItem() {
  state.currentTotalAmount = 0;
  state.currentItemCount = 0;
  const cartItems = elements.CartContainer.children;
  let subTotal = 0;

  //장바구니에 담겨있는 요소 확인후 갯수와 값 계산
  for (let i = 0; i < cartItems.length; i++) {
    const itemEl = cartItems[i];
    const product = findProductById(itemEl.id);
    const quantity = parseInt(
      itemEl.querySelector('span').textContent.split('x ')[1],
    );

    const {
      itemTotal,
      discountedTotal,
      quantity: count,
    } = calculateItemTotal(product, quantity);

    state.currentItemCount += count;
    subTotal += itemTotal;
    state.currentTotalAmount += discountedTotal;
  }

  //일반 할인 처리
  let bulkResult = applyBulkDiscount(subTotal, state.currentTotalAmount);
  let finalAmount = bulkResult.finalAmount;
  let discountRate = bulkResult.discountRate;

  //화요일 할인 처리
  let tuesdayResult = applyTuesdayDiscount(finalAmount, discountRate);
  finalAmount = tuesdayResult.finalAmount;
  discountRate = tuesdayResult.discountRate;

  //할인값
  state.currentTotalAmount = finalAmount;
  elements.CartSummary.textContent = `총액: ${Math.round(state.currentTotalAmount)}원`;

  if (discountRate > 0) {
    const span = createEl('span', {
      className: 'text-green-500 ml-2',
      text: `(${(discountRate * 100).toFixed(1)}% 할인 적용)`,
    });
    elements.CartSummary.appendChild(span);
  }

  updateStockInfo();
  renderBonusPoints();
}

function findProductById(id) {
  const product = state.productList.find((product) => product.id === id);
  if (!product) {
    console.warn(ERROR_MESSAGES.PRODUCT.NOT_FOUND, id);
  }
  return product;
}

function calculateItemTotal(item, quantity) {
  let discount = 0;
  if (quantity >= CONSTANTS.CART.ITEM_DISCOUNT_THRESHOLD) {
    discount = CONSTANTS.DISCOUNT_TABLE[item.id] || 0;
  }
  return {
    itemTotal: item.price * quantity,
    discountedTotal: item.price * quantity * (1 - discount),
    quantity,
  };
}
