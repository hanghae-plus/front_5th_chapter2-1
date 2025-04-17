import { updateStockInfo } from './updateStockInfo';
import { renderBonusPoints } from './renderBonusPoints';
// 각 상품에 10개 이상 구매시 상품별 할인 p1 10% p2 15% p3 20% p4 5% p5 25%
// 30개 이상 구매시 25% 할인 -> 개별 할인과 구매 할인중 큰 할인율 적용
// 화요일에는 추가 10% 할인 -> 기존 할인율과 비교해서 더 큰 할인율 적용

// 습관: 매직넘버들은 주입으로 받는다.
export const calculateCart = (
  { products, cartContainerElement, bonusPoints },
  individualDiscounts = { p1: 0.1, p2: 0.15, p3: 0.2, p4: 0.05, p5: 0.25 },
  bulkDiscountThreshold = 30,
  bulkDiscountRate = 0.25,
  tuesdayDiscountRate = 0.1,
  discountDay = 2
) => {
  let totalAmount = 0;
  let itemCount = 0;
  let subtotalBeforeDiscount = 0;

  const cartItems = cartContainerElement.children;

  for (let i = 0; i < cartItems.length; i++) {
    (function () {
      let currentItem;

      for (let j = 0; j < products.length; j++) {
        if (products[j].id === cartItems[i].id) {
          currentItem = products[j];
          break;
        }
      }

      const quantity = parseInt(cartItems[i].querySelector('span').textContent.split('x ')[1]);
      const itemTotal = currentItem.price * quantity;
      let discount = 0;

      itemCount += quantity;
      subtotalBeforeDiscount += itemTotal;

      if (quantity >= 10 && individualDiscounts[currentItem.id]) {
        discount = individualDiscounts[currentItem.id];
      }
      totalAmount += itemTotal * (1 - discount);
    })();
  }

  let discountRate = 0;

  if (itemCount >= bulkDiscountThreshold) {
    const bulkDiscountAmount = totalAmount * bulkDiscountRate;
    const individualDiscountAmount = subtotalBeforeDiscount - totalAmount;

    if (bulkDiscountAmount > individualDiscountAmount) {
      totalAmount = subtotalBeforeDiscount * (1 - bulkDiscountRate);
      discountRate = bulkDiscountRate;
    } else {
      discountRate = (subtotalBeforeDiscount - totalAmount) / subtotalBeforeDiscount;
    }
  } else {
    discountRate = (subtotalBeforeDiscount - totalAmount) / subtotalBeforeDiscount;
  }

  if (new Date().getDay() === discountDay) {
    totalAmount *= 1 - tuesdayDiscountRate;
    discountRate = Math.max(discountRate, tuesdayDiscountRate);
  }

  const totalAmountElement = document.getElementById('cart-total');
  totalAmountElement.textContent = '총액: ' + Math.round(totalAmount) + '원';

  if (discountRate > 0) {
    const discountRateElement = document.createElement('span');
    discountRateElement.className = 'text-green-500 ml-2';
    discountRateElement.textContent = '(' + (discountRate * 100).toFixed(1) + '% 할인 적용)';
    totalAmountElement.appendChild(discountRateElement);
  }

  updateStockInfo(products);
  renderBonusPoints({ bonusPoints, totalAmount });
};
